export const formatDateToDateAndHour = (date): string => {
  return Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  }).format(date);
};
