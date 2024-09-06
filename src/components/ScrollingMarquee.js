import React, { useState, useEffect } from 'react';

// Массив из 4 символов
const symbols = ['🔞', '❤️', '😘'];

const ScrollingMarquee = () => {
  // Генерируем массив из 400 случайных символов на основе symbols
  const randomSymbols = Array.from({ length: 400 }, () =>
    symbols[Math.floor(Math.random() * symbols.length)]
  );

  const [scrollPosition, setScrollPosition] = useState(0); // Позиция для ленты
  const [isSpinning, setIsSpinning] = useState(false); // Управление вращением
  const [selectedSymbol, setSelectedSymbol] = useState(null); // Выбранный символ

  useEffect(() => {
    let interval;

    if (isSpinning) {
      let currentPosition = scrollPosition;
      interval = setInterval(() => {
        currentPosition += 80; // Двигаем ленту на 80px (ширина одного символа)
        setScrollPosition(currentPosition);

        // Останавливаем вращение через 5 секунд
        if (currentPosition >= scrollPosition + 1200) { // Останавливаем после 15 символов (5 секунд плавного вращения)
          clearInterval(interval);
          setIsSpinning(false);

          // Выбираем символ под стрелкой
          const selectedIndex = Math.floor((currentPosition % (randomSymbols.length * 80)) / 80);
          setSelectedSymbol(randomSymbols[selectedIndex]);
        }
      }, 200); // Меняем символы каждые 200 мс для плавного движения
    }

    return () => clearInterval(interval);
  }, [isSpinning]);

  const startSpin = () => {
    setScrollPosition(0); // Сбрасываем позицию в начало
    setIsSpinning(true);
    setSelectedSymbol(null); // Сбрасываем предыдущий выбранный символ
  };

  return (
    <div style={styles.container}>
      <div style={styles.marqueeContainer}>
        <div style={{ ...styles.marquee, transform: `translateX(-${scrollPosition}px)` }}>
          {randomSymbols.map((symbol, index) => (
            <div key={index} style={styles.marqueeItem}>
              {symbol}
            </div>
          ))}
        </div>
        {/* Стрелка указывающая на элемент */}
        <div style={styles.arrow}>▼</div>
      </div>

      {/* Отображение выпавшего элемента */}
      {selectedSymbol && (
        <div style={styles.result}>
          
        </div>
      )}

      <button onClick={startSpin} disabled={isSpinning} style={styles.button}>
        Spin
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '50px',
    position: 'relative',
  },
  marqueeContainer: {
    position: 'relative',
    width: '100%', // Ширина контейнера
    overflow: 'hidden',
    marginTop: '30px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    whiteSpace: 'nowrap', // Элементы идут в одну строку
  },
  marquee: {
    display: 'inline-flex',
    transition: 'transform 0.2s linear', // Плавная смена символов за 200 мс
  },
  marqueeItem: {
    width: '80px', // Ширина каждого элемента (символа)
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    margin: '0 5px', // Отступы между элементами
    border: '0.1px solid #ddd',
    borderRadius: '5px',
  },
  arrow: {
    position: 'absolute',
    top: '-25px',
    left: '55%',
    transform: 'translateX(-50%)',
    fontSize: '36px', // Размер стрелки
    color: '#ff4b2b',
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
  result: {
    marginTop: '20px',
    fontSize: '24px',
  },
};

export default ScrollingMarquee;
