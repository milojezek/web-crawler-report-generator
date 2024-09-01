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

const getURLsFromHTML = (htmlBody, baseURL) => {
	const dom = new JSDOM(htmlBody);
	const anchors = dom.window.document.querySelectorAll("a");
	return [...anchors];
};

export { normalizeURL, getURLsFromHTML };
