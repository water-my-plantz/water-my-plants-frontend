
import React from "react";
import "../../App.css"
import { Link } from "react-router-dom";
import axios from "axios";

export default function Plant({plant}) {
    const {image, nickname, species, water_frequency } = plant;
    const plantId = plant.id;

//MAKE DELETE WORK**
    const handleDelete = () => {
        axios
				.delete(`https://water-my-plants-fullstack-api.herokuapp.com/plants/${plantId}`) // Endpoint to get all plants in Database
				.then((res) => {
                    window.location.reload();
				})
				.catch((err) => {
					console.error("Server Error", err);
				});
    }

    return (
        <div className="plantCard">

            <h2>{nickname}</h2>
            <img src={image} alt="" />
            <p>Species: {species} </p>
            <p>Watering Frequency: {water_frequency}</p>

            <Link to={`/editplant/${plantId}`}>             
            <button style={{ backgroundColor: "#efefef", color: "262d3a" }} className='plantButton'>Edit </button>
            </Link>
            {/* <button style={{ backgroundColor: "#efefef", color: "262d3a" }} onClick={() => { navigate.push('/editplant') }} className='plantButton'>Edit </button> */}

            <button style={{ backgroundColor: "light-red" }} onClick={handleDelete} className='plantDeleteButton'>Delete </button>

        </div>
    )
}
