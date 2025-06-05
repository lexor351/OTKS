const fs = require('fs');
const path = require('path');
const marked = require('marked');
const multer = require('multer');


// Путь к папке с инструкциями
const INSTRUCTIONS_DIR = path.join(__dirname, '../uploads/instructions');

console.log('Путь к файлам:', INSTRUCTIONS_DIR);

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, INSTRUCTIONS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Получить список файлов
exports.getAllInstructions = (req, res) => {
  try {
    if (!fs.existsSync(INSTRUCTIONS_DIR)) {
      fs.mkdirSync(INSTRUCTIONS_DIR, { recursive: true });
    }

    const files = fs.readdirSync(INSTRUCTIONS_DIR).filter(f => f.endsWith('.md'));
    return res.json(files);
  } catch (err) {
    console.error('Ошибка чтения файлов:', err);
    return res.status(500).json({ error: 'Не удалось получить список файлов' });
  }
};

// Получить содержимое файла
exports.getInstruction = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(INSTRUCTIONS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Файл не найден' });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ filename, content: marked.parse(content) });
  } catch (err) {
    console.error('Ошибка чтения файла:', err);
    res.status(500).json({ error: 'Не удалось прочитать содержимое файла' });
  }
};

// Загрузить файл
exports.uploadInstruction = upload.single('file');
exports.uploadInstruction = (req, res) => {
  const filename = req.file.filename;
  res.json({ filename });
};