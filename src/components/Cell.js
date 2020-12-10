import React, { Component } from 'react'

export default class Cell extends Component {
    render() {
        return (
            <div className="cell" id={this.props.id}>
                {this.props.number === 0 ? "" : this.props.number}
            </div>
        )
    }
}
