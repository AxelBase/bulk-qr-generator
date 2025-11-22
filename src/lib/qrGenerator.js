// src/lib/qrGenerator.js  ← NEW VERSION (fixes the crash)
let kjuaPromise = null;

async function getKjua() {
  if (!kjuaPromise) {
    kjuaPromise = import('kjua');
  }
  const kjuaModule = await kjuaPromise;
  return kjuaModule.default || kjuaModule;
}

export async function generateQrCode(text, options = {}) {
  const kjua = await getKjua();

  const defaultOptions = {
    size: 300,
    ecLevel: 'M',
    fill: '#000000',
    back: '#ffffff',
    rounded: 80,
    quiet: 2,
    mode: 'plain'
  };

  const config = { ...defaultOptions, ...options, text };
  return kjua(config);
}

export function buildContentFromRow(row, columnNames, prefix = '', suffix = '') {
  if (!columnNames || columnNames.length === 0) return '';
  const parts = columnNames.map(col => row[col] || '');
  const content = parts.join(' ');
  return prefix + content + suffix;
}