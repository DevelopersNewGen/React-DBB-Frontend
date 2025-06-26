export function validatePassword(password) {
  if (!password) return "La contraseña es requerida";
  if (password.length < 8) return "Debe tener al menos 8 caracteres";
  if (!/[A-Z]/.test(password)) return "Debe tener al menos una mayúscula";
  if (!/[a-z]/.test(password)) return "Debe tener al menos una minúscula";
  if (!/[0-9]/.test(password)) return "Debe tener al menos un número";
  if (!/[^A-Za-z0-9]/.test(password)) return "Debe tener al menos un símbolo";
  return null;
}