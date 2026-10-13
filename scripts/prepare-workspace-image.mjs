import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const [workspaceSource] = process.argv.slice(2);
if (!workspaceSource) {
    throw new Error("Usage: npm run prepare:workspace -- <workspace.jpg>");
}

const destination = "public/profile";
await mkdir(destination, { recursive: true });

await sharp(resolve(workspaceSource))
    .rotate()
    .resize(960, 1200, { fit: "cover" })
    .modulate({ brightness: 1.07, saturation: 0.72 })
    .webp({ quality: 86 })
    .toFile(`${destination}/workspace.webp`);

console.log("Workspace image prepared; the original photograph is unchanged.");
