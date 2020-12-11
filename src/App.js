import React, { useEffect } from 'react'
import './App.css';
import Board from './components/Board';
import { generateBoard, showCells, keyPress } from './functions.js';

function App() {
    const board = generateBoard(5);
    useEffect(() => {
        let app = document.getElementsByClassName('App')[0];
        setTimeout(() => {
            app.removeChild(document.getElementById('title-text'));
            document.getElementsByClassName('container')[0].style.opacity = 1;

            let cells = Array.from(document.getElementsByClassName('cell'));
            var clickedCell = false;
            cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    if (cell.classList.contains('clicked')) {
                        cell.classList.remove('clicked');
                        clickedCell = false;
                        document.onkeypress = null;
                    } else if (!cell.classList.contains('locked')) {
                        cell.classList.add('clicked');
                        if (clickedCell) clickedCell.classList.remove('clicked');
                        clickedCell = cell;
                        document.onkeypress = (e) => keyPress(parseInt(e.key), cell, this.props.board);
                    }
                });
            });
            showCells(cells);
        }, 4000);
    }, [])
    return (
        <div className="App">
            <svg id="title-text">
                <text x="50%" y="50%" fill="none" fontSize="8em" dominantBaseline="middle" textAnchor="middle">Sudoku !</text>
            </svg>
            <div className="container" style={{ opacity: '0' }}>
                <Board board={board} className="board" />
            </div>
        </div>
    );
}

export default App;
