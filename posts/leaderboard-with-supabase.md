---
title: "How I made an online leaderboard in Godot"
date: "2025-12-08"
excerpt: "It's actually super short"
coverImage: "/images/leaderboard/leaderboard.png"
tags: ["gamedev"]
---

So uhh in this guide I will try to make it as simple as possible with code examples.

![](/images/leaderboard/leaderboard.png)

this is the approach that i used for the game [Makeshift](https://phaspez.itch.io/makeshift)

##### Prerequisites

You should have some basic experience with SQL databases (what is a table? primary key? basic data types?), especially Postgres,
HTTP requests (what is CRUD? HTTP request methods?), and Godot (what is a signal? bind a func to a signal?).

## setting up your Supabase instance

### create an account and a table

it's free for small usage or if you just want to test things out! it's simply a Postgres database that when you create tables
it automatically create API endpoints for them.

- register an account
- create a new project
- choose a database password or generate one
- select the server region, choose any data center you'd like, closest to you or the majority of users are
- skip security options and advanced config for now, or customize how you'd like it

![](/images/leaderboard/create_new.png)

now you'd have to create a leaderboard table, with a minimum of unique user ID, and a score. in my game, i have
an `id`, `last_submit`, `user_name`, and `score` column with datatype of respectively `uuid`, `timestamptz`,
`varchar` and `float4`. be careful that your table name is case-sensitive, in my case i named it Leaderboard, this
is important later on.

`id` and `last_submit` won't have a default value since it will be created in the game client
and then send back. just simply clear them for now.

### update RLS policies

Row Level Security policy mean you can control what types of users can edit or view your tables. in the Table Editor, there's your table in each tab. and there's also a 'RLS policies' button on your table tab. create three policies:
enable Insert, Select and Update for everyone. you can set target roles to either anon or public, anon users require an
auth key to access it, which i'll be using later on.

![](/images/leaderboard/rls.png)

in the WITH CHECK clause, just put `true` for now, you don't need to validate anything yet.

### getting your API keys and HTTP endpoint

final step! just head over Settings > API Keys > Legacy anon and copy the key, save it for later. anon keys are safe to use
in the client.

![](/images/leaderboard/anon.png)

your API endpoint is found at Settings > Data API.

![](/images/leaderboard/api.png)

## in your Godot game

### making a Supabase wrapper node

now this is where it gets complicated. if you want to release the game in the browser, there's this very
annoying CORS policy that blocks request when it's used on the browser, which would work normally if you just
use a native app. the HTTPRequest node in Godot have this restriction.

in order to bypass it, you have to use HTTPClient, which is a low level native socket. which makes the
code a lot more bloated. i have no idea how just HTTPClient works and not HTTPRequest on my machine :(

create a new script called supabase.gd, then paste this in, replace the const string with your actual values:

```
class_name Supabase extends Node

const SUPABASE_URL: String = "https://YOUR_SUPABASE_URL"
const SUPABASE_HOST: String = "YOUR_SUPABASE_URL_WITHOUT_HTTP_PART"
const SUPABASE_KEY: String = "YOUR_SUPABASE_ANON_KEY"

signal leaderboard_fetched(leaderboard_data: Array)
signal score_submitted()


func get_leaderboard() -> void:
	print("Fetching leaderboard...")
	_fetch_leaderboard_async()


func submit_score(player_uuid: String, score: float, player_name: String) -> void:
	print("Submitting score: %f for player: %s" % [score, player_uuid])

	var body := {
		"id": player_uuid,
		"score": score,
		"last_submit": get_postgres_timestamp_utc(),
		"user_name": player_name
	}

	var json_body := JSON.stringify(body)
	_submit_score_async(json_body)


func _fetch_leaderboard_async() -> void:
	var http = HTTPClient.new()
	var err = http.connect_to_host(SUPABASE_HOST, 443, TLSOptions.client())

	if err != OK:
		print("Failed to connect: ", err)
		leaderboard_fetched.emit([])
		return

	# Wait for connection
	while http.get_status() == HTTPClient.STATUS_CONNECTING or http.get_status() == HTTPClient.STATUS_RESOLVING:
		http.poll()
		await get_tree().process_frame

	if http.get_status() != HTTPClient.STATUS_CONNECTED:
		print("Failed to connect to server")
		leaderboard_fetched.emit([])
		return

	# Make request
	var headers = [
		"apikey: " + SUPABASE_KEY,
		"Authorization: Bearer " + SUPABASE_KEY
	]

	err = http.request(HTTPClient.METHOD_GET, "/rest/v1/Leaderboard?order=score.desc", headers)

	if err != OK:
		print("Request failed: ", err)
		leaderboard_fetched.emit([])
		return

	# Wait for response
	while http.get_status() == HTTPClient.STATUS_REQUESTING:
		http.poll()
		await get_tree().process_frame

	if http.get_status() != HTTPClient.STATUS_BODY and http.get_status() != HTTPClient.STATUS_CONNECTED:
		print("Request failed with status: ", http.get_status())
		leaderboard_fetched.emit([])
		return

	# Check response code
	if http.get_response_code() != 200:
		print("HTTP Request failed with response code: ", http.get_response_code())
		leaderboard_fetched.emit([])
		return

	# Read response body
	var body = PackedByteArray()
	while http.get_status() == HTTPClient.STATUS_BODY:
		http.poll()
		var chunk = http.read_response_body_chunk()
		if chunk.size() == 0:
			await get_tree().process_frame
		else:
			body += chunk

	var parse = JSON.parse_string(body.get_string_from_utf8())
	leaderboard_fetched.emit(parse)


func _submit_score_async(json_body: String) -> void:
	var http = HTTPClient.new()
	var err = http.connect_to_host(SUPABASE_HOST, 443, TLSOptions.client())

	if err != OK:
		print("Failed to connect: ", err)
		return

	# Wait for connection
	while http.get_status() == HTTPClient.STATUS_CONNECTING or http.get_status() == HTTPClient.STATUS_RESOLVING:
		http.poll()
		await get_tree().process_frame

	if http.get_status() != HTTPClient.STATUS_CONNECTED:
		print("Failed to connect to server")
		return

	# Make request
	var headers = [
		"apikey: " + SUPABASE_KEY,
		"Authorization: Bearer " + SUPABASE_KEY,
		"Content-Type: application/json",
		"Accept: application/json",
		"Prefer: resolution=merge-duplicates"
	]

	err = http.request(HTTPClient.METHOD_POST, "/rest/v1/Leaderboard", headers, json_body)

	if err != OK:
		print("Request failed: ", err)
		return

	# Wait for response
	while http.get_status() == HTTPClient.STATUS_REQUESTING:
		http.poll()
		await get_tree().process_frame

	if http.get_status() != HTTPClient.STATUS_BODY and http.get_status() != HTTPClient.STATUS_CONNECTED:
		print("Request failed with status: ", http.get_status())
		return

	# Check response code
	var response_code = http.get_response_code()

	# Read response body
	var body = PackedByteArray()
	while http.get_status() == HTTPClient.STATUS_BODY:
		http.poll()
		var chunk = http.read_response_body_chunk()
		if chunk.size() == 0:
			await get_tree().process_frame
		else:
			body += chunk

	if response_code in [200, 201]:
		print("Score submitted successfully.")
		score_submitted.emit()
	else:
		var parse = JSON.parse_string(body.get_string_from_utf8())
		print("Response: ", parse)
		print("Failed to submit score. Response code: %d" % response_code)


static func get_postgres_timestamp_utc() -> String:
	return Time.get_datetime_string_from_system(true, false) + "Z"

static func convert_utc_string_to_local(utc_string: String) -> String:
	var unix_time = Time.get_unix_time_from_datetime_string(utc_string)

	var timezone = Time.get_time_zone_from_system()
	var bias_minutes = timezone["bias"]
	var local_unix_time = unix_time + (bias_minutes * 60)

	return Time.get_datetime_string_from_unix_time(local_unix_time, true)

```

that's lengthy! here's the summary:

- the `get_leaderboard` calls `_fetch_leaderboard_async`, which creates new request, assembles the request header,
  actually makes the request, parses the body, then fire a signal that contains an array of dictionaries, you can then
  use that to display in the game.
- the `submit_score` takes in player UUID, score, and name. it assemble the creates the request body then pass it to
  `_submit_score_async` which is similar to the above async function.
- `get_postgres_timestamp_utc` creates a timestamptz string with postgres.
- `convert_utc_string_to_local` convert string from above function, to your local machine's timezone.
- when making requests, `?order=score.desc` means order by the score column in descending order. you can also sort multiple
  columns, just replace it with, say `?order=score.desc,last_submit.desc`
- `Prefer: resolution=merge-duplicates` is a header that tells Supabase how to handle conflict when inserting data. in this case
  if you submit with an existing `id`, instead of throwing an error, it updates the existing row, this is called an upsert (update + insert).
  without it, submitting the same id twice would fail.

you just need to call `get_leaderboard` and `submit_score`, then connect the signal somewhere that responds to these events.

if you dont need to deal with time, just remove anything related to those, like those two static functions, and in the request body.

remember that tables are case sensitive, in my case i have Leaderboard capitalized, so the endpoint is `/rest/v1/Leaderboard`,
replace it with your own name.

### create a unique player ID

you'd need to create the player's ID and save it in your game save file, here's a script to generate a random UUID. the chance to have
a collision is astronomically tiny so you'd likely don't need to worry about it. just paste the file somewhere in your
project, call `UUID.uuid4()` and you have a unique ID! it's just a static function that return a unique string. just to be extra careful, please call `randomize()` somewhere before this to change the seed.

in case you need to know how to save files in Godot, follow the [Saving games](https://docs.godotengine.org/en/stable/tutorials/io/saving_games.html) doc.

```
### supabase.gd
class_name UUID

const uuid_chars = "0123456789abcdef"
static func uuid4() -> String:
	var result := ""
	for i in range(32):
		if i in [8, 12, 16, 20]: result += "-"
		if i == 12: result += "4"
		elif i == 16:
			var r := randi() % 16
			r = (r & 0x3) | 0x8 # variant bits
			result += uuid_chars[r]
		else:
			var r := randi() % 16
			result += uuid_chars[r]
	return result
```

if you have an existing save file, i guess updating it is relatively simple too, here's how mine works:

```
func load_or_create_player_data() -> PlayerData:
	if ResourceLoader.exists(SAVE_FILE_PATH):
		var data = ResourceLoader.load(SAVE_FILE_PATH)
		if data is PlayerData:
			if data.player_uuid == "" or data.player_uuid == null:
				data.player_uuid = UUID.uuid4()
				print("Fixed missing UUID in existing save: %s" % data.player_uuid)
				player_data = data
				save_player_data() # Save the fix
			return data

	print("No save file found. Creating new profile...")
	var new_data = PlayerData.new()
	new_data.player_uuid = UUID.uuid4()

	player_data = new_data

	save_player_data()
	print("Created and Saved new Player UUID: %s" % new_data.player_uuid)
	return new_data
```

it simply checks if save file exists, load that, then check inside it whether an UUID exists or not, if not create one then save.

### display and submit the score

you already have a signal that emits an Array of Dictionary, just connect them somewhere to use it, you can have multiple Supabase node anywhere if you like.

```
### leaderboard_list.gd
...
func _on_leaderboard_fetched(leaderboard_data: Array) -> void:
	var rank: int = 1
	for entry in leaderboard_data:
		print("entry is: ", entry)
		var entry_instance: LeaderboardEntry = LEADERBOARD_ENTRY.instantiate()
		entries_container.add_child(entry_instance)
		var hsep := HSeparator.new()
		entries_container.add_child(hsep)

		entry_instance.setup(
			rank, entry.get("user_name", "Unknown"), entry.get("last_submit", "Unknown"),
			str(entry.get("score", "0.0")), entry.get("id", "")
		)

		rank += 1
	leaderboard_refreshed.emit()


## in your ui script:
supabase.leaderboard_fetched.connect(_on_leaderboard_fetched)
```

in my case, for each of the item, i create a custom `LeaderboardEntry` node, which is an individual line that display it.

```
### leaderboard_entry.gd
...
func setup(rank: int, username_text: String, time_text: String, score_value: String, user_uuid: String) -> void:
	username.text = username_text
	score.text = score_value
	time.text = Supabase.convert_utc_string_to_local(time_text)
	rank_label.text = str(rank)

	if user_uuid == GameManager.player_data.player_uuid:
		highlight.visible = true
		rank_label.add_theme_color_override("font_color", Color.BLACK)
```

the `setup` function simply display them using local time

```
### leaderboard.gd
...
func _on_submit_pressed() -> void:
	var username: String = username_line_edit.text.strip_edges()
	if username == "":
		username = "Anonymous"

	supabase.submit_score(GameManager.player_data.player_uuid, total_score, username)
	submit_button.disabled = true
	username_line_edit.editable = false

	await supabase.score_submitted
	leaderboard.refresh_leaderboard()
```

this is how i did the submit, `usename_line_edit` is a LineEdit that takes the username, and that's it! you have a simple
leaderboard!

## what's next

there's a lot of things i strip out. for example, validate your username, what if they type in an empty string? what if hi-score
is zero? what if they use profanity words?

there are a lot of edge cases like these, to be honest for a simple web game it shouldn't matter that much, the main thing you
should do is focusing on your game.

you can also do all sort of cloud saving and online service with it too! it's basically like a website with CRUD functionality
now that i think about it.

thanks for scrolling all the way to this, good luck!

- mintram.
