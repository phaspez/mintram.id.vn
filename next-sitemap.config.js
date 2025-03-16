const wispCMS = require("@wisp-cms/client");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mintram.id.vn",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const wisp = wispCMS.buildWispClient({
      blogId: "cm84k9cdp0000djrb4s8p3cs0",
    });
    const results = await wisp.getPosts();
    console.log("results", results.posts);
    return results.posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.updatedAt,
    }));
  },
};
