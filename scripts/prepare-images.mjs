import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// The source argument is optional: optimized assets are committed for normal builds.
const sourceIndex = process.argv.indexOf("--trilinea-source");
if (sourceIndex !== -1) {
    if (!process.argv[sourceIndex + 1]) throw new Error("Provide the source render path.");
    await mkdir("public/projects", { recursive: true });
    await sharp(resolve(process.argv[sourceIndex + 1]))
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile("public/projects/trilinea.webp");
}

await mkdir("public/social", { recursive: true });
const cards = [
    ["portfolio", "AI Engineer.", "Software foundations. AI focus."],
    ["financial-rag", "Financial RAG API", "Answers with context. Sources you can inspect."],
    ["code-review-agent", "Code Review Agent", "A small agent. An inspectable review loop."],
    ["opencode-voice-input", "OpenCode Voice Input", "From spoken thought to a working prompt."],
    ["synthetic-face-detector", "Synthetic Face Detector", "A model is only as good as its evaluation."],
    ["trilinea", "Trilinea Arquitectura", "Interactive spaces. Thoughtful engineering."],
];

for (const [slug, title, subtitle] of cards) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#1c1918"/><circle cx="1070" cy="190" r="290" fill="none" stroke="#464038"/><circle cx="1070" cy="190" r="235" fill="none" stroke="#464038"/><rect x="72" y="70" width="68" height="68" rx="20" fill="#b7a3d8"/><text x="86" y="115" font-family="sans-serif" font-size="34" fill="#1c1918">ao.</text><text x="72" y="235" font-family="monospace" font-size="18" fill="#b7a3d8">ANDRES OBISPO CALLA / SELECTED WORK</text><text x="68" y="345" font-family="sans-serif" font-weight="600" font-size="${title.length > 22 ? 66 : 78}" fill="#e6ddd1">${title}</text><text x="72" y="405" font-family="sans-serif" font-size="29" fill="#b9afa2">${subtitle}</text><path d="M72 513h1056" stroke="#494139"/><text x="72" y="557" font-family="monospace" font-size="18" fill="#bfae98">SOFTWARE + AI SYSTEMS</text></svg>`;
    await sharp(Buffer.from(svg)).png().toFile(`public/social/${slug}.png`);
}
console.log("Optimized project imagery and social cards are ready.");
