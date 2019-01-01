import React from 'react';

import './style.scss';

const Cards = (props) => {
  return ( 
    <div className={`card ${props.status}`} onClick={()=>{props.handler(props.id)} }>
      <div className="card-content">
        <div className="card-image"></div>
        <div className="card-body">
          <span className="name">{props.name}</span>
        </div>
      </div>
    </div>
  );
}
 
export default Cards;


