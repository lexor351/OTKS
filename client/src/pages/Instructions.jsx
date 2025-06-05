import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function Instructions() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Получаем список файлов
  useEffect(() => {
    fetch('http://localhost:80/api/instructions')
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        if (data.length > 0) {
          setActiveFile(data[0]);
        }
      })
      .catch(err => console.error('Ошибка загрузки инструкций:', err))
      .finally(() => setLoading(false));
  }, []);

  // Получаем содержимое файла
  useEffect(() => {
    if (!activeFile) return;

    fetch(`http://localhost:80/api/instructions/${activeFile}`)
      .then(res => res.json())
      .then(data => {
        setContent(marked.parse(data.content)); // Используем marked.parse()
      })
      .catch(err => {
        console.error('Ошибка чтения файла:', err);
        setContent('<p>Не удалось загрузить содержимое.</p>');
      });
  }, [activeFile]);

  // Загрузка нового файла
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:80/api/instructions/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert('Файл успешно загружен');
        window.location.reload(); // Обновляем список файлов
      })
      .catch(err => {
        console.error('Ошибка загрузки файла:', err);
        alert('Ошибка загрузки файла');
      });
  };

  if (loading) return <p>Загрузка инструкций...</p>;

  return (
    <div className="page instructions">
      <h2>Инструкции</h2>

      {/* Вкладки */}
      <div className="tab-list">
        {files.map((file, i) => (
          <button
            key={i}
            onClick={() => setActiveFile(file)}
            className={activeFile === file ? 'tab-button active' : 'tab-button'}
          >
            {file}
          </button>
        ))}
      </div>

      {/* Содержимое выбранной вкладки */}
      <div className="markdown-output" dangerouslySetInnerHTML={{ __html: content }} />


    </div>
  );
}