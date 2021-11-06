import React, { Component } from 'react';
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import { connect } from 'react-redux';
import { moveForward } from '../actions/gameActions';
import { changePlayer} from '../actions/gameActions';
import { jump} from '../actions/gameActions';
//import {Link, RichText, Date} from 'prismic-reactjs';

class Dice extends Component {

    
    render() {
      
        return (
          <div>
            <ReactDice
              numDice={1}
              rollDone={this.rollDoneCallback}
              ref={dice => this.reactDice = dice}
            />
           
          </div>
        )
      }
     
      rollAll() {
        this.reactDice.rollAll()
      }
     
      won() {
      
        
        for(let i=0; i < this.props.players.allplayers.length; i++){
           if (this.props.players.allplayers[i].currentPostion >= 99){
             alert(this.props.players.allplayers[i].name + " has won!")
             this.props.players.winStatus = true;
          
             this.props.players.winnerName = this.props.players.allplayers[i].name
             const timestamp = Math.floor(Date.now()/1000)
            //  console.log(timestamp);
             let newDate = new Date();
             newDate.setTime(timestamp*1000);
             let dateString = newDate.toUTCString();

            //  this.props.players.timeStamp = Intl.DateTimeFormat('en-US',{
            //   year: "numeric",
            //   month: "short",
            //   day: "2-digit",
            //   hour: "numeric",
            //   minute: "2-digit",
            //   second: "2-digit"
            // }).format(timestamp);
            this.props.players.timeStamp = dateString;
            
             //timestamp logic change of state
            // console.log(this.props.players.allplayers[i].name)
           }
        }
       
      }
     

      rollDoneCallback= (num) => {
       
       
        // this.setState({side: `${num}`})

        
        this.props.moveForward(num)
        
        switch(this.props.players.allplayers[this.props.players.currPlayer].currentPostion){
         case 74: {
         this.props.jump(57)
         break 
         } 
         case 71: {
          this.props.jump(13)
        break  
        } 
          case 35: {
            this.props.jump(6)
            break 
            } 
            case 53: {
              this.props.jump(97)
              break 
              } 
              case 28: {
                this.props.jump(48)
                break 
                } 
                case 14: {
                  this.props.jump(44)
                  break 
                  } 
                  default:
                   
            }

        this.won()
        this.props.changePlayer()

       
        
    }
    
}
    
 const mapStateToProps = (state) => ({
  players: state.playerReducer
  
 })

 
 
export default connect(mapStateToProps, {moveForward, changePlayer, jump})(Dice)