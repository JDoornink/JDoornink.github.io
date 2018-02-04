var marked = require('marked');
var fs = require('fs');

var readMe = fs.readFileSync('Publications.md', 'utf-8');
var markdownReadMe = marked(readMe);

fs.writeFileSync('./Publications.html', markdownReadMe);