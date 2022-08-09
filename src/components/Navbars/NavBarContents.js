import { useContext } from "react"
import "../../App.css"
import { Link } from "react-router-dom";
import { GlobalPropsContext } from "../GlobalPropsContext";
import Search from "../plants/search";

export default function NavBarContents() {
    const { isLoggedIn } = useContext(GlobalPropsContext);

    return (
        <div>
            <nav>
                <ul>

                    <div className="nav-water-my-plants-text">
                        <h3>Water My Plants</h3>
                    </div>

                    {(isLoggedIn === false) && <div className="not-logged-in">
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/signup">Signup</Link> </li>
                    </div>}

                    

                    {(isLoggedIn === true) &&
                    <span className="nav-links">
                        <li><Search/></li>
                    {/* <li><Link to="/profile">Profile </Link> </li> */}
                        <li><Link to="/plants">Plant Collection</Link></li>
                        <li><Link to="/createplant">Add a Plant</Link> </li>
                        <li><Link to="/logout">Logout </Link> </li>
                    </span>}

                </ul>
            </nav>
        </div>
    )
}