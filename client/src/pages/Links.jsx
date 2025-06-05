import React, { useEffect, useState } from 'react';

export default function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:80/api/links')
      .then(res => res.json())
      .then(data => {
        setLinks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки ссылок:', err);
        setError('Не удалось загрузить ссылки');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="page links">
      <h2>Полезные ссылки</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>URL</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={index}>
              <td>{link.title || '—'}</td>
              <td><a href={link.url} target="_blank" rel="noopener noreferrer" className="links-page">Перейти</a></td>
              <td>{link.description || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}