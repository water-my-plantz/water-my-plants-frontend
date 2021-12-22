import { useContext } from "react";
import "../../App.css"
import Search from "./search"
import Plant from "./plant";
import { GlobalPropsContext } from "../GlobalPropsContext";


export default function Plants() {
    const { filteredPlants, isFetchingPlants } = useContext(GlobalPropsContext);

    return (
        <div>
            <Search />
            <div className="CardSection">
                {isFetchingPlants ? "Loading Plants..." :
                    filteredPlants.map((eachPlant) => (
                        <Plant plant={eachPlant} key={eachPlant.id} />
                    ))}
            </div>
        </div>
    )
}