import React, { useEffect, useState } from 'react';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:80/api/contacts')
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки контактов:', err);
        setError('Не удалось загрузить контакты');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="page contacts">
      <h2>Контакты</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Должность</th>
            <th>Номер</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name || '—'}</td>
              <td>{contact.position || '—'}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}