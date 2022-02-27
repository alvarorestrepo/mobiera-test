import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { logOut } from '../../redux/actions';
import { useDispatch} from "react-redux";

import MenuItem from "../MenuItem/MenuItem"
import Overlay from '../Overlay/Overlay';

import Logo from '../../assets/mobiera.webp';


import "./Navbar.css"
const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dataMenu = [
    { id: '1', name: 'Profile', route: '/profile' },
    { id: '2', name: 'Change Password', route: '/change-password' },
    { id: '4', name: 'Event', route: '/event' },
  ];
  const [open, setOpen] = useState(props.open);
  const [isItemClosed, setisItemClosed] = useState(true);

  const openn = (e) => {
    setOpen('Open__menu');
    if (isItemClosed) {
      setisItemClosed(false);
    } else {
      setisItemClosed(true);
    }
  };
  const OnClose = (e) => {
    setOpen('');
    if (isItemClosed) {
      setisItemClosed(false);
    } else {
      setisItemClosed(true);
    }
  };

  const logOutUser = () => {
    dispatch(logOut());
    history.push('/');
  }

  return (
    <nav className="Menu__content gray_primary">
      <Overlay overlay={open} onClick={OnClose} />
      <div className="Menu__page">
        <div className="Menu__content--logo">
          <Link to="/home">
            <img className='Menu__content_img' src={Logo}  alt="Logo Akelab" />
          </Link>
        </div>
        <div className={`Menu__content--items ${open}`}>
          <div onClick={OnClose} className="Items__views">
            <ul className="Menu__container_items">
              {dataMenu.map((item, index) => (
                <MenuItem key={index} route={item.route} name={item.name} />
              ))}
              <div className='Items__btn'>
                <button className='btn_up' onClick={() => logOutUser()}>Log Out</button>
              </div>
            </ul>
          </div>
        </div>
        <div className="Item__menu" onClick={openn}>
          <span>&#9776;</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;