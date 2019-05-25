/**
 * Converts minutes (e.g. 134) to hours and minutes (2h 14min)
 * @param {Number} minutes
 */
export default function minutesToHours(minutes) {
  if (!minutes) return null;
  if (minutes <= 60) return `${minutes}min`;

  const hours = Math.floor(minutes / 60);
  const minsLeft = minutes % 60;

  if (minsLeft === 0) return `${hours}h`;

  return `${hours}h ${minsLeft}min`;
}
