import React, { useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [tableData, setTableData] = useState('');

  const handleSubmit = async () => {
    await axios.post('/api/tabs', { title, image, tableData });
    alert('Вкладка добавлена!');
  };

  return (
    <div className="page admin">
      <h2>Админка</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>Название вкладки:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Ссылка на изображение:</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} />

        <label>Таблица (JSON):</label>
        <textarea
          placeholder='{"Параметр":"Значение", "Единица":"м/с"}'
          value={tableData}
          onChange={(e) => setTableData(e.target.value)}
        ></textarea>

        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}