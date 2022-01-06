
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import * as yup from 'yup'
import { GlobalPropsContext } from '../GlobalPropsContext'
import "../../App.css"
// import plantFormSchema from "../../validation/plantFormSchema.js";


// const initialFakePlantData =   {
//   nickname: "Daisy",
//   species: "daisy",
//   h20Frequency: "2x a day",
// }

// const initialCreatePlantFormErrors = {nickname: "", species: "", h20Frequency: "",};

const initialCreateButtonDisabled = true;


export default function EditPlant() {
    const { isLoading, setIsLoading } = useContext(GlobalPropsContext);

    const [plantInfo, setPlantInfo] = useState({});

    const initialEditPlantFormValues = { nickname: plantInfo.nickname, species: plantInfo.species, h20Frequency: plantInfo.h20Frequency };   

    const [plantFormValues, setPlantFormValues] =
        useState(initialEditPlantFormValues);

    const params = useParams();
    const { id } = params
    const [plantId, setPlantId] = useState(plantInfo?.plant_id);


    // use axios to get plant info to display in form
    useEffect(() => {
        axios
            .get(`https://water-my-plants-fullstack-api.herokuapp.com/plants/${id}`)
            .then((res) => {
                setPlantInfo(res.data);
                console.log(plantInfo)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [plantId]);



 

	// const [createPlantErrors, setCreatePlantErrors] = useState(
	// 	initialCreatePlantFormErrors,
    //     );
    const [createDisabled, setCreateDisabled] = useState(
		initialCreateButtonDisabled,
        );

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
        
        console.log()
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
                nickname: plantInfo.nickname, species: plantInfo.species, h20Frequency: plantInfo.h20Frequency
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
                    name="name"
                    label="name"
                    type="text"
                    id="name"
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
                    name="h20Frequency"
                    label="h20Frequency"
                    type="text"
                    id="h20Frequency"
                    onChange={onChange}
                    value={plantFormValues.h20Frequency}
                />

                <button 
                type="submit"
                disabled={createDisabled}
                >
                    Submit Edits
                </button>
            </form>
        </div>
    )
}
