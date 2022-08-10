
import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from 'yup'
import { GlobalPropsContext } from '../GlobalPropsContext'
import "../../App.css"
import plantFormSchema from "../../validation/plantFormSchema.js";

const initialEditPlantFormErrors = {
    nickname: "",
    species: "",
    water_frequency: "",
};


export default function EditPlant() {
    const history = useHistory();
    // const { isLoading, setIsLoading } = useContext(GlobalPropsContext);
    const [plantInfo, setPlantInfo] = useState({});
    const [plantFormValues, setPlantFormValues] = useState({});
    const params = useParams();
    const { id } = params
    const [plantId, setPlantId] = useState(plantInfo?.plant_id);

    const [editPlantErrors, setEditPlantErrors] = useState(
        initialEditPlantFormErrors
    );
    const [editDisabled, setEditDisabled] = useState(false);

    // use axios to get plant info to display in form
    useEffect(() => {
        axios
            .get(`https://water-my-plants-fullstack-api.herokuapp.com/plants/${id}`)
            .then((res) => {
                setPlantInfo(res.data);
                setPlantFormValues(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);



    const onChange = (e) => {
        //VALIDATION
        const { name, value } = e.target;
		yup
			.reach(plantFormSchema, name)
			.validate(value)
			.then(() => {
				setEditPlantErrors({ ...editPlantErrors, [name]: "" });
			})
			.catch((err) => {
				setEditPlantErrors({ ...editPlantErrors, [name]: err.message });
			});
		console.log(editPlantErrors);

        const newPlantFormValues = {
            ...plantFormValues,
            [name]: e.target.value,
        };
        setPlantFormValues(newPlantFormValues);
        };


	//ENABLE BUTTON WHEN NO ERRORS EXIST
	useEffect(() => {
		plantFormSchema.isValid(plantFormValues).then((isSchemaValid) => {
			setEditDisabled(!isSchemaValid);
		});
	}, [plantFormValues]);

    const editPlantSubmitHandler = (e) => {
        e.preventDefault();
        // setIsLoading(true);
        // send to database via axios
        axios.put(
            `https://water-my-plants-fullstack-api.herokuapp.com/plants/${id}`,
            {
                id: id, nickname: plantFormValues.nickname, species: plantFormValues.species, water_frequency: plantFormValues.water_frequency, image: plantFormValues.image,
            },
        )
            .then(
                history.push("/plants")
            )
            .finally(() => {
                console.log(plantId);
            });
    };

    if (!plantInfo) {
        return <div>Loading Plant...</div>;
    }

    return (
        <div>
            <form onSubmit={editPlantSubmitHandler} className="form">
                <h1>Edit Your Plant!</h1>
                <input
                    placeholder="Plant Name"
                    name="nickname"
                    label="nickname"
                    type="text"
                    id="nickname"
                    onChange={onChange}
                    value={plantFormValues.nickname}
                />
                <input
                    placeholder="Plant Species"
                    name="species"
                    label="species"
                    type="text"
                    id="species"
                    onChange={onChange}
                    value={plantFormValues.species}
                />

                <input
                    placeholder="Watering Frequency"
                    name="water_frequency"
                    label="water_frequency"
                    type="text"
                    id="water_frequency"
                    onChange={onChange}
                    value={plantFormValues.water_frequency}
                />
                <input
                    placeholder="Plant Image Url*"
                    name="image"
                    label="image"
                    type="text"
                    id="image"
                    onChange={onChange}
                    value={plantFormValues.image}
                />
                <div className="formErrors">
                    <div>{editPlantErrors.nickname}</div>
                    <div>{editPlantErrors.species}</div>
                    <div>{editPlantErrors.water_frequency}</div>
                </div>
                <button 
                className='createButton'
                type="submit"
                disabled={editDisabled}
                >
                    Submit Edits
                </button>
            </form>
        </div>
    )
}
