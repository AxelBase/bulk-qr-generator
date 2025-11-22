import Papa from 'papaparse';

export function parseCsvFile(file) {
	return new Promise((resolve, reject) => {
		Papa.parse(file, {
			complete: (result) => {
				if (result.errors.length > 0 && result.data.length === 0) {
					reject(new Error('CSV parsing failed or file is empty'));
				} else {
					resolve(cleanParsedData(result.data));
				}
			},
			error: (err) => reject(err),
			skipEmptyLines: true,
			dynamicTyping: false,
			encoding: 'UTF-8'
		});
	});
}

export function parseCsvText(text) {
	return new Promise((resolve, reject) => {
		if (!text.trim()) return reject(new Error('CSV text is empty'));
		Papa.parse(text.trim(), {
			complete: (result) => {
				if (result.errors.length > 0 && result.data.length === 0) {
					reject(new Error('Invalid CSV format'));
				} else {
					resolve(cleanParsedData(result.data));
				}
			},
			error: (err) => reject(err),
			skipEmptyLines: true
		});
	});
}

function cleanParsedData(data) {
	if (data.length === 0) return { headers: [], rows: [] };
	const headers = data[0].map(h => h.trim());
	const rows = data.slice(1).map(row => {
		const obj = {};
		headers.forEach((h, i) => {
			obj[h] = (row[i] || '').toString().trim();
		});
		return obj;
	}).filter(row => Object.values(row).some(val => val !== ''));
	return { headers, rows };
}