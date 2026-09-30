export default function (eleventyConfig) {
	// Static assets, copied verbatim into the build output.
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/robots.txt");
	eleventyConfig.addPassthroughCopy("src/CNAME", { failOnError: false });

	eleventyConfig.addGlobalData("year", () => new Date().getFullYear());

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data",
		},
		// Set to "/sonoplot-website/" (via ELEVENTY_PATH_PREFIX) when deploying
		// to a GitHub Pages *project* site (https://petecj.github.io/sonoplot-website/).
		// Leave as "/" once a custom domain (CNAME) is in front of the site,
		// since a custom domain serves from the root. Every internal link/asset
		// in the templates goes through the `url` filter so this is the only
		// place the prefix needs to change.
		pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
	};
}
