const fs = require('fs');
const path = require('path');

const TABS_FILE = path.join(__dirname, '../data/tabs.json');

exports.getAllTabs = (req, res) => {
  try {
    const data = fs.readFileSync(TABS_FILE);
    const tabs = JSON.parse(data);
    res.json(tabs);
  } catch (err) {
    console.error('Ошибка чтения файла tabs.json:', err);
    res.status(500).json({ error: 'Не удалось загрузить вкладки' });
  }
};

exports.createTab = (req, res) => {
  try {
    const data = fs.readFileSync(TABS_FILE);
    const tabs = JSON.parse(data);

    const newTab = { ...req.body, id: Date.now() };
    tabs.push(newTab);

    fs.writeFileSync(TABS_FILE, JSON.stringify(tabs, null, 2));
    res.json(newTab);
  } catch (err) {
    console.error('Ошибка создания вкладки:', err);
    res.status(500).json({ error: 'Не удалось создать вкладку' });
  }
};