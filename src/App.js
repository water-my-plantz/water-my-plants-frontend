import './App.css';
import { useState, useEffect, Fragment } from "react"
import { Redirect, Route, Switch } from "react-router-dom";
import Logout from './components/loginSignupUser/logout';
import Login from './components/loginSignupUser/login';
import Signup from './components/loginSignupUser/signup'
import NavBar from './components/Navbars/NavBar';
import CreatePlant from './components/plants/createplant'
import EditPlant from './components/plants/editPlant'
import Plants from './components/plants/plants'
import Profile from './components/loginSignupUser/profile'
import PrivateRoute from './components/PrivateRoute'
import { GlobalPropsContext } from './components/GlobalPropsContext';
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allPlants, setAllPlants] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [isFetchingPlants, setIsFetchingPlants] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [hamburgerState, setHamburgerState] = useState(false);
  const [navState, setNavState] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true)
    } else {
      return <Redirect to='/' />
    }
  }, [])

  return (
    <Router>
      <Fragment>
        <div className="App">
          <div class="overlay"></div>
          <GlobalPropsContext.Provider value={{ isLoggedIn, setIsLoggedIn, allPlants, setAllPlants, plantList, setPlantList, isFetchingPlants, setIsFetchingPlants, setFilteredPlants, filteredPlants, hamburgerState, setHamburgerState, navState, setNavState }}>

            <NavBar />

            <Switch>
              <Route path="/signup" component={Signup} />
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute path="/plants" component={Plants} />
              <PrivateRoute path="/createplant" component={CreatePlant} />
              <PrivateRoute path="/logout" component={Logout} />
              <PrivateRoute path="/editplant/:id" component={EditPlant} />
            </Switch>
          </GlobalPropsContext.Provider>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
