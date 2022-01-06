import './App.css';
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [allPlants, setAllPlants] = useState(initialFakePlantData);
  const [isFetchingPlants, setIsFetchingPlants] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [hamburgerState, setHamburgerState] = useState(false);
  const [navState, setNavState] = useState(false)



  return (
    <Router>
      <div className="App">
        <GlobalPropsContext.Provider value={{ isLoggedIn, setIsLoggedIn, allPlants, setAllPlants, isFetchingPlants, setIsFetchingPlants, setFilteredPlants, filteredPlants, hamburgerState, setHamburgerState, navState, setNavState }}>

          <NavBar />
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>

            <Route path='/profile' element={<Profile/>}/>

            <Route path='/plants' element={<Plants/>}/>
            <Route path='/createplant' element={<CreatePlant/>}/>
            <Route path='/editplant/:id' element={<EditPlant/>}/>

          </Routes>
        </GlobalPropsContext.Provider>
      </div>
    </Router>
  );
}

export default App;
