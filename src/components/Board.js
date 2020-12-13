import React, { Component } from 'react'
import Cell from './Cell';
import Timer from './Timer';
import DifficultyChooser from './DifficultyChooser';
import { ReactComponent as Refresh } from '../refresh.svg';

export default class Board extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="board-header">
                    <p id="board-message">Congratulations !</p>
                    <Timer />
                    <div id="board-button-div">
                        <Refresh />
                    </div>
                </div>
                <div>
                    {this.props.board.map((row, i) => {
                        return (
                            <div className="row" key={`row-${i}`}>
                                {
                                    row.map((number, j) => {
                                        return <Cell number={number} id={`${i}-${j}`} key={`cell-${i}${j}`} />
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
                <DifficultyChooser />
            </React.Fragment>
        )
    }
}