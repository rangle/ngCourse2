#!/usr/bin/env node
const fs = require("fs");
const {
  isMarkdownFile,
  notREADME,
  fileDNE,
  setDifference,
  getFilesIn
} = require("./helpers");

console.log("----------------------------");
console.log("Checking links in SUMMARY.md");
console.log("----------------------------");

// Read SUMMARY.md and get paths to Markdown files
const rawFileStr = fs.readFileSync("./SUMMARY.md", "utf8");
const filePaths = rawFileStr
  .match(/\(([^\)]+)\)/g)
  .map(str => str.slice(1, -1))
  .filter(isMarkdownFile);

// Filter for files that Do Not Exist
const notFound = filePaths.filter(fileDNE);

// Report health of links in SUMMARY.md
console.log(`Checked ${filePaths.length} file paths`);
if (notFound.length === 0) {
  console.log("All linked Markdown files exist");
} else {
  console.log(`Cannot find Markdown files for the following ${notFound.length} links:`);
  console.log(notFound);
}
console.log("\n");

console.log("--------------------------------------------");
console.log("Checking Markdown files in handout directory");
console.log("--------------------------------------------");

const allMDFiles = getFilesIn("handout")
  .filter(isMarkdownFile)
  .filter(notREADME);
const orphans = setDifference(allMDFiles, filePaths);

// Report orphaned Markdown files
console.log(`Found ${allMDFiles.length} Markdown files`);
if (orphans.size === 0) {
  console.log("All Markdown files are accounted for in SUMMARY.md");
} else {
  console.log(`Cannot find links in SUMMARY.md for ${orphans.size} Markdown files:`);
  console.log(orphans);
}
