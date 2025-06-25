import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Проверяем сохраненную тему
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(savedTheme);
    if (savedTheme) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className={isDarkMode ? 'dark' : 'light'}>
      <div className="logo">ОТКС</div>

      {/* Центрированное меню */}
      <nav className="main-nav">
        <a href="/">Главная</a>
        <a href="/contacts">Контакты</a>
        <a href="/instructions">Инструкции</a>
        <a href="/links">Ссылки</a>
      </nav>

      {/* Кнопка темы — справа */}
      <label className="theme-toggle">
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </header>
  );
}