const fs = require("fs");
const path = require("path");

const isMarkdownFile = filePath => filePath.slice(-2).toLowerCase() === "md";

const notREADME = filePath => path.basename(filePath) !== "README.md";

const fileDNE = path => !fs.existsSync(path);

const setDifference = (arrayA, arrayB) => {
  const a = new Set(arrayA);
  const b = new Set(arrayB);
  return new Set([ ...a ].filter(x => !b.has(x)));
};

const getFilesIn = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? getFilesIn(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

module.exports = {
  isMarkdownFile,
  notREADME,
  fileDNE,
  setDifference,
  getFilesIn
};
