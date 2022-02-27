import {Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest}) => {

  const logged = useSelector(state => state.logged);

  return <Route {...rest}> { logged.logged ? <Component/> : <Redirect to='/'/>}</Route>
}

export default PrivateRoute;