

export function ComvertTimeZone (
    date: string
) {
    return new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
}

export function ComvertDateZone (
    date: string
) {
    return new Date(date).toLocaleDateString()
}

export function formatearFecha(fechaISO: string): string {
  const fecha = new Date(fechaISO);

  // Días de la semana y meses en español
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  return `${diaSemana} ${dia} ${mes}`;
}