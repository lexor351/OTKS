const express = require('express');
const app = express();
const PORT = 5001;

app.get('/api/instructions', (req, res) => {
  res.json(['test.md']);
});

app.listen(PORT, () => {
  console.log(`Тестовый сервер запущен на порту ${PORT}`);
});