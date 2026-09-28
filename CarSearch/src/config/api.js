// URL do backend Spring Boot. Em dispositivo físico/emulador "localhost"
// não aponta para o computador, então defina EXPO_PUBLIC_API_URL
// (ex: http://192.168.0.10:8080) no .env ou no perfil do eas.json.
export const BASE_URL = (
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080"
).replace(/\/$/, "");
