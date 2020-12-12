import React, { Component } from 'react'
import { startTimer } from '../functions'

export default class Timer extends Component {
    componentDidMount() {
        startTimer(this.props.waitingTime, 'timer');
    }

    render() {
        return (
            <p className="timer">00:00</p>
        )
    }
}
