export const FAVICON_SIZES = [16, 32, 48, 180, 192, 512] as const;

export interface FaviconImage {
  size: number;
  blob: Blob;
}

async function resizeSquare(bitmap: ImageBitmap, size: number): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo crear el contexto de canvas");

  // recorte centrado a cuadrado antes de escalar, para no deformar logos no cuadrados
  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo generar el favicon"))),
      "image/png"
    );
  });
}

export async function generateFavicons(file: File): Promise<FaviconImage[]> {
  const bitmap = await createImageBitmap(file);
  const images: FaviconImage[] = [];
  for (const size of FAVICON_SIZES) {
    images.push({ size, blob: await resizeSquare(bitmap, size) });
  }
  bitmap.close();
  return images;
}

export async function bundleFaviconsAsZip(images: FaviconImage[]): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const img of images) {
    zip.file(`favicon-${img.size}x${img.size}.png`, await img.blob.arrayBuffer());
  }
  return zip.generateAsync({ type: "blob" });
}
