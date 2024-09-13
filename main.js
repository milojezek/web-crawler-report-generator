import { argv } from "node:process";
import { crawlPage } from "./crawl.js";

/**
 * Main function that process the CLI arguments
 */
const main = () => {
	const cliCommands = argv.slice(2);

	if (cliCommands.length < 1) {
		console.error("No CLI argument");
	} else if (cliCommands.length > 1) {
		console.error("Too many CLI arguments");
	} else {
		crawlPage(cliCommands);
	}
};

main();
