import React, { useEffect, useState } from 'react';

export default function Home() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetch('http://localhost:80/api/tabs')
      .then(res => res.json())
      .then(data => setTabs(data))
      .catch(err => console.error('Ошибка загрузки вкладок:', err));
  }, []);

  if (!tabs.length) return <p>Загрузка...</p>;

  const currentTab = tabs[activeTab];

  return (
    <div className="page home">
      {/* Добавляем отступ между шапкой и вкладками */}
      <div style={{ marginTop: '2rem' }}>
        <div className="tab-list">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`tab-button ${activeTab === i ? 'active' : ''}`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      <div className="tab-content">
        {/* Множество изображений */}
        <div className="tab-images">
          {currentTab.image.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`${currentTab.title} Изображение ${index + 1}`}
              style={{ maxWidth: '80%', margin: '1rem auto' }}
            />
          ))}
        </div>

        {/* Таблица */}
        <table className="data-table">
          <tbody>
            {Object.entries(JSON.parse(currentTab.tableData)).map(([key, val], i) => (
              <tr key={i}>
                <td>{key}</td>
                <td>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}