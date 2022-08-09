
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import * as yup from 'yup'
import { GlobalPropsContext } from '../GlobalPropsContext'
import "../../App.css"
// import plantFormSchema from "../../validation/plantFormSchema.js";

// const initialCreateButtonDisabled = true;


export default function EditPlant() {
    const { isLoading, setIsLoading } = useContext(GlobalPropsContext);
    const [plantInfo, setPlantInfo] = useState({});
    const [plantFormValues, setPlantFormValues] = useState({});
    const params = useParams();
    const { id } = params
    const [plantId, setPlantId] = useState(plantInfo?.plant_id);


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

	// const [createPlantErrors, setCreatePlantErrors] = useState(
	// 	initialCreatePlantFormErrors,
    //     );
    // const [createDisabled, setCreateDisabled] = useState(
	// 	initialCreateButtonDisabled,
    //     );

    const onChange = (e) => {
        //VALIDATION
        const { name, value } = e.target;
		// yup
		// 	.reach(plantFormSchema, name)
		// 	.validate(value)
		// 	.then(() => {
		// 		setCreatePlantsErrors({ ...createPlantErrors, [name]: "" });
		// 	})
		// 	.catch((err) => {
		// 		setCreatePlantErrors({ ...createPlantErrors, [name]: err.message });
		// 	});
		// console.log(createPlantErrors);

        const newPlantFormValues = {
            ...plantFormValues,
            [name]: e.target.value,
        };
        setPlantFormValues(newPlantFormValues);
        console.log('pfv', plantFormValues);
        };


	//ENABLE BUTTON WHEN NO ERRORS EXIST
	// useEffect(() => {
	// 	plantFormSchema.isValid(plantFormValues).then((isSchemaValid) => {
	// 		setCreateDisabled(!isSchemaValid);
	// 	});
	// }, [plantFormValues]);

    const editPlantSubmitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // send to database via axios
        axios.put(
            `https://water-my-plants-fullstack-api.herokuapp.com/plants/${id}`,
            {
                nickname: plantInfo.nickname, species: plantInfo.species, water_frequency: plantInfo.water_frequency, image: plantInfo.image,
            },
        )
            .then((res) => {
                setPlantFormValues(res.data);
                setPlantId(res.data.plant_id);
            })
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
                <button 
                type="submit"
                // disabled={createDisabled}
                >
                    Submit Edits
                </button>
            </form>
        </div>
    )
}
