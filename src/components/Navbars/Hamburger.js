import "../../App.css"

export default function Hamburger({ setHamburgerState, hamburgerState }) {

    const changeToX = () => {
        setHamburgerState(!hamburgerState);
    }



    return (
        // Activated by window width getting to mobile size
        <div className="hamburger">
            <div class="hamburgerNav">
                {(hamburgerState === false) &&
                    <label for="toggle" id="hamburger" onClick={changeToX}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </label>}

                {(hamburgerState === true) &&
                    <label for="toggle" id="hamburgerx" onClick={changeToX}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </label>}

            </div>
        </div>
    )
}