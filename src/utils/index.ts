import { Reservation } from '../interfaces/reservation';

export function timeString(reservation: Reservation) {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Date(`${reservation.date} ${reservation.time}`).toLocaleTimeString(
    'en-US',
    options
  );
}

export function isPassed(reservation: Reservation) {
  return (
    new Date().getTime() >
    new Date(`${reservation.date} ${reservation.time}`).getTime()
  );
}
