(async () => {
  try {
    const JimpModule = await import("jimp");
    const Jimp = JimpModule.default ?? JimpModule;
    let readFunc = null;
    if (typeof Jimp.read === "function") readFunc = Jimp.read;
    else if (Jimp.default && typeof Jimp.default.read === "function")
      readFunc = Jimp.default.read;
    else if (Jimp.Jimp && typeof Jimp.Jimp.read === "function")
      readFunc = Jimp.Jimp.read;
    else if (typeof Jimp === "function") readFunc = Jimp;

    if (!readFunc) {
      console.error(
        "Could not find Jimp read function export shape",
        Object.keys(JimpModule),
      );
      process.exit(2);
    }

    const img = await readFunc("public/images/fashion.png");
    const { width: w, height: h } = img.bitmap;

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
        const hex = img.getPixelColor(x, y);
        const rgba = Jimp.intToRGBA(hex);
        r += rgba.r;
        g += rgba.g;
        b += rgba.b;
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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
