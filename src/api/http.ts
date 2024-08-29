export const default_api = {
  base_url: import.meta.env.VITE_API_URL,
  headers: {
    'bypass-tunnel-reminder': 'true',
    'Access-Control-Allow-Origin': '*'
  },
  disableRedirects: true
}
