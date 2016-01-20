'use strict';

const file = require('doctoc/lib/file');
const updateSection = require('update-section');
const fs = require('fs');

const README_PATH = '../handout/README.md';

const START_ROOT_TOC = '<!-- START GENERATED TOC -->';
const END_ROOT_TOC = '<!-- END GENERATED TOC -->';

const DOCTOC_START = '<!-- START doctoc ';
const DOCTOC_END = '<!-- END doctoc ';

const matchesRootTocStartTag = (str) => new RegExp(START_ROOT_TOC).test(str);
const matchesRootTocEndTag = (str) => new RegExp(END_ROOT_TOC).test(str);

const matchesDocTocStartLine = (line) => new RegExp(DOCTOC_START).test(line);
const matchesDocTocEndLine = (line) => new RegExp(DOCTOC_END).test(line);

let rootTOC = '';

file.findMarkdownFiles('../handout').map((file) => {

  const lines = fs.readFileSync(file.path, 'utf8').split('\n');
  const tocInfo = updateSection.parse(lines, matchesDocTocStartLine, matchesDocTocEndLine);

  if (tocInfo.hasStart && tocInfo.hasEnd) {
    for (let lineNo = tocInfo.startIdx + 2; lineNo < tocInfo.endIdx - 1; lineNo++) {
      rootTOC += lines[lineNo].replace('](#', '](' + file.path.substr(11) + '#') + '\n';
    }
  }

});

const updatedReadMe = updateSection(
  fs.readFileSync(README_PATH, 'utf8'),
  START_ROOT_TOC + '\n' + rootTOC + '\n' + END_ROOT_TOC,
  matchesRootTocStartTag,
  matchesRootTocEndTag);

fs.writeFileSync(README_PATH, updatedReadMe, 'utf8');
