// utils/phoneUtils.ts

export function numberCheck(phone: string): string | null {
  // Eliminar espacios y guiones por si acaso
  const cleanPhone = phone.replace(/\D/g, "");

  // Caso 1: ya tiene +593
  if (phone.startsWith("+593")) {
    const rest = cleanPhone.slice(3); // números después de 593
    if (rest.length === 9) {
      return `+593${rest}`;
    }
    return null; // no cumple formato
  }

  // Caso 2: empieza con 0 y tiene 10 dígitos
  if (cleanPhone.startsWith("0") && cleanPhone.length === 10) {
    const rest = cleanPhone.slice(1); // quitar el 0
    return `+593${rest}`;
  }

  // Si no cumple nada
  return null;
}
