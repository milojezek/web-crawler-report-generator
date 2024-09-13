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

const fetchHtml = async (url) => {
	let response;
	try {
		response = await fetch(url);
	} catch (error) {
		throw new Error(`Got network error: ${error.message}`);
	}

	const contentType = response.headers.get("content-type");
	if (!contentType || !contentType.includes("text/html")) {
		throw new Error(`Non-HTML response: ${contentType}`);
	}

	return response.text();
};

/**
 * Fetch and print the HTML content of the URL
 * @param url the URL to fetch and print the HTML content
 */
const crawlPage = async (baseUrl, currentUrl = baseUrl, pages = {}) => {
	const baseUrlHostname = new URL(baseUrl).hostname;
	const currentUrlHostname = new URL(currentUrl).hostname;

	if (baseUrlHostname !== currentUrlHostname) {
		return pages;
	}

	const normalizedCurrentUrl = normalizeURL(currentUrl);

	try {
		console.log(fetchHtml(currentUrl));
	} catch (error) {
		console.error(error.message);
	}
};

export { normalizeURL, getURLsFromHTML, crawlPage };
