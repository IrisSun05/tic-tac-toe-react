import React, { Component } from 'react';
import '../component/GameBoard.css'

class GameBoard extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    // define what should be rendered in a box
    Box = (props) => {
        if (props.pattern === "O") {
            return (
            <button className="box" onClick={props.onClick}>
                <img src="../picture/o-icon.svg" className="o-icon"/>
            </button>
            );
        } else if (props.pattern === "X") {
            return (
                <button className="box" onClick={props.onClick}>
                    <img src="../picture/x-icon.svg" className="x-icon"/>
                </button>
            );
        } else {
            return (
                <button className="box" onClick={props.onClick}>
                {}
                </button>
            );
        }
    }

    renderBox(i) {
        return (
          <this.Box
            pattern={this.props.boxes[i]}
            onClick={() => this.props.onClick(i)}
          />
        );
    }
    
    render() {
        return (
          <div>
            <div className="board-row">
              {this.renderBox(0)}
              {this.renderBox(1)}
              {this.renderBox(2)}
            </div>
            <div className="board-row">
              {this.renderBox(3)}
              {this.renderBox(4)}
              {this.renderBox(5)}
            </div>
            <div className="board-row">
              {this.renderBox(6)}
              {this.renderBox(7)}
              {this.renderBox(8)}
            </div>
          </div>
          )
      }
}

export default GameBoard;