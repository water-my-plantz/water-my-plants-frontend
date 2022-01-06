
import React, { useContext, useState, useEffect } from "react";
import "../../App.css"
import { Link } from "react-router-dom";
import { GlobalPropsContext } from "../GlobalPropsContext";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";


export default function Plant({plant}) {
    const { allPlants, user } = useContext(GlobalPropsContext);

    const [isJoined, setIsJoined] = useState(false);

    const plantId = plant.id;

    const navigate = useNavigate();
	const params = useParams();

    const {nickname, species, water_frequency } = plant;



//MAKE DELETE WORK**
    const handleDelete = () => {
        // axios
		// 		.delete("localhost:9000/plants/:id") // Endpoint to get all plants in Database
		// 		.then((res) => {
		// 			setPlantList(res.data);
		// 		})
		// 		.catch((err) => {
		// 			console.error("Server Error", err);
		// 		});
    }


    return (
        <div className="plantCard">

            <h2>{nickname}</h2>
            <img src={''} alt="plantImage" />
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
