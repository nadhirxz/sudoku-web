import { Component } from 'react'
import Cell from './Cell';

export default class Board extends Component {
    render() {
        const board = this.props.board;
        return (
            <div className="board">
                {board.map((line, i) => {
                    return (
                        <div className="line">
                            {
                                line.map((number, j) => {
                                    return <Cell number={number} id={`${i}-${j}`} />
                                })
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}
