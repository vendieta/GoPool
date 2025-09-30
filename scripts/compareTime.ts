type CompareStatus = "ontime" | "expired"

// Función auxiliar para obtener la hora actual en Guayaquil
export function getNowInGuayaquil(): Date {
  const now = new Date()

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Guayaquil",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const parts = formatter.formatToParts(now)
  const values: Record<string, string> = {}

  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value
    }
  }

  return new Date(
    `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`
  )
}

export function compareServiceTime(
  serviceTime: string,
  toleranceMinutes: number = 0
): CompareStatus {
  const now = getNowInGuayaquil().getTime() // hora actual en Guayaquil
  const serviceDate = new Date(serviceTime).getTime() // hora del servicio

  const toleranceMs = toleranceMinutes * 60 * 1000

  // Si está dentro del rango de tolerancia (antes o después) → "ontime"
  if (now >= serviceDate - toleranceMs && now <= serviceDate + toleranceMs) {
    return "ontime"
  }

  // En cualquier otro caso → "expired"
  return "expired"
}


export const formatearHora12 = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };


  export const formatearFechaLocal = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const obtenerDiaSemana = (date: Date): string => {
    return date.toLocaleDateString('es-ES', { weekday: 'long' });
};

export function combinarFechaYHora(fecha: Date, hora: Date): Date {
  const nuevaFecha = new Date(fecha); // copiamos la fecha
  nuevaFecha.setHours(hora.getHours(), hora.getMinutes(), hora.getSeconds(), 0); // ajustamos la hora
  return nuevaFecha;
}