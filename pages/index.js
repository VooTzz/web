import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch('/api/files');
        const data = await res.json();
        setFiles(data);
      } catch (error) {
        console.error('Gagal fetch file:', error);
      }
    }
    fetchFiles();
  }, []);

  // Filter file berdasarkan pencarian
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <audio src="/music.mp3" autoPlay loop controls className={styles.audio} />
      
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>COSMOS PUNYA</div>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Cari file..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filesContainer}>
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <a
              key={file.name}
              href={file.path}
              download
              className={styles.fileLink}
            >
              {file.name}
            </a>
          ))
        ) : (
          <p>Tidak ada file ditemukan.</p>
        )}
      </div>
    </div>
  );
}
