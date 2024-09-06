import React, { useState, useEffect } from 'react';

const symbols = ['🔞', '❤️', '😘'];

const SlotMachine = () => {
  const [slots, setSlots] = useState([0, 1, 2]); // Индексы символов для каждого слота
  const [isSpinning, setIsSpinning] = useState(false);
  const [fadeClass, setFadeClass] = useState(['', '', '']); // Классы для анимации

  useEffect(() => {
    let slotInterval;
    if (isSpinning) {
      slotInterval = setInterval(() => {
        // Добавляем класс fade-in-out перед сменой символов
        setFadeClass(['fade-in-out', 'fade-in-out', 'fade-in-out']);

        setTimeout(() => {
          setSlots(generateRandomSlots()); // Генерируем новые символы
          setFadeClass(['', '', '']); // Убираем класс анимации
        }, 200); // Время анимации совпадает с длительностью анимации fade-in-out
      }, 400); // Скорость смены символов (400 мс = 0.4 секунды)
    }

    return () => clearInterval(slotInterval);
  }, [isSpinning]);

  // Функция для генерации случайных символов
  const generateRandomSlots = () => {
    // С вероятностью 1/3 выпадут одинаковые символы
    if (Math.random() < 0.33) {
      const randomSymbol = Math.floor(Math.random() * symbols.length);
      return [randomSymbol, randomSymbol, randomSymbol];
    }
    // В противном случае генерируем разные символы
    return [
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * symbols.length),
    ];
  };

  const startSpin = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setTimeout(() => stopSpin(), 4000); // Смена символов длится 5 секунд
    }
  };

  const stopSpin = () => {
    setIsSpinning(false);
  };

  return (
    <div style={styles.slotContainer}>
      {slots.map((symbolIndex, index) => (
        <div key={index} className={`slot ${fadeClass[index]}`} style={styles.slot}>
          <div style={styles.symbol}>{symbols[symbolIndex]}</div>
        </div>
      ))}
      <button onClick={startSpin} disabled={isSpinning} style={styles.button}>
        Spin
      </button>
    </div>
  );
};

const styles = {
  slotContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '50px',
  },
  slot: {
    width: '80px',
    height: '80px',
    margin: '0 5px',
    overflow: 'hidden',
    border: '2px solid #ddd',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    fontSize: '40px',
    position: 'relative',
  },
  symbol: {
    fontSize: '50px',
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
    opacity: 1,
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
    backgroundColor: '#ff4b2b',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    backgroundImage: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
};

export default SlotMachine;
