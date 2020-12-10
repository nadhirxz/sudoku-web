import { Component } from 'react'
import Cell from './Cell';

export default class Board extends Component {
    componentDidMount() {
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
                    document.onkeypress = (e) => {
                        if (!isNaN(parseInt(e.key))) cell.innerHTML = e.key;
                    };
                }
            });
        });
    }
    render() {
        const board = this.props.board;
        return (
            <div className="board">
                {board.map((row, i) => {
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
