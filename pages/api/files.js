import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filesDir = path.join(process.cwd(), 'public', 'files');

  try {
    const files = fs.readdirSync(filesDir);

    // Filter hanya file (bukan folder) dan kirim nama + path
    const fileList = files
      .filter((file) => {
        const filePath = path.join(filesDir, file);
        return fs.statSync(filePath).isFile();
      })
      .map((file) => ({
        name: file,
        path: /files/${encodeURIComponent(file)},
      }));

    res.status(200).json(fileList);
  } catch (error) {
    res.status(500).json({ error: 'Gagal membaca folder files' });
  }
}
