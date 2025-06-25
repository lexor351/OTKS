const fs = require('fs');
const path = require('path');

const INSTRUCTIONS_DIR = path.join(__dirname, '../uploads/instructions');

// Получить список категорий (папок)
exports.getCategories = (req, res) => {
  try {
    const categories = fs.readdirSync(INSTRUCTIONS_DIR).filter(file =>
      fs.statSync(path.join(INSTRUCTIONS_DIR, file)).isDirectory()
    );
    res.json(categories);
  } catch (err) {
    console.error('Ошибка получения категорий:', err);
    res.status(500).json({ error: 'Не удалось получить категории' });
  }
};

// Получить список файлов в категории
exports.getFilesByCategory = (req, res) => {
  const { category } = req.params;
  const dirPath = path.join(INSTRUCTIONS_DIR, category);

  if (!fs.existsSync(dirPath)) {
    return res.status(404).json({ error: 'Категория не найдена' });
  }

  try {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    res.json(files);
  } catch (err) {
    console.error(`Ошибка чтения файлов из ${category}:`, err);
    res.status(500).json({ error: 'Не удалось прочитать файлы' });
  }
};

// Получить содержимое файла
exports.getFileContent = (req, res) => {
  const { category, filename } = req.params;
  const filePath = path.join(INSTRUCTIONS_DIR, category, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Файл не найден' });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ content });
  } catch (err) {
    console.error(`Ошибка чтения файла ${filename}:`, err);
    res.status(500).json({ error: 'Не удалось прочитать файл' });
  }
};