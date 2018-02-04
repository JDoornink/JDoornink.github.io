var marked = require('marked');
var fs = require('fs');

var readMe = fs.readFileSync('./Skills/Skills.md', 'utf-8');
var markdownReadMe = marked(readMe);

fs.writeFileSync('./Skills/Skills.html', markdownReadMe);