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
 * @param html the HTML body to extract URLs from
 * @param baseUrl the base URL to filter the URLs
 * @returns the list of URLs extracted from the HTML body that are under the base URL
 */
function getUrlsFromHtml(html, baseUrl) {
	const urls = [];
	const dom = new JSDOM(html);
	const anchors = dom.window.document.querySelectorAll("a");

	for (const anchor of anchors) {
		if (anchor.hasAttribute("href")) {
			let href = anchor.getAttribute("href");

			try {
				if (href.startsWith(baseUrl)) {
					// convert any relative URLs to absolute URLs
					href = new URL(href, baseUrl).href;
					urls.push(href);
				}
			} catch (err) {
				console.log(`${err.message}: ${href}`);
			}
		}
	}

	return urls;
}

/**
 * Fetch the HTML content of the URL
 * @param url the URL to fetch the HTML content
 * @returns the HTML content of the URL as a string
 */
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
 * Crawl the pages starting from the base URL
 * @param baseUrl the base URL to start crawling from
 * @param currentUrl the current URL to crawl (default to the base URL)
 * @param initPages the initial pages map (default to an empty object)
 * @returns the pages map with the count of each page visited
 */
const crawlPage = async (baseUrl, currentUrl = baseUrl, initPages = {}) => {
	let pages = initPages;

	const baseUrlObj = new URL(baseUrl);
	const currentUrlObj = new URL(currentUrl);

	// should crawl only pages on the same domain
	if (baseUrlObj.hostname !== currentUrlObj.hostname) {
		return pages;
	}

	// consistent url format
	const normalizedUrl = normalizeURL(currentUrl);

	// if the page was already visited
	// increase the count and don't repeat the request
	if (pages[normalizedUrl] > 0) {
		pages[normalizeURL]++;
		return pages;
	}

	// otherwise initialize the current page in the map
	pages[normalizedUrl] = 1;

	console.log(`Crawling ${currentUrl}...`);
	let html = "";
	try {
		html = await fetchHtml(currentUrl);
	} catch (error) {
		console.error(error.message);
		return pages;
	}

	// recur through the links on the page
	const otherUrls = getUrlsFromHtml(html, baseUrl);
	for (const nextUrl of otherUrls) {
		pages = await crawlPage(baseUrl, nextUrl, pages);
	}

	return pages;
};

export { normalizeURL, getUrlsFromHtml, crawlPage };
