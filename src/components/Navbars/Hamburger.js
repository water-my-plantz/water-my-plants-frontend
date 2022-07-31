import "../../App.css"

export default function Hamburger({ setHamburgerState, hamburgerState }) {

    const changeToX = () => {
        setHamburgerState(!hamburgerState);
    }



    return (
        // Activated by window width getting to mobile size
        <div className="hamburger">
            <div className="hamburgerNav">
                {(hamburgerState === false) &&
                    <label htmlFor="toggle" id="hamburger" onClick={changeToX}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </label>}

                {(hamburgerState === true) &&
                    <label htmlFor="toggle" id="hamburgerx" onClick={changeToX}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </label>}

            </div>
        </div>
    )
}