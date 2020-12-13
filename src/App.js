import React, { useEffect } from 'react'
import './App.css';
import { newGame } from './functions.js';

function App() {
    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName('App')[0].removeChild(document.getElementById('title-text'));
            document.getElementById('footer').style.opacity = 1;
            newGame()
        }, 4000);
    }, [])
    return (
        <div className="App">
            <svg id="title-text">
                <text x="50%" y="50%" fill="none" fontSize="8em" dominantBaseline="middle" textAnchor="middle">Sudoku !</text>
            </svg>
            <div id="container"></div>
            <div id="footer" style={{ opacity: '0', transition:'opacity 2s' }}>
                Created by <a href="https://github.com/nadhirxz" target="_blank">nadhirxz</a>
            </div>
        </div>
    );
}

export default App;