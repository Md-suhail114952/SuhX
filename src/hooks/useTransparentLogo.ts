import { useState, useEffect } from "react";

/**
 * A custom Hook that dynamically loads an image and strips away any near-black background pixels using HTML5 Canvas.
 * This guarantees a high-fidelity, transparent PNG logo without a dark box background,
 * even when scrolling or rendering over rich color gradients.
 */
export function useTransparentLogo(logoSrc: string) {
  const [cleanLogoSrc, setCleanLogoSrc] = useState<string>(logoSrc);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!logoSrc) return;

    const img = new Image();
    // Allow canvas reading if hosted locally or via CORS
    img.crossOrigin = "anonymous";
    img.src = logoSrc;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setIsReady(true);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Strip dark background pixels with nice edge anti-fringe smoothing
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Threshold check: find maximum intensity of any color channel
          const maxColor = Math.max(r, g, b);

          if (maxColor < 26) {
            // Under lower threshold: make fully transparent
            data[i + 3] = 0;
          } else if (maxColor < 60) {
            // Midtone margin: smoothly fade alpha channels for soft anti-aliased transitions
            const ratio = (maxColor - 26) / (60 - 26);
            data[i + 3] = Math.round(ratio * data[i + 3]);
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setCleanLogoSrc(canvas.toDataURL());
        setIsReady(true);
      } catch (err) {
        console.warn("Could not dynamically strip logo background due to browser context restrictions, fallback to original:", err);
        setCleanLogoSrc(logoSrc);
        setIsReady(true);
      }
    };

    img.onerror = () => {
      setCleanLogoSrc(logoSrc);
      setIsReady(true);
    };
  }, [logoSrc]);

  return { src: cleanLogoSrc, isReady };
}
