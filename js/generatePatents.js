var marked = require('marked');
var fs = require('fs');

var readMe = fs.readFileSync('./Patents/Patents.md', 'utf-8');
var markdownReadMe = marked(readMe);

fs.writeFileSync('./Patents/Patents.html', markdownReadMe);