import React, { Component } from 'react'
import { difficulty } from '../functions';

export default class DifficultyChooser extends Component {
    render() {
        return (
            <div className="board-footer">
                <p id="difficulty">Difficulty: {difficulty}</p>
                <div className="progress">
                    <span id='diff-bar' style={{ width: `${(difficulty/8)*100}%` }}></span>
                </div>
                <div className="difficulty-buttons">
                    <button class="btn difficulty-btn" id='diff-minus'>-</button>
                    <button class="btn difficulty-btn" id='diff-plus'>+</button>
                </div>
            </div>
        )
    }
}
