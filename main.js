import { argv } from "node:process";
import { crawlPage } from "./src/crawl.js";
import { printReport } from "./src/report.js";

/**
 * Main function that processes the CLI arguments
 * and initiates the web crawling process.
 *
 * This function expects exactly one CLI argument,
 * which should be the base URL of the website to crawl.
 *
 * If no argument or more than one argument is provided,
 * it logs an error message and exits.
 *
 * The function starts the crawling process for the provided base URL
 * and prints a report of the crawled pages.
 */
const main = async () => {
	const cliCommands = argv.slice(2);

	if (cliCommands.length < 1) {
		console.error("No CLI argument/website URL provided");
		return;
	}

	if (cliCommands.length > 1) {
		console.error("Too many CLI arguments provided");
		return;
	}

	const baseUrl = cliCommands[0];
	console.log(`Starting crawl of: ${baseUrl}`);

	const pages = await crawlPage(cliCommands[0]);

	printReport(pages);
};

main();
