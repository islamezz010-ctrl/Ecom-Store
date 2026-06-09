import fs from "fs";
import { PNG } from "pngjs";

const filePath = "public/images/fashion.png";

fs.createReadStream(filePath)
  .pipe(new PNG())
  .on("parsed", function () {
    const img = this;
    const w = img.width;
    const h = img.height;

    const cx = Math.floor(w * 0.12);
    const cy = Math.floor(h * 0.5);
    const box = 30;

    let r = 0,
      g = 0,
      b = 0,
      count = 0;

    for (
      let y = Math.max(0, cy - Math.floor(box / 2));
      y < Math.min(h, cy + Math.floor(box / 2));
      y++
    ) {
      for (
        let x = Math.max(0, cx - Math.floor(box / 2));
        x < Math.min(w, cx + Math.floor(box / 2));
        x++
      ) {
        const idx = (w * y + x) << 2;
        r += img.data[idx];
        g += img.data[idx + 1];
        b += img.data[idx + 2];
        count++;
      }
    }

    if (!count) {
      console.error("No pixels sampled");
      process.exit(2);
    }

    const avgR = Math.round(r / count);
    const avgG = Math.round(g / count);
    const avgB = Math.round(b / count);

    const toHex = (v) => v.toString(16).padStart(2, "0");
    const hex = "#" + toHex(avgR) + toHex(avgG) + toHex(avgB);

    console.log(hex);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
