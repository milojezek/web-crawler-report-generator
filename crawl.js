import jsdom from "jsdom";
const { JSDOM } = jsdom;

/**
 * Remove trailing slash(es) from the URL
 * @param url the URL to normalize
 * @returns the normalized URL
 */
const normalizeURL = (url) => {
	const urlObj = new URL(url);
	const hostAndPath = urlObj.hostname + urlObj.pathname;
	return hostAndPath.replace(/www\./, "").replace(/\/$/, "");
};

/**
 * Extract URLs from the HTML body
 * @param htmlBody the HTML body to extract URLs from
 * @param baseURL the base URL to filter the URLs
 * @returns the list of URLs extracted from the HTML body that are under the base URL
 */
const getURLsFromHTML = (htmlBody, baseURL) => {
	const dom = new JSDOM(htmlBody);

	const normalizedBaseUrl = normalizeURL(baseURL);
	const anchors = dom.window.document.querySelectorAll("a");

	const urls = Array.from(anchors)
		.map((a) => a.href)
		.filter((href) => {
			const normalizedHref = normalizeURL(href);
			return normalizedHref.startsWith(normalizedBaseUrl);
		});

	return [...urls];
};

/**
 * Fetch and print the HTML content of the URL
 * @param url the URL to fetch and print the HTML content
 */
const crawlPage = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const isContentType = response.headers
			.get("content-type")
			.includes("text/html");
		if (!isContentType) {
			throw new Error("Not text/html");
		}

		const html = await response.text();
		console.log(html);
	} catch (error) {
		console.error(error.message);
	}
};

export { normalizeURL, getURLsFromHTML, crawlPage };
