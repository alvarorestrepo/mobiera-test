import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import SingUp from "./pages/auth/SingUp";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile/Profile";
import Footer from "./Footer/Footer";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Feedback from "./components/Feedback/Feedback";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";

function App() {
  return (
    <>
      <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/singup" component={SingUp} />
        <Layout>
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/change-password" component={ChangePassword} />
          <PrivateRoute exact path="/home" component={Home} />
        </Layout>
      </Switch>
      <Footer/>
      <Feedback/>
    </>
  );
}

export default App;
