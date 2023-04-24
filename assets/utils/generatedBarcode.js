export function generatedBarcode(selector, value){
  // genereted code b
  JsBarcode(selector, value, {
    format: "CODE128",
    lineColor: "#0aa",
    width: 4,
    height: 70,
    displayValue: true
})
}