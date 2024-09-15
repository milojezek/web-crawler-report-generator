# Web Crawler Report Generator
This project is a web crawler generator that processes and prints a report of internal links on a given website. I made it within the learning path on [boot.dev](https://www.boot.dev/). My work meets the requirements and I will improve the code later based on the recommendations.

### The program does the following:
- Normalizes URLs for further use
- Extracts URLs from HTML
- Sorts found pages/links by visit count and name
- Prints a report of internal links

## Getting Started
### You Need
- [Node.js](https://nodejs.org/en) (version 12 or higher)
- [npm](https://docs.npmjs.com/about-npm) (Node Package Manager)

### Installation
#### 1. Clone the repository:
```bash
git clone https://github.com/your-username/web-crawler-report-generator.git
cd web-crawler-report-generator
```
#### 2. Install Dependencies
```bash
npm install
```
#### 3. Run
   - The program:
   ```bash
   npm run start
   ```
   - The tests:
   ```bash
   npm run test
   ```

### Project Structure
- `src/`
  - `main.js` is the entry point of the application.
  - `crawl.js` contains functions to normalize URLs and extract URLs from HTML.
  - `report.js` contains functions to sort pages and print the report.
- `test/`
  - `report.test.js` contains unit tests for selected report functions.
  - `crawl.test.js` contains unit tests for selected crawl functions.
- `.biome.json` is configuration for Biome used for syntax checks and code. formatting.
- `package.json` contains project metadata and dependencies.
