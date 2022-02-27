import React, { useState } from 'react';
import { Link } from "react-router-dom";


import MenuItem from "../MenuItem/MenuItem"
import Overlay from '../Overlay/Overlay';


// import IconClose from "../../assets/images/IconClose.png";
// import IconLang from '../../assets/images/iconLang.png';


// import Logo from '../../assets/images/Logo-NOKC.png';
// import search from '../../assets/images/search.svg';
// import user from '../../assets/images/user.svg';


import "./Navbar.css"
const Navbar = (props) => {
  const dataMenu = [
    { id: '1', name: 'About us', route: '/about-us' },
    { id: '2', name: 'Contenido', route: '/Content' },
    { id: '3', name: 'Herramientas', route: '/tools' },
    { id: '4', name: 'Event', route: '/event' },
  ];
  // const { lang, setLang } = useLang();
  const [open, setOpen] = useState(props.open);
  const [isItemClosed, setisItemClosed] = useState(true);

  // const handleLang = (newLang) => {
  //   setLang(newLang);
  //   localStorage.setItem('Lang', newLang);
  // };
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
  // console.log("open", open);
  return (
    <nav className="Menu__content gray_primary">
      <Overlay overlay={open} onClick={OnClose} />
      <div className="Menu__page">
        <div className="Menu__content--logo">
          <Link to="/">
            {/* <img className='Menu__content_img'  alt="Logo Akelab" /> */}
          </Link>
        </div>
        <div className={`Menu__content--items ${open}`}>
          <div onClick={OnClose} className="Items__views">
            <div className="Item__close">
              <div className="Item__close--button">
                {/* <img
                  className="Button__logo--close"
                  src={IconClose}
                  alt="Icon close"
                /> */}
              </div>

            </div>
            <ul className="Menu__container_items">
              {dataMenu.map((item, index) => (
                <MenuItem key={index} route={item.route} name={item.name} />
              ))}
              <div className='Items__search'>
                {/* <img src={search} alt="search" /> */}
              </div>
              <div className='Items__btn'>
                <button className='btn_up'>Sing Up</button>
              </div>
              <div className='Items__btn'>
                <button className='btn_in'>Sing In</button>
              </div>
              <div className='Items__img_user'>
                {/* <img className='img_user' src={user} alt='user-icon'/> */}
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