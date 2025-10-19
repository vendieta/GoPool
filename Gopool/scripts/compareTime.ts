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

type Status = "ontime" | "expired";

export function checkTime(
  isoDate: string,
  toleranceMinutes: number = 0
): Status {
  const now = new Date().getTime();
  const target = new Date(isoDate).getTime();

  const toleranceMs = toleranceMinutes * 60 * 1000;
   console.log('🥺🥺🥺🥺🥺🥺🥺',now <= target + toleranceMs, now, target, new Date(), isoDate)
  if (now <= target + toleranceMs) {
    return "ontime";
  }
  return "expired";
}


// export function compareServiceTime(
//   serviceTime: string,
//   toleranceMinutes: number = 0
// ): CompareStatus {
//   console.log('eeeeeeeeeeeeeeeeeeeeeeeeeS',serviceTime)
//   // Hora actual en UTC
//   const now = Date.now(); // Equivalente a new Date().getTime()
  
//   // Convertir serviceTime a timestamp UTC
//   const serviceDate = new Date(serviceTime).getTime();

//   const toleranceMs = toleranceMinutes * 60 * 1000;

//   console.log('🥺🥺🥺🥺🥺🥺🥺',now >= serviceDate - toleranceMs && now <= serviceDate + toleranceMs, now >= serviceDate - toleranceMs, now <= serviceDate + toleranceMs, serviceTime, new Date, Date.now(), now, serviceDate )

//   if (now >= serviceDate - toleranceMs && now <= serviceDate + toleranceMs) {
//     return "ontime";
//   }

//   return "expired";
// }

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
  console.log(fecha, hora)
  const nuevaFecha = new Date(fecha); // copiamos la fecha
  nuevaFecha.setHours(hora.getHours(), hora.getMinutes(), hora.getSeconds(), 0); // ajustamos la hora
  return nuevaFecha;
}