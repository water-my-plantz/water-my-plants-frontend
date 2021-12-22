
import { useState, useContext } from "react";
import "../../App.css"
import { Link } from "react-router-dom";
import { GlobalPropsContext } from "../GlobalPropsContext";
import { useNavigate } from 'react-router-dom'


export default function Plant(props) {
    const { allPlants, user } = useContext(GlobalPropsContext);
    const [isJoined, setIsJoined] = useState(false);

    const plantId = props.plant.id;

    const navigate = useNavigate();

    const handleDelete = () => {

    }

    return (
        <div className="plantCard">

            <h2>{props.plant.nickname}</h2>
            <img src={props.plant.img} alt="plantImage" />
            <p>Species: {props.plant.species} </p>
            <p>Watering Frequency: {props.plant.h20Frequency}</p>

            <a href= '/editplant'> 
            <button style={{ backgroundColor: "#efefef", color: "262d3a" }} onClick={() => { navigate.push('/editplant') }} className='plantButton'>Edit </button>
            </a>
            <button style={{ backgroundColor: "light-red" }} onClick={handleDelete} className='plantDeleteButton'>Delete </button>

        </div>
    )
}
