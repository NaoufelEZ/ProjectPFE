import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";

export const GenerateBarcodeBase64 = (value) => {
  const canvas = createCanvas();
  JsBarcode(canvas, value, { format: "CODE128" });
  return canvas.toDataURL("image/png");
};
