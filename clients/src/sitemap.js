const sitemap = require("sitemap");
const hostname = "https://wiftz.com";

const urls = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/podcasts", changefreq: "daily", priority: 0.8 },
  { url: "/blog", changefreq: "daily", priority: 0.8 },
  { url: "/resources", changefreq: "daily", priority: 0.8 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/privacy", changefreq: "monthly", priority: 0.8 },
  { url: "/terms", changefreq: "monthly", priority: 0.8 },
  { url: "/cookies", changefreq: "monthly", priority: 0.8 },
  // Add additional pages here
];

const sitemapInstance = sitemap.createSitemap({
  hostname,
  urls,
});

const fs = require("fs");
// Write sitemap to public directory
fs.writeFileSync("./public/sitemap.xml", sitemapInstance.toString());
