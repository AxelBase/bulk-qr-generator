// src/lib/zipDownloader.js
import JSZip from 'jszip';
import pkg from 'file-saver';
const { saveAs } = pkg;  // ← This is the correct way

export async function downloadAsZip(qrBlobs, format = 'png') {
  if (qrBlobs.length === 0) return;

  const zip = new JSZip();
  const folder = zip.folder('qr-codes');

  qrBlobs.forEach(({ blob, filename }) => {
    const ext = format === 'png' ? 'png' : 'svg';
    folder.file(`${filename}.${ext}`, blob);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  saveAs(zipBlob, `bulk-qr-codes-${timestamp}.${format}.zip`);
}