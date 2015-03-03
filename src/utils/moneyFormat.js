export default function moneyFormat (value) {
  return Number(String(value).replace(/[,]/g, '.'))
    .toFixed(2)
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ') // 1234567.00 => 1 234 567.00
    .replace(/[.]/g, ',');
}
