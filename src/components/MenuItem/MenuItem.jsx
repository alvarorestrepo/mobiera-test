import React from 'react';
import { NavLink } from "react-router-dom";

import './MenuItem.css'

const MenuItem = (props) => {
  let { t, name, route, onClick } = props;
  return (
    <NavLink
      to={route}
      className="Menu__item"
      activeClassName="Item__selected"
      open="close"
      onClick={onClick}
    >
      {name}
    </NavLink>
  );
}

export default (MenuItem);