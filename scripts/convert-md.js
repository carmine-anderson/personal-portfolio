const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// --- Paths ---
const inputPath = path.resolve('./docs/internship_helper.md');
const outputPath = path.resolve('./docs/internship_helper.html');

// --- Read Markdown ---
const markdown = fs.readFileSync(inputPath, 'utf-8');

// --- Convert to HTML ---
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Internship Helper Documentation</title>
<link rel="stylesheet" href="../styles.css">
<style>
    body {
    padding: 1rem;
    background: var(--card);
    color: var(--text);
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    }
    h1, h2, h3 { color: var(--brand); }
    code, pre {
    background: #0b0d12;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    }
    pre {
    padding: 0.75rem;
    overflow-x: auto;
    }
    a { color: var(--brand); text-decoration: underline; }
</style>
</head>
<body>
${marked.parse(markdown)}
</body>
</html>
`;

// --- Write HTML file ---
fs.writeFileSync(outputPath, htmlContent, 'utf-8');
console.log(`✅ Converted ${inputPath} → ${outputPath}`);
