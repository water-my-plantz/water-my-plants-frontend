import './App.css';
import { useState, useEffect, Fragment } from "react"
// import { Route, Routes } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
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

const initialFakePlantData = [
  {
    id: "1",
    nickname: "Red",
    species: "rose",
    h20Frequency: "2x a day",
    img: "https://picsum.photos/200",
  },
  {
    id: "2",
    nickname: "Jack",
    species: "cactus",
    h20Frequency: "2x a week",
    img: "https://picsum.photos/200",
  },
  {
    id: "3",
    nickname: "Daisy",
    species: "daisy",
    h20Frequency: "2x a day",
    img: "https://picsum.photos/200",
  },
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allPlants, setAllPlants] = useState(initialFakePlantData);
  const [isFetchingPlants, setIsFetchingPlants] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [hamburgerState, setHamburgerState] = useState(false);
  const [navState, setNavState] = useState(false)



  return (
    <Router>
      <Fragment>
      <div className="App">
        <GlobalPropsContext.Provider value={{ isLoggedIn, setIsLoggedIn, allPlants, setAllPlants, isFetchingPlants, setIsFetchingPlants, setFilteredPlants, filteredPlants, hamburgerState, setHamburgerState, navState, setNavState }}>

          <NavBar />

          <Switch>
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path='/profile/:id' component={Profile}/>
          <PrivateRoute path="/plants" component={Plants} />
          <PrivateRoute path="/createplant" component={CreatePlant} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/editplant/:id" component={EditPlant} />
          </Switch>
{/* 
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            
            <PrivateRoute exact path='/profile' element={Profile}/>
            <PrivateRoute exact path='/plants' element={Plants}/>
            <PrivateRoute exact path='/createplant' element={CreatePlant}/>
            <PrivateRoute exact path='/editplant/:id' element={EditPlant}/> */}
            {/* <Route exact path='/' element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/plants' element={<Plants/>}/>
              <Route path='/createplant' element={<CreatePlant/>}/>
              <Route path='/editplant/:id' element={<EditPlant/>}/>
            </Route> */}
          {/* </Routes> */}
        </GlobalPropsContext.Provider>
      </div>
      </Fragment>
    </Router>
  );
}

export default App;
