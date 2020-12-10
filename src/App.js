import './App.css';
import Board from './components/Board';
import { generateBoard } from './functions.js';

function App() {
    const board = generateBoard(5);
    return (
        <div className="App">
            <Board board={board} className="board" />
        </div>
    );
}

export default App;
