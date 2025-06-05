const fs = require('fs');
const path = require('path');

const LINKS_FILE = path.join(__dirname, '../data/links.json');

exports.getAllLinks = (req, res) => {
  try {
    const data = fs.readFileSync(LINKS_FILE);
    const links = JSON.parse(data);
    res.json(links);
  } catch (err) {
    console.error('Ошибка чтения файла links.json:', err);
    res.status(500).json({ error: 'Не удалось загрузить ссылки' });
  }
};

exports.createLink = (req, res) => {
  try {
    const data = fs.readFileSync(LINKS_FILE);
    const links = JSON.parse(data);

    const newLink = { ...req.body, id: Date.now() };
    links.push(newLink);

    fs.writeFileSync(LINKS_FILE, JSON.stringify(links, null, 2));
    res.json(newLink);
  } catch (err) {
    console.error('Ошибка создания ссылки:', err);
    res.status(500).json({ error: 'Не удалось создать ссылку' });
  }
};