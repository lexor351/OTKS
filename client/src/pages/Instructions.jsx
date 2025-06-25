import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function Instructions() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Загрузка категорий
  useEffect(() => {
    fetch('http://localhost:80/api/instructions')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0]);
      })
      .catch(err => console.error('Ошибка загрузки категорий:', err))
      .finally(() => setLoading(false));
  }, []);

  // Загрузка файлов по категории
  useEffect(() => {
    if (!activeCategory) return;

    fetch(`http://localhost:80/api/instructions/${activeCategory}`)
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        if (data.length > 0) setActiveFile(data[0]);
      })
      .catch(err => console.error('Ошибка загрузки файлов:', err));
  }, [activeCategory]);

  // Загрузка содержимого файла
  useEffect(() => {
    if (!activeFile || !activeCategory) return;

    fetch(`http://localhost:80/api/instructions/${activeCategory}/${activeFile}`)
      .then(res => res.json())
      .then(data => {
        setContent(marked.parse(data.content));
      })
      .catch(err => {
        console.error('Ошибка загрузки контента:', err);
        setContent('<p>Не удалось загрузить инструкцию</p>');
      });
  }, [activeCategory, activeFile]);

  if (loading) return <p>Загрузка инструкций...</p>;

  return (
    <div className="page instructions">
      <h2>Инструкции</h2>

      {/* Категории */}
      <div className="tab-list level-1">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'tab-button active' : 'tab-button'}
          >
            {cat === 'shift' ? 'Инструкции сменного' : 'Доп. инструкции'}
          </button>
        ))}
      </div>

      {/* Файлы внутри категории */}
      {files.length > 0 && (
        <div className="tab-list level-2" style={{ marginTop: '2rem' }}>
          {files.map((file, i) => (
            <button
              key={i}
              onClick={() => setActiveFile(file)}
              className={activeFile === file ? 'tab-button active' : 'tab-button'}
            >
              {file.replace('.md', '').replace(/[-_]/g, ' ')}
            </button>
          ))}
        </div>
      )}

      {/* Содержимое Markdown */}
      <div className="markdown-output" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}