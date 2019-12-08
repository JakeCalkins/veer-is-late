import React from 'react';
import './MenuItems.css';
import addIcon from './addIcon.png';
import backIcon from './backIcon.png';
import shoppingCart from './shoppingCartIcon.png';

class MenuItems extends React.Component {
  render() {
    return (
      <div className="MenuItems">
        <div class="options">
            <button class="option-click">
              <img class="option-icon" src={addIcon} alt="plus icon" />
              <h3 class="option-title">Add to Saved Schedules</h3>
            </button>
            <button class="option-click">
              <img  class="option-icon" src={backIcon} alt="back icon" />
              <h3 class="option-title">Edit Requirements</h3>
            </button>
            <button class="option-click">
              <img class="option-icon" src={shoppingCart} alt="shopping cart" />
              <h3 class="option-title">Add to Shopping Cart</h3>
            </button>
        </div>
      </div>
    );
  }
}

export default MenuItems;