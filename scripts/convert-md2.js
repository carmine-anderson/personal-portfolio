// scripts/convert-md.js
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const SRC_MD     = path.resolve(__dirname, '..', 'docs', 'checkin.md');
const DEST_HTML  = path.resolve(__dirname, '..', 'docs', 'checkin.html');
const CSS_SOURCE = path.resolve(__dirname, '..', 'docs', 'iframe.css'); // ensure this file exists

// Read markdown
const md = fs.readFileSync(SRC_MD, 'utf8');

// Convert
const htmlBody = marked.parse(md, { mangle:false, headerIds:true });

// HTML template that LINKS the external CSS (cache-busted)
const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Daily Check-in</title>
<link rel="stylesheet" href="iframe.css?v=2" />
</head>
<body>
<main class="doc">
${htmlBody}
</main>
</body>
</html>`;

// Write output
fs.writeFileSync(DEST_HTML, html, 'utf8');

// Optional: fail early if CSS missing
if (!fs.existsSync(CSS_SOURCE)) {
console.warn('⚠️  docs/iframe.css not found. Create it so styles apply inside the iframe.');
}

console.log('✅ Converted', SRC_MD, '→', DEST_HTML);
