import { sortPages } from "./report.js";

describe("sortPages", () => {
	test("Sorts pages by visit count in descending order", () => {
		const pages = {
			"https://firstpage.com": 5,
			"https://another.com": 2,
			"https://example.org": 8,
		};

		const sortedPages = sortPages(pages);

		expect(sortedPages).toEqual([
			["https://example.org", 8],
			["https://firstpage.com", 5],
			["https://another.com", 2],
		]);
	});

	test("Sorts pages by URL alphabetically if visit counts are equal", () => {
		const pages = {
			"https://example.com": 5,
			"https://another.com": 5,
			"https://otherpage.org": 5,
		};

		const sortedPages = sortPages(pages);

		expect(sortedPages).toEqual([
			["https://another.com", 5],
			["https://example.com", 5],
			["https://otherpage.org", 5],
		]);
	});

	test("Handles an empty pages object", () => {
		const pages = {};

		const sortedPages = sortPages(pages);

		expect(sortedPages).toEqual([]);
	});

	test("Handles a single page", () => {
		const pages = {
			"https://example.com": 5,
		};

		const sortedPages = sortPages(pages);

		expect(sortedPages).toEqual([["https://example.com", 5]]);
	});
});
