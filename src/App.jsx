import React, { Component } from 'react';

import Cards from './components/Cards/index'
import Slot from './components/Slots/index'
import char from './data/characters.json'
import './base.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      slotsFilled: 0,
      arr : char.character,
      status: "",
      keyArray: {key1: null, key2: null}
    }
    this.slot1 = React.createRef();
    this.slot2 = React.createRef();
    this.updateSlots = this.updateSlots.bind(this);
    this.resetSlots = this.resetSlots.bind(this);
    this.checkSlots = this.checkSlots.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  } 

  handleSelection(key){
    this.setState(
      prevState =>{
        if(prevState.keyArray.key1 !== key && prevState.keyArray.key1 !== null ){
          return { keyArray: {key1:prevState.keyArray.key1, key2: key}};

        }
        else{
          return { keyArray: {key1: key}};
        }
      } 
    )
  }

  updateSlots(){
    this.setState(
      {slotsFilled: this.state.slotsFilled++}
    )
  }
  resetSlots(){
    this.setState(
      {slotsFilled: 0}
    )
  }
  checkSlots(){
    return this.state.slotsFilled < 2;
  }

  render() { 
    let characters = [];
    for (let i = 0; i < this.state.arr.length; i++) {
      characters.push(
        <Cards 
          key = {i}
          id = {i}
          name = {this.state.arr[i].name}
          slots = {[this.slots1, this.slot2]}
          handler = {this.handleSelection}
          check = {this.checkSlots}
          status = ""
        /> 
      )

    }

    let selectedCard = '';        
    if(this.state.keyArray.key1 !== null){
      selectedCard = characters.filter(card =>{
        
        if(card.props.id === this.state.keyArray.key1)
        {
          return card.props.name;
        }
      }) 
      
    }
    let selectedCard2 = '';        
    if(this.state.keyArray.key2 !== null){
      selectedCard2 = characters.filter(card =>{
        
        if(card.props.id === this.state.keyArray.key2)
        {
          return card.props.name;
        }
      }) 
      
    }
    console.log(selectedCard, selectedCard2)
    
    return ( 
      <div>
        <header><div className="main-container">Super Smash Bros Matchups </div></header>
        <div className="main-container">
          <h2>Choose two characters</h2>
          <div className="characters">
            {characters}
          </div>
          <div className="slots">
            <Slot ref={this.slot1} name= {selectedCard} id="slot-1"/>
            <Slot ref={this.slot2} name={selectedCard2} id="slot-2"/>
          </div>
        </div> 
      </div>
    );
  }
}

 

export default App;
