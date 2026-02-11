export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
  locale = 'es-CO'
) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(
    locale,
    options ?? {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  ).format(date);
}
