import React, { useState, useEffect } from 'react';

export default function App() {
  // 1. STATE: The 9x9 Sudoku grid board (reconstructed from your HTML snippet)
  const [board, setBoard] = useState([
    ['', '3', '', '6', '5', '7', '', '', '8'],
    ['5', '', '', '', '3', '', '', '', '2'],
    ['', '6', '', '', '', '4', '', '7', '5'],
    ['', '2', '', '', '', '9', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '1', '', '', '', '4', ''],
    ['6', '5', '', '8', '', '', '', '3', ''],
    ['2', '', '', '', '4', '', '', '', '6'],
    ['4', '', '', '3', '9', '2', '', '5', '']
  ]);

  // 2. CONSTANT: Cells that were given by default and cannot be edited
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

  // 3. STATE: Timer state initialized to 163 seconds (2:43 from your HTML)
  const [seconds, setSeconds] = useState(163);

  // 4. EFFECT: This handles the countdown clock ticking without breaking React
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // 5. EVENT HANDLER: Updates the grid strictly via React state
  const handleInputChange = (rowIndex, colIndex, value) => {
    if (initialCells[rowIndex][colIndex]) return;
    if (value !== '' && !/^[1-9]$/.test(value)) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setBoard(newBoard);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace', color: '#00ffcc' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        
        {/* Cyberpunk Hacker Title */}
        <h1 style={{ fontSize: '1.6rem', textShadow: '#00ffcc 0px 0px 8px', margin: '0px' }}>Sudoku</h1>
        
        {/* Live Timer */}
        <div style={{ fontSize: '0.9rem' }}>⏱ {formatTime(seconds)}</div>
        
        {/* The 9x9 Sudoku Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 38px)', gap: '3px' }}>
          {board.map((row, rowIndex) =>
            row.map((cellValue, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                value={cellValue}
                disabled={initialCells[rowIndex][colIndex]}
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
                  cursor: initialCells[rowIndex][colIndex] ? 'not-allowed' : 'text'
                }}
              />
            ))
          )}
        </div>

        {/* Action Button to reset the clock */}
        <button 
          onClick={() => setSeconds(0)}
          style={{ background: 'transparent', border: '1px solid #00ffcc', color: '#00ffcc', padding: '8px 16px', fontFamily: 'monospace', cursor: 'pointer', textShadow: '#00ffcc 0px 0px 4px' }}
        >
          Reset Timer
        </button>

      </div>
    </div>
  );
}
