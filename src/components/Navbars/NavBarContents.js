import { useContext } from "react"
import "../../App.css"
import { Link } from "react-router-dom";
import { GlobalPropsContext } from "../GlobalPropsContext";
import Search from "../plants/search";
import { useHistory } from "react-router-dom";
import { MdOutlineWaterDrop } from "react-icons/md";



export default function NavBarContents() {
    const { isLoggedIn } = useContext(GlobalPropsContext);
    const history = useHistory();

    return (
        <div>
            <nav>
                <ul>


                    <div className="nav-water-my-plants-text" onClick={() => { history.push("/plants") }}>
                        <MdOutlineWaterDrop id="drop" />
                        <h3>Water My Plants</h3>
                    </div>

                    {(isLoggedIn === false) && <div className="not-logged-in">
                        <li><Link to="/">Login</Link></li>
                        <li style={{ marginLeft: '60px' }}><Link to="/signup">Signup</Link> </li>
                    </div>}



                    {(isLoggedIn === true) &&
                        <span className="nav-links">
                            <span className="search"><li><Search /></li></span>
                            {/* <li><Link to="/profile">Profile </Link> </li> */}
                            <li><Link to="/plants">All Plants</Link></li>
                            <li><Link to="/createplant">Add Plant</Link> </li>
                            <li><Link to="/logout">Logout </Link> </li>
                        </span>}

                </ul>
            </nav>
        </div>
    )
}