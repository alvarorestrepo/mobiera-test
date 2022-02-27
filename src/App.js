import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import SingUp from "./pages/auth/SingUp";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";


function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/singup" exact >
        <SingUp/>
      </Route>
      <Layout>
        <Route path="/home" exact >
          <Home />
        </Route>
        <Route path="/profile" exact >
          <Profile />
        </Route>
        <Route path="/change-password" exact >
          <ChangePassword />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
