
import React, { useContext } from "react";
import "../../App.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalPropsContext } from "../GlobalPropsContext";


export default function Plant({ plant }) {
    const { image, nickname, species, water_frequency } = plant;
    const plantId = plant.id;
    const { setPlantList, plantList } = useContext(GlobalPropsContext);


    //MAKE DELETE WORK**
    const handleDelete = () => {
        axios
            .delete(`https://water-my-plants-fullstack-api.herokuapp.com/plants/${plantId}`) // Endpoint to get all plants in Database
            .then((res) => {
                setPlantList(plantList.filter(plant => plant.id !== plantId));
            })
            .catch((err) => {
                console.error("Server Error", err);
            });
    }

    return (
        <div className="plantCard">

            <img src={image} alt="" />
            <h2 className="plant-title">{nickname}</h2>
            <p><span>Species:</span> {species} </p>
            <p><span>Watering Frequency:</span> {water_frequency}</p>

            <Link to={`/editplant/${plantId}`}>
                <button className='plantButton'>EDIT</button>
            </Link>

            <button onClick={handleDelete} className='plantDeleteButton'>DELETE</button>

        </div>
    )
}
