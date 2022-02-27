import {Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, ...rest}) => {

  const logged = useSelector(state => state.logged);

  return <Route {...rest}> { !logged.logged ? <Component/> : <Redirect to='/home'/>}</Route>
}

export default PublicRoute;