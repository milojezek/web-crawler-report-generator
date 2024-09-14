/**
 * Print the report of internal links
 * @param pages the pages map to print
 */
const printReport = (pages) => {
	console.log("===========================");
	console.log("Here's the report...");
	console.log("===========================");
	const sortedPages = sortPages(pages);
	for (const page of sortedPages) {
		const url = page[0];
		const count = page[1];
		if (Number.isNaN(count)) {
			continue;
		}
		console.log(`Found ${count} internal links to ${url}`);
	}
};

export { printReport };

/**
 * Sort the pages by count and then by URL
 * @param pages the pages map to sort
 * @returns the sorted pages array
 */
const sortPages = (pages) => {
	// inner array: [url, count]
	const pagesArr = Object.entries(pages);
	pagesArr.sort((pageA, pageB) => {
		if (pageB[1] === pageA[1]) {
			return pageA[0].localeCompare(pageB[0]);
		}

		return pageB[1] - pageA[1];
	});

	return pagesArr;
};
