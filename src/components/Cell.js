import React, { Component } from 'react'

export default class Cell extends Component {
    render() {
        return (
            <div className={`cell${this.props.number === 0 ? "" : " locked"}`} id={this.props.id}>
                <span className="inner-cell" style={this.props.style}>{this.props.number === 0 ? "" : this.props.number}</span>
            </div>
        )
    }
}
