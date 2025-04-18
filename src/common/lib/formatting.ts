export const formatCurrency = (
  amount: number,
  locale = "en-US",
  currency = "USD",
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount ?? 0);

export const formatInputCurrency = (input: string): string => {
  const numericValue = input.replace(/[^0-9]/g, "");
  const value = numericValue ? parseInt(numericValue, 10) : 0;
  return formatCurrency(value / 100);
};

export const formatInputCurrencyToNumber = (input: string): number => {
  const numericValue = input.replace(/[^0-9]/g, "");
  const value = numericValue ? parseInt(numericValue, 10) : 0;
  return value / 100;
};
