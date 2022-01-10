import { useContext } from "react"
import "../../App.css"
import { Link } from "react-router-dom";
import { GlobalPropsContext } from "../GlobalPropsContext";

export default function NavBarContents() {
    const { isLoggedIn, setHamburgerState } = useContext(GlobalPropsContext);
    const { user } = useContext(GlobalPropsContext);

    return (
        <div>
            <nav>
                <ul>
                    {/* login is shown when not logged in*/}
                    {(isLoggedIn === false) && <li><Link to="/">Login</Link></li>}

                    {/* account is shown when logged in */}
                    {(isLoggedIn === true) && <li><Link to="/profile">Edit Profile </Link> </li>}

                    {/* plants is shown when logged in */}
                    {(isLoggedIn === true) && <li><Link to="/plants">My Plants</Link> </li>}

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