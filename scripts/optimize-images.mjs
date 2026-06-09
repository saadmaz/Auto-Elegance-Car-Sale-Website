import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, extname, basename } from "path";

const SRC = new URL("../src/assets", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

const files = await readdir(SRC);
const images = files.filter((f) => /\.(png|jpg|jpeg)$/i.test(f));

for (const file of images) {
  const input = join(SRC, file);
  const name = basename(file, extname(file));
  const output = join(SRC, `${name}.webp`);

  const info = await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toFile(output);

  const srcKB = Math.round((await import("fs")).default.statSync(input).size / 1024);
  const dstKB = Math.round(info.size / 1024);
  console.log(`${file}  →  ${name}.webp  (${srcKB} KB → ${dstKB} KB, -${Math.round((1 - dstKB / srcKB) * 100)}%)`);
}
