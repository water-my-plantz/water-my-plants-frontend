import { useState, useEffect, useContext } from "react";
import "../../App.css"
import Hamburger from "./Hamburger";
import NavBarContents from "./NavBarContents";
import { GlobalPropsContext } from "../GlobalPropsContext";

// custom hook for getting window size
function useWindowSize() {
    const [width, setWidth] = useState([window.innerWidth]);

    useEffect(() => {
        const handleResize = () => {
            setWidth([window.innerWidth])
        }
        window.addEventListener("resize", handleResize);
    }, [])
    return width;
}

export default function NavBar() {
    const { hamburgerState, setHamburgerState } = useContext(GlobalPropsContext);
    const { navState, setNavState } = useContext(GlobalPropsContext);
    const [width] = useWindowSize();

    useEffect(() => {
        if (width > 767) {
            setNavState(true);
            setHamburgerState(false);
        }
        if (width < 767) {
            setNavState(false);
            setHamburgerState(true);
        }
    }, [width])

    return (
        <>
            <div className="navBar">
                <Hamburger hamburgerState={hamburgerState} setHamburgerState={setHamburgerState} />
                {(navState || hamburgerState) && <NavBarContents />}
            </div>
            <div className="header">
                <h1 className="titleOfApp">Water My Plants</h1>
            </div>
        </>
    )
}