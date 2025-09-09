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
    <!-- IMPORTANT: allow proper scaling on small screens -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Internship Helper Documentation</title>
    <link rel="stylesheet" href="../styles.css"> <!-- optional shared vars -->
    <style>
    /* Reset & layout inside iframe */
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
        padding: 1rem;
        background: var(--card, #14161d);
        color: var(--text, #e6e6e6);
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        overflow-x: hidden;     /* kill horizontal scroll */
    }

    /* Content width (optional) */
    .doc {
      max-width: 980px;       /* keep lines readable */
        margin: 0 auto;
    }

    h1, h2, h3 { color: var(--brand, #5da9ff); margin-top: 1rem; }

    /* Make images RESPONSIVE */
    img {
  width: 80%;             /* Default: 80% of container width */
  max-width: 700px;       /* Don’t grow past this size */
  min-width: 250px;       /* Don’t shrink below this size */
  height: auto;           /* Keep aspect ratio */
  display: block;
  margin: 1.5rem auto;    /* Center with spacing around */
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  object-fit: contain;
  transition: transform 0.2s ease, width 0.2s ease;
}

img:hover {
  transform: scale(1.03); /* Subtle zoom effect on hover */
}


    /* Code blocks */
    pre, code {
        background: #0b0d12;
        color: #e6e6e6;
        border-radius: 8px;
    }
    pre { padding: 0.75rem; overflow: auto; }
    code { padding: 0.1rem 0.3rem; }

    a { color: var(--brand, #5da9ff); text-decoration: underline; text-underline-offset: 3px; }
    </style>
</head>
<body>
    <main class="doc">
    ${marked.parse(markdown)}
    </main>

    <script>
    document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => {
        const win = window.open(img.src, '_blank');
        win.focus();
    });
    });
    </script>

</body>
</html>
`;


// --- Write HTML file ---
fs.writeFileSync(outputPath, htmlContent, 'utf-8');
console.log(`✅ Converted ${inputPath} → ${outputPath}`);
