---
title: "How I made an online leaderboard in Godot"
date: "2025-12-08"
excerpt: "It's actually super short"
coverImage: "/images/leaderboard/leaderboard.png"
tags: ["gamedev", "tutorial"]
---

so in this guide i will try to make it as simple as possible with code examples on implementing an online leaderboard in a simple
Godot web game.

![](/images/leaderboard/leaderboard.png)

this is the approach that i used for the game [Makeshift](https://phaspez.itch.io/makeshift)

## prerequisites

you should have some basic experiences with these concepts:

- SQL databases (what is a table? primary key? basic data types?), especially Postgres
- HTTP requests (what is CRUD? HTTP request methods?)
- and Godot of course (what is a signal? binding a func to a signal?)

## setting up your Supabase instance

### create an account and a table

it's free for small usage or if you just want to test things out! it's simply a Postgres database that when you create tables,
it automatically creates API endpoints for them. head over to [Supabase](https://supabase.com/) and do the following steps:

- register an account
- create a new project
- choose a database password or generate one
- select the server region, choose any data center you'd like, closest to you or where the majority of users are
- skip security options and advanced config for now, or customize however you'd like

![](/images/leaderboard/create_new.png)

after that, you need to create a leaderboard table, with at least a unique user ID and a score. in my game, i have
an `id`, `last_submit`, `user_name`, and a `score` column with datatypes of `uuid`, `timestamptz`,
`varchar` and `float4` respectively. be careful that your table name is case sensitive; in my case i named it Leaderboard. this
is important because endpoints are case sensitive.

`id` and `last_submit` won't have a default value since they will be created in the game client
and then sent back to the database. just simply clear the default value for now.

### update RLS policies

Row Level Security policy means you can control what types of users can edit or view your tables. in the Table Editor, there's your table in each tab. and there's also a 'RLS policies' button on your table tab. create three policies:
enable Insert, Select and Update for everyone. you can set Target Roles to either anon or public; anon users require an
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
annoying CORS policy that blocks requests, which would work normally if you just
use a native app or test the game right on Godot. the `HTTPRequest` node in Godot has this restriction.

in order to bypass it, you have to use `HTTPClient`, which is a low level native socket. this makes the
code a lot more bloated. i have no idea why `HTTPClient` works and HTTPRequest doesn't on my machine :(

create a new script called `supabase.gd`, then paste this in, replace the const strings with your actual values:

```gdscript
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

that's lengthy! here's the summary of the above script:

- the `get_leaderboard` and `_fetch_leaderboard_async`, which creates a new request, assembles the request header, makes the request,
  parses the body, then fires a signal that contains an array of dictionaries. you can then
  use that to display the data in the game.
- the `submit_score` adn `_submit_score_async` takes in player UUID, score, and name. it also works similarly to the above functions
- `get_postgres_timestamp_utc` creates a timestamptz string for postgres.
- `convert_utc_string_to_local` converts the string from the above function to your local machine's timezone.
- when making requests, `?order=score.desc` means order by the score column in descending order. you can also sort multiple
  columns, just replace it with something like `?order=score.desc,last_submit.desc`
- `Prefer: resolution=merge-duplicates` is a header that tells Supabase how to handle conflict when inserting data. in this case
  if you submit with an existing `id`, instead of throwing an error, it updates the existing row. this is called an upsert (update + insert).
  without it, submitting the same id twice would fail.

basically, you just need to call `get_leaderboard` and `submit_score`, then connect the signal `leaderboard_fetched` and `score_submitted` some nodes
that respond to these events! which the later Godot section is about.

if you dont need to deal with time or want to know when a player submits the score, just remove anything related to time, like those two
static functions and the timestamp in the request body.

remember that tables are case sensitive, in my case i have Leaderboard capitalized, so the endpoint is `/rest/v1/Leaderboard`;
replace it with your own name.

### create a unique player ID

you need to create the player's ID and save it in your game save file. here's a script to generate a random UUID. the chance of
a collision is astronomically tiny so you likely won't need to worry about it. just paste the file somewhere in your
project, call `UUID.uuid4()` and you have a unique ID! it's just a static function that returns a unique string. just to be extra careful,
please call `randomize()` somewhere before this to change the seed.

in case you need to know how to save files in Godot, follow the [Saving games](https://docs.godotengine.org/en/stable/tutorials/io/saving_games.html) doc.

```gdscript
### uuid.gd
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

if you have an existing save file, i guess updating it is relatively simple too. here's how i implemented it using `PlayerData extends Resource`
as save files. `SAVE_FILE_PATH` is just a const string in the `user:\\` directory

```gdscript
func load_or_create_player_data() -> PlayerData:
    if ResourceLoader.exists(SAVE_FILE_PATH):
        var data = ResourceLoader.load(SAVE_FILE_PATH)
        if data is PlayerData:
            if data.player_uuid == "" or data.player_uuid == null:
                data.player_uuid = UUID.uuid4()
                print("Fixed missing UUID in existing save: %s" % data.player_uuid)
                player_data = data
                save_player_data()
            return data

    print("No save file found. Creating new profile...")
    var new_data = PlayerData.new()
    new_data.player_uuid = UUID.uuid4()

    player_data = new_data

    save_player_data()
    print("Created and Saved new Player UUID: %s" % new_data.player_uuid)
    return new_data

### save_player_data() simply saves the file at SAVE_FILE_PATH
```

it simply checks if the save file exists, loads that, then checks inside it whether a UUID exists or not in the file. if not, it creates one then saves. i
suppose it would be similar if you save it with the JSON approatch as well. you would likely use this for an autoload script.

### display and submit the score

there is a signal that emits an Array of Dictionaries in the Supabase node, just connect it somewhere to use it, for example:

```gdscript
### leaderboard_list.gd
...
@onready var supabase: Supabase = $Supabase

func _ready():
    supabase.leaderboard_fetched.connect(_on_leaderboard_fetched)

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
```

in my case, for each item, i create a custom `LeaderboardEntry` node, which is an individual line that displays each player record.
the `setup` function simply displays them with the given data. like this, i also highlight the record if it match the ones in
the entry:

```gdscript
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

this is how i did the submit feature. basically you need an input field to enter the username, and that's it! you have a simple
leaderboard!

```gdscript
### leaderboard.gd
...
@onready var user_line_edit: LineEdit: = $UsernameLineEdit

var total_score: float

func _on_submit_pressed() -> void:
    var username: String = username_line_edit.text.strip_edges()
    if username == "":
        username = "Anonymous"

    # i suppose you calculated the score somewhere, then pass in as total_score
    supabase.submit_score(GameManager.player_data.player_uuid, total_score, username)
    submit_button.disabled = true
    username_line_edit.editable = false

    await supabase.score_submitted
    # this simply deletes all entries, then call supabase.get_leaderboard()
    refresh_leaderboard()
```

## what's next

there's a lot of things i stripped out. for example, validating your username. what if they type in an empty string, the hi-score
is zero or they use profanity words as usernames? there are a lot of edge cases like these, but to be honest for a simple web game
it shouldn't matter that much. the main thing you should do is focus on your game.

if you want to be fancy, you can also try to implement a loading state that appears while the list is being fetched

you can also do all sort of cloud saving and online services with it too! it's basically like a website with CRUD functionality
now that i think about it.

thanks for scrolling all the way to this, good luck!

mintram.
