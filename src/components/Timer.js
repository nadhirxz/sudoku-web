import React, { Component } from 'react'
import { startTimer } from '../functions'

export default class Timer extends Component {
    render() {
        return (
            <p id="timer">00:00</p>
        )
    }
}
