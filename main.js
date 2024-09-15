import { argv } from "node:process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

/**
 * Main function that process the CLI arguments
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
