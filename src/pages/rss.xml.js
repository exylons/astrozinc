import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    stylesheet: "/style.xsl",
    title: "Astro Zinc Blog RSS Feed",
    description: "RSS feed for the Astro Zinc blog.",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      link: `/blog/${post.slug}/`,
    })),
  });
}
