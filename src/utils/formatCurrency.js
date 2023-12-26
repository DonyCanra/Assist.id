// formatCurrencyRupiah.js
export function formatCurrencyRupiah(number) {
  const formatter = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}

// parseCurrencyRupiah.js
export function parseCurrencyRupiah(currencyString) {
  const sanitizedString = currencyString.replace(/[^\d,]/g, "").replace(",", ".");

  return parseFloat(sanitizedString);
}

// console.log(formatCurrencyRupiah(100000));
// console.log(parseCurrencyRupiah("Rp.10.000,00"));
