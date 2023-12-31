const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSEO = require("eleventy-plugin-seo");

module.exports = function (eleventyConfig) {
  /*
    Copy images to site
  */
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy({ "img/favicon": "/" });

  /*
    Custom filter to only return posts that are live
  */
  const now = new Date();
  const livePosts = (p) => p.date <= now;

  eleventyConfig.addCollection("posts", (collection) => {
    return collection
      .getFilteredByGlob("./src/posts/*.md")
      .filter(livePosts)
      .reverse();
  });

  /*
    Enable RSS
   */
  eleventyConfig.addPlugin(pluginRss);

  /*
    Date filter
  */
  const { DateTime } = require("luxon");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  /*
    Shortcodes for generating images
  */
  eleventyConfig.addShortcode("imageSmall", function (image, alt, caption) {
    return `<div class="flex justify-center my-10">
      <div class="md:w-1/2 w-4/5">
        <div class="shadow-md ">
          <img src="${image}" alt="${alt}" />
        </div>
        <div class="py-4 font-bold text-center w-full">${caption}</div>
      </div>
    </div>`;
  });

  /*
    SEO
  */
  eleventyConfig.addPlugin(pluginSEO, {
    title: "Hey Ged",
    description: "Hey, I'm Ged. I make things. This is a place for me to store my thoughts.",
    url: "https://heyged.dev",
    author: "Ged MacDermott",
    image: "/img/ged.png",
    options: {
      titleDivider: "|",
      imageWithBaseUrl: true,
      twitterCardType: "summary_large_image",
      showPageNumbers: false
    }  
  });

  return {
    dir: { input: "src", output: "_site" },
  };
};
