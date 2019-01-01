import React from 'react';
import './style.scss'

class Slot extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {  }
  };
  render() { 
    return (  
      <div id={this.props.id}>
        {this.props.name}
      </div> 
    );
  };
}

 
export default Slot;