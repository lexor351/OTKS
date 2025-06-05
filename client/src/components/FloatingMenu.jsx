import React, { useEffect, useState } from 'react';

export default function FloatingMenu() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsVisible(window.scrollY > 300);
    });
  }, []);

  return isVisible ? (
    <div className="floating-menu">
      <a href="#main">Главная</a>
      <a href="#contacts">Контакты</a>
      <a href="#instructions">Инструкции</a>
      <a href="#links">Ссылки</a>
    </div>
  ) : null;
}