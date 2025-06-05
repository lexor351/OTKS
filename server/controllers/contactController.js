const fs = require('fs');
const path = require('path');

const CONTACTS_FILE = path.join(__dirname, '../data/contacts.json');

exports.getAllContacts = (req, res) => {
  try {
    const data = fs.readFileSync(CONTACTS_FILE);
    const contacts = JSON.parse(data);
    res.json(contacts);
  } catch (err) {
    console.error('Ошибка чтения файла contacts.json:', err);
    res.status(500).json({ error: 'Не удалось загрузить контакты' });
  }
};

exports.createContact = (req, res) => {
  try {
    const data = fs.readFileSync(CONTACTS_FILE);
    const contacts = JSON.parse(data);

    const newContact = { ...req.body, id: Date.now() };
    contacts.push(newContact);

    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    res.json(newContact);
  } catch (err) {
    console.error('Ошибка создания контакта:', err);
    res.status(500).json({ error: 'Не удалось создать контакт' });
  }
};