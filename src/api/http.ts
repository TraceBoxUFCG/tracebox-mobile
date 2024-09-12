export const defaultAPI = {
  base_url: import.meta.env.VITE_API_URL,
  headers: {
    'bypass-tunnel-reminder': 'true',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
  disableRedirects: true
}
