// Site-wide navigation. Edit here — header.njk / footer.njk just loop over
// this, so a nav change only ever needs to happen in one place.
export default {
	primary: [
		{
			label: "Products",
			url: "/products/",
			children: [
				{ label: "Microplotter Ultima", url: "/products/microplotter-ultima/" },
				{ label: "Microplotter Pro", url: "/products/microplotter-pro/" },
				{ label: "Microplotter Proto", url: "/products/microplotter-proto/" },
			],
		},
		{ label: "Applications", url: "/applications/" },
		{ label: "Materials", url: "/materials/" },
		{ label: "Downloads", url: "/downloads/" },
		{ label: "Store", url: "https://shop.sonoplot.com", external: true },
		{ label: "Support", url: "https://support.sonoplot.com", external: true },
		{ label: "Price", url: "/request/" },
	],
	footer: [
		{ label: "About", url: "/about/" },
		{ label: "Store", url: "https://shop.sonoplot.com", external: true },
		{ label: "Support", url: "https://support.sonoplot.com", external: true },
		{ label: "Legal", url: "/legal/" },
		{ label: "Contact", url: "/contact/" },
	],
};
