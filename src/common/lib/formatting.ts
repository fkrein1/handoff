export const formatCurrency = (
  amount: number,
  locale = "en-US",
  currency = "USD",
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
