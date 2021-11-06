import React, { Component } from 'react';
import Square from './square';
import Button from '../components/button';

class Board extends Component {

    state = {color: "orange"}//initially the colors for square will always be oragne

    makeSquares = (squares) => {
        
        let matrix = []
        let matrixKey = 0
        let cellId = 99
        for(let i=0; i < 10; i++){
            const squares =[]
            for (let i=0; i < 10; i++) {
                squares.push(<Square color= {this.state.color} key={cellId} cellId={cellId}/>)
                cellId--
            }
            matrix.push(<tr key ={matrixKey}>{squares}</tr>)
           ++matrixKey
         
        }
            return <table cellSpacing={0} id="matrix"><tbody >{matrix}</tbody></table>
     }
    callbackFunction = (orangeOrGrey) => {
        this.setState({color: orangeOrGrey})
    }
    render () {
        console.log(this.state)
        return (
           
            <div>
                <div>
                <Button parentCallBack = {this.callbackFunction} buttonState = {this.state.color}/> 
                </div>
              
            <div className="row">
              {this.makeSquares()}
              
            </div>
           
            </div>
             
        );
    }
}

export default Board