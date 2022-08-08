import { useContext } from "react"
import "../../App.css"
import { Link } from "react-router-dom";
import { GlobalPropsContext } from "../GlobalPropsContext";
import Search from "../plants/search.js"

export default function NavBarContents() {
    const { isLoggedIn, setHamburgerState } = useContext(GlobalPropsContext);

    return (
        <div>
            <nav>
                <ul>

                    <div className="nav-water-my-plants-text">
                        <h3>Water My Plants</h3>
                    </div>

                    <Search />

                    {/* login is shown when not logged in*/}
                    {(isLoggedIn === false) && <li><Link to="/">Login</Link></li>}

                    {/* account is shown when logged in */}
                    {/* {(isLoggedIn === true) && <li><Link to="/profile">Profile </Link> </li>} */}

                    {/* plants is shown when logged in */}
                    {(isLoggedIn === true) && <li><Link to="/plants">Plant Collection</Link> </li>}

                    {/* account is shown when logged in */}
                    {(isLoggedIn === true) && <li><Link to="/createplant">Add a Plant</Link> </li>}

                    {/* logout shown when loggedin */}
                    {(isLoggedIn === true) && <li><Link to="/logout">Logout </Link> </li>}

                    {/* signup not shown when loggedin */}
                    {(isLoggedIn === false) && <li><Link to="/signup">Signup</Link> </li>}
                </ul>
            </nav>
        </div>
    )
}