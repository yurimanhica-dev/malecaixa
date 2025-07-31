export const formatMZN = (value: number) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `${formattedNumber} MZN`;
};

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("pt-MZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
