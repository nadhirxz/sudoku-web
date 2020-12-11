import { Component } from 'react'
import Cell from './Cell';

export default class Board extends Component {
    render() {
        return (
            <div className="board">
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
        )
    }
}