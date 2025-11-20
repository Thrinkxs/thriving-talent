//  Helper functions for readable date formatting,
// formats dates from backend for the barchart on the employer home dashboard page
export function formatDailyDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatWeeklyDate(weekStr: string): string {
  // e.g. "2025-W45" → "Week 45 (Nov)"
  const [year, week] = weekStr.split("-W");
  //   return `Week ${week} (${year})`;
  return `Week ${week}`;
}

export function formatMonthlyDate(monthStr: string): string {
  // e.g. "2025-07" → "July 2025"
  const [year, month] = monthStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  //   return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return date.toLocaleDateString("en-US", { month: "long" });
}
