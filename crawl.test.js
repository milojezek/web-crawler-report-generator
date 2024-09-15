import { test, expect } from "@jest/globals";
import { normalizeURL, getUrlsFromHtml } from "./crawl.js";

test("Normalize URL: https://blog.boot.dev/path/", () => {
	expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
		"blog.boot.dev/path",
	);
});

test("Normalize URL: https://wagslane.dev", () => {
	expect(normalizeURL("https://wagslane.dev")).toBe("wagslane.dev");
});

test("Normalize URL: http://blog.boot.dev/path", () => {
	expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("Normalize URL: http://www.blog.boot.dev/path/", () => {
	expect(normalizeURL("http://www.blog.boot.dev/path/")).toBe(
		"blog.boot.dev/path",
	);
});

test("Get URL from HTML", () => {
	const htmlBody = `
    <html>
      <body>
          <a href="https://blog.boot.dev/lesson/022"><span>Go to Boot.dev</span></a>
          <a href="https://google.com"><span>Go to Boot.dev</span></a>
          <a href="https://seznam.cz"><span>Go to Boot.dev</span></a>
          <a href="https://blog.boot.dev/article/01"><span>Go to Boot.dev</span></a>
      </body>
    </html>`;
	expect(getUrlsFromHtml(htmlBody, "https://blog.boot.dev/")).toEqual([
		"https://blog.boot.dev/lesson/022",
		"https://blog.boot.dev/article/01",
	]);
});
