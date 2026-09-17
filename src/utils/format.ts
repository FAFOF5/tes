export function formatHours(hours: number): string {
  return `${hours.toFixed(1)} ساعة`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}
