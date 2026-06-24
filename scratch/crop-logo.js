const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'public/images/newlogowithdisc.png';
const outputBlackPath = 'public/images/magnat-logo-header.png';
const outputWhitePath = 'public/images/magnat-logo-footer.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Find the bounding box of non-white content (where R < 250 || G < 250 || B < 250)
    let minX = this.width;
    let maxX = 0;
    let minY = this.height;
    let maxY = 0;
    let found = false;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        if (r < 250 || g < 250 || b < 250) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) {
      console.log('No logo elements found in the image!');
      return;
    }

    // Add 8px padding to all sides for visual breathing room
    const padding = 8;
    minX = Math.max(0, minX - padding);
    maxX = Math.min(this.width - 1, maxX + padding);
    minY = Math.max(0, minY - padding);
    maxY = Math.min(this.height - 1, maxY + padding);

    const croppedWidth = maxX - minX + 1;
    const croppedHeight = maxY - minY + 1;

    console.log(`Original size: ${this.width}x${this.height}`);
    console.log(`Cropped bounding box: X: ${minX}..${maxX}, Y: ${minY}..${maxY}`);
    console.log(`New size: ${croppedWidth}x${croppedHeight}`);

    // Create the cropped black-text logo and white-text logo
    const blackPng = new PNG({ width: croppedWidth, height: croppedHeight });
    const whitePng = new PNG({ width: croppedWidth, height: croppedHeight });

    for (let y = 0; y < croppedHeight; y++) {
      for (let x = 0; x < croppedWidth; x++) {
        const oldX = minX + x;
        const oldY = minY + y;
        const oldIdx = (this.width * oldY + oldX) << 2;
        const newIdx = (croppedWidth * y + x) << 2;

        const r = this.data[oldIdx];
        const g = this.data[oldIdx + 1];
        const b = this.data[oldIdx + 2];

        // Color unblending formula from white background
        const whiteness = Math.min(r, g, b);
        const alpha = 255 - whiteness;

        let newR = 0, newG = 0, newB = 0;
        if (alpha > 0) {
          const aFactor = alpha / 255;
          newR = Math.round(255 - (255 - r) / aFactor);
          newG = Math.round(255 - (255 - g) / aFactor);
          newB = Math.round(255 - (255 - b) / aFactor);

          // Clamp values to [0, 255]
          newR = Math.max(0, Math.min(255, newR));
          newG = Math.max(0, Math.min(255, newG));
          newB = Math.max(0, Math.min(255, newB));
        }

        // Save transparent black-text logo
        blackPng.data[newIdx] = newR;
        blackPng.data[newIdx + 1] = newG;
        blackPng.data[newIdx + 2] = newB;
        blackPng.data[newIdx + 3] = alpha;

        // Save transparent white-text logo
        // The text starts after the red icon. Red icon ends around X = 585.
        // Let's use oldX >= 600 to target the text (including the description).
        if (oldX >= 600 && alpha > 0) {
          whitePng.data[newIdx] = 255;
          whitePng.data[newIdx + 1] = 255;
          whitePng.data[newIdx + 2] = 255;
          whitePng.data[newIdx + 3] = alpha;
        } else {
          whitePng.data[newIdx] = newR;
          whitePng.data[newIdx + 1] = newG;
          whitePng.data[newIdx + 2] = newB;
          whitePng.data[newIdx + 3] = alpha;
        }
      }
    }

    // Save black cropped PNG
    blackPng.pack()
      .pipe(fs.createWriteStream(outputBlackPath))
      .on('finish', () => {
        console.log(`Saved transparent black logo with description to ${outputBlackPath}`);
      });

    // Save white cropped PNG
    whitePng.pack()
      .pipe(fs.createWriteStream(outputWhitePath))
      .on('finish', () => {
        console.log(`Saved transparent white logo with description to ${outputWhitePath}`);
      });
  });
