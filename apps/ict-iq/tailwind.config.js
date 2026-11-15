/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#FCFCFC', navy: '#00051A', coal: '#05070C', panel: '#0A0F1C', line: 'rgba(147,170,220,.16)', cyan: '#93F9FF', sky: '#57A1EF', royal: '#3977D5', mut: '#9AA4B8', up: '#2EE6A6', down: '#FF4D5E', liq: '#FF8A4C' },
    fontFamily: { ar: ['Tajawal', 'system-ui', 'sans-serif'], en: ['Michroma', 'system-ui', 'sans-serif'], num: ['Inter', 'system-ui', 'sans-serif'] },
  } },
  plugins: [],
};
