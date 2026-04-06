const dateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/;

export function formatDateOnly(
  value: string | null,
  locale = "en-US",
): string {
  if (!value) {
    return "Not provided";
  }

  const match = dateOnlyPattern.exec(value);

  if (!match) {
    return value;
  }

  const [, year, month, day] = match;
  const utcDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(utcDate);
}
