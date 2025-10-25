---
title: "How I made this website"
date: "2025-03-16"
excerpt: "The making of this site is simply vibe coding"
coverImage: "/images/1/img.png"
tags: ["webdev"]
---

![](/images/1/img.png)

## Intro

So the other day, I received a mail in my uni inbox that said everyone gets a two-year domain of 
.id.vn for free. And so I rushed to register mintram.id.vn as fast as I could before their server 
crashed. I got some time after doing all sort of school 
projects this semester, so a few evenings working on this site couldn't hurt.

Maybe I can port my old web games here or showcase some of cool projects and cool things on my 
life (didn't have any, yet:( ).

## Creating the site

I use Next.js 15, Tailwind, and shadcn/ui. Blog is managed by Wisp CMS. The whole process was simply whisking 
things together to make it work. Wisp has a nice and dead simple API that I just need to call and 
fetch the blogs. The whole thing just magically works out of the box, with modern features right 
there, what's a website nowadays without dark mode and responsive design?

I really like the grunge style and neobrutalism design, chaotic, messy, and feel like me. So it's basically
make things disordered, rotate them around, very simple! Also, I like the new UI on Tailwind CSS' landing page, it's kind of like a prototype UI with strokes, 
so I think of incorporate (steal) it into my site. In the end I used a bunch of CSS and style it 
as background color. 

![](/images/1/img_1.png)

## Deploy and testing the site
It was literally a few click on Vercel dashboard to get a site up and running. Vercel gave me a DNS, 
and I just need to paste that in my domain register provider and done, the website is up. My monkey ass 
brain couldn't handle the complexity of modern development, so it is what it is. I don't expect this 
site to gain a lot of traffic anyway, so something cheap and free is the way to go.

I used a lot of new stuff to make this site, like Server components, React cache, and auto generated 
robots.txt or sitemap.xml, like a usual site.

The whole bottleneck of the site maybe a crap load of JavaScript and CSS. That simple image on the center 
alone is the largest contentful paint. I would go down the rabbit hole to fix all of these problems, 
but look at the other metric, perfect scores!

![](/images/1/img_2.png)
![](/images/1/img_3.png)