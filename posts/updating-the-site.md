---
title: "Website update"
date: "2025-10-09"
excerpt: "This is like the 4th time i'm making a personal website again wtf"
coverImage: "/images/3/img.png"
tags: ["webdev"]
---

It's that time or the year again that I decided to update my personal website. This is like the 4th 
time wtf. All those other versions my site was looking too generic of a portfolio. It's like a cry for 
"look at how talented I am" type of website. This time, I say fuck it, I make what I want to make. HRs and
corporate bullshit can go cry in the corner. No one would scroll these kind of websites anyway, 
so I want to make it just mine.

## the inspiration

I really like the old GeoCities kind of vibe. People make their cool sites, sharing their art, music,
hobbies, or basically anything they're interested in, and also link to other people cool sites, pretty much like
back in the old Web. Also NeoCities, as people call it recently had a bit of a revival lately, I guess
it's because people find the act of creating and maintaining their own space rewarding, albeit small. 
And also to escape the corporate coverage of web2.
It's about the joy of creation and the sake of making it, these things have values independent of how 
many visitors you'd get on your site. There's this small badge around 88x31 pixels gif that people expose so people can hotlink them in their site.
I think that's cool.

![](/images/3/img.png)

## the process

I flushed all unnecessary things out of the site, no fancy headers, footers, light/dark mode, 
localization, partly because it's cumbersome to maintain all of it and I don't want to deal with them.
Sometime less is more. Just something simple and easy to change. I stopped 
using Vercel as my host, it got a bit controversial lately with the CEO and stuff. I found out that I don't really like Next.js
that much, it's too complicated and gets weird error all the time. 

I also removed Wisp CMS, I don't really
think this simple blog need an external blog host anyway. I just want to write markdown files and push 
them to git, magically a blog page appears, turns out you can do that with static sites generation, so I
updated my Next.js app to do that, and voila, it works, no strings attached.

So the whole modern architecture is removed. It's a simple static site. Then I wrote some simple CI/CD
and now that it's on GitHub Pages.