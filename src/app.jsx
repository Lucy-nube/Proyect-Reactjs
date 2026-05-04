import React, { useState, useEffect } from 'react';

export default function App() {
  // El tablero de Sudoku original resuelto (Para las pistas y autocompletado)
  const solvedBoard = [
    ['1', '3', '2', '6', '5', '7', '4', '9', '8'],
    ['5', '4', '7', '9', '3', '8', '6', '1', '2'],
    ['8', '6', '9', '2', '1', '4', '3', '7', '5'],
    ['3', '2', '4', '5', '7', '9', '8', '6', '1'],
    ['9', '1', '8', '4', '6', '3', '5', '2', '7'],
    ['7', '5', '6', '1', '8', '2', '9', '4', '3'],
    ['6', '5', '1', '8', '2', '1', '7', '3', '9'],
    ['2', '9', '3', '7', '4', '5', '1', '8', '6'],
    ['4', '8', '7', '3', '9', '2', '1', '5', '1']
  ];

  // Tablero inicial (Las pistas por defecto)
  const initialBoard = [
    ['', '3', '', '6', '5', '7', '', '', '8'],
    ['5', '', '', '', '3', '', '', '', '2'],
    ['', '6', '', '', '', '4', '', '7', '5'],
    ['', '2', '', '', '', '9', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '1', '', '', '', '4', ''],
    ['6', '5', '', '8', '', '', '', '3', ''],
    ['2', '', '', '', '4', '', '', '', '6'],
    ['4', '', '', '3', '9', '2', '', '5', '']
  ];

  const initialCells = [
    [false, true, false, true, true, true, false, false, true],
    [true, false, false, false, true, false, false, false, true],
    [false, true, false, false, false, true, false, true, true],
    [false, true, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, true, false, false, false, true, false],
    [true, true, false, true, false, false, false, true, false],
    [true, false, false, false, true, false, false, false, true],
    [true, false, false, true, true, true, false, true, false]
  ];

  const [board, setBoard] = useState(initialBoard);
  const [seconds, setSeconds] = useState(163);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    if (initialCells[rowIndex][colIndex] || isGameOver) return;
    if (value !== '' && !/^[1-9]$/.test(value)) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setBoard(newBoard);
  };

  // BOTÓN 1: DAR PISTA (Llena una casilla vacía al azar)
  const giveHint = () => {
    if (isGameOver) return;
    let emptyCells = [];
    board.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === '') emptyCells.push({ rIdx, cIdx });
      });
    });

    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => 
        (rIdx === randomCell.rIdx && cIdx === randomCell.cIdx) ? solvedBoard[rIdx][cIdx] : cell
      )
    );
    setBoard(newBoard);
  };

  // BOTÓN 2: AUTOCOMPLETAR (Llena todo el tablero con la solución)
  const autoComplete = () => {
    if (isGameOver) return;
    setBoard(solvedBoard);
  };

  // BOTÓN 3: FINALIZAR JUEGO (Detiene el tiempo y bloquea el tablero)
  const endGame = () => {
    setIsGameOver(true);
  };

  // BOTÓN 4: JUEGO NUEVO (Reinicia todo el estado)
  const resetGame = () => {
    setBoard(initialBoard);
    setSeconds(0);
    setIsGameOver(false);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace', color: '#00ffcc' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        
        <h1 style={{ fontSize: '1.6rem', textShadow: '#00ffcc 0px 0px 8px', margin: '0px' }}>Sudoku Profesional</h1>
        
        <div style={{ fontSize: '0.9rem' }}>⏱ {formatTime(seconds)} {isGameOver && ' [Finalizado]'}</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 38px)', gap: '3px' }}>
          {board.map((row, rowIndex) =>
            row.map((cellValue, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                disabled={initialCells[rowIndex][colIndex] || isGameOver}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                style={{
                  width: '38px',
                  height: '38px',
                  textAlign: 'center',
                  fontSize: '16px',
                  background: 'black',
                  color: '#00ffcc',
                  border: '1px solid #00ffcc',
                  outline: 'none',
                  opacity: initialCells[rowIndex][colIndex] ? 0.7 : 1,
                  cursor: (initialCells[rowIndex][colIndex] || isGameOver) ? 'not-allowed' : 'text'
                }}
              />
            ))
          )}
        </div>

        {/* Sección de Botones Profesionales */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={giveHint} style={buttonStyle}>Pista</button>
          <button onClick={autoComplete} style={buttonStyle}>Autocompletar</button>
          <button onClick={endGame} style={buttonStyle}>Finalizar Juego</button>
          <button onClick={resetGame} style={{ ...buttonStyle, borderColor: '#ff0055', color: '#ff0055', textShadow: '#ff0055 0px 0px 4px' }}>Nuevo Juego</button>
        </div>

      </div>
    </div>
  );
}

const buttonStyle = {
  background: 'transparent',
  border: '1px solid #00ffcc',
  color: '#00ffcc',
  padding: '8px 12px',
  fontFamily: 'monospace',
  cursor: 'pointer',
  textShadow: '#00ffcc 0px 0px 4px',
  fontSize: '0.8rem',
  transition: '0.2s'
};
