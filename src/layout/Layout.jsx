import React from 'react';
import Navbar from '../components/Navbar';

/**
 * Este comoponente Layout es el contenedor de todo nuestro navbar
 * @param {style} props este prop se encarga de que el navbar siempre tenga un ancho del 100% 
 * @returns {Component} Va retornar el componente Menu
 */

const Layout = (props) => {

	const style = {
		width: "100%",
	}

	return(
		<>
			<Navbar />
			<div style={style}>
				{props.children}
			</div>
		</>
	)
}

export default (Layout);