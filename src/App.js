import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
//pages
// import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Account from "./pages/Account";
import Details from "./pages/Details";
import PlaceForm from "./pages/PlaceForm";
import LoginForm from "./components/Overlay/LoginForm";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const location = useLocation();
  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      {location.pathname === "/" || location.pathname === "/login" ? null : <Navigation />}
      <MessageBox />
      {isLoading ? <Loading /> : null}

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUp} />
        <Route path="/account" component={Account} />
        <Route path="/details/:id" component={Details} />
        <Route path="/placeForm" component={PlaceForm} />
      </Switch>
    </div>
  );
}

export default App;
