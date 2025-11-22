export function sanitizeFilename(str) {
	return str
		.replace(/[/\\?%*:|"<>]/g, '-')
		.replace(/\s+/g, '_')
		.substring(0, 100) || 'qr';
}

export function estimateZipSize(rowCount, size = 300, format = 'png') {
	const avgBytesPerQr = format === 'png' ? size * size * 0.15 : size * size * 0.05;
	const totalBytes = rowCount * avgBytesPerQr;
	const sizeMB = (totalBytes / (1024 * 1024)).toFixed(1);
	return `${rowCount.toLocaleString()} QR codes ≈ ${sizeMB} MB`;
}

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}