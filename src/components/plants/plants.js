import React, { useContext, useState, useEffect } from "react";
import "../../App.css"
import Search from "./search"
import Plant from "./plant";
import { GlobalPropsContext } from "../GlobalPropsContext";
import axios from "axios";



export default function Plants() {
    const { filteredPlants, isFetchingPlants } = useContext(GlobalPropsContext);
    // const [plantList, setPlantList] = useState([]);
    const { plantList, setPlantList } = useContext(GlobalPropsContext);


    useEffect(() => {
        // const getPlantList = () => {
        axios
            .get(`https://water-my-plants-fullstack-api.herokuapp.com/plants`) // Endpoint to get all plants in Database
            .then((res) => {
                setPlantList(res.data);
                // console.log(res.data)
            })
            .catch((err) => {
                console.error("Server Error", err);
            });
        // };
        // getPlantList();
    }, [setPlantList]);


    return (
        <div>
            <span className="search-page"><Search /></span>
            <div className="CardSection">
                {isFetchingPlants ? "Loading Plants..." :
                    filteredPlants.map((eachPlant) => (
                        <Plant plant={eachPlant} key={eachPlant.id} />
                    ))}
            </div>
        </div>
    )
}