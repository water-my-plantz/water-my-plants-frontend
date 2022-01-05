import React, { useContext, useState, useEffect } from "react";
import "../../App.css"
import Search from "./search"
import Plant from "./plant";
import { GlobalPropsContext } from "../GlobalPropsContext";
import axios from "axios";



export default function Plants() {
    const { filteredPlants, isFetchingPlants } = useContext(GlobalPropsContext);
    const [plantList, setPlantList] = useState([]);

    //NOT WORKING*
	useEffect(() => {
		const getPlantList = () => {
			axios
				.get("localhost:9000/api/plants") // Endpoint to get all plants in Database
				.then((res) => {
					setPlantList(res.data);
                    console.log(res.data)
				})
				.catch((err) => {
					console.error("Server Error", err);
				});
		};
		getPlantList();
	}, []);

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