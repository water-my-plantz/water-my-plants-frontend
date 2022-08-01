
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import * as yup from 'yup'
import { GlobalPropsContext } from '../GlobalPropsContext'
import "../../App.css"
// import plantFormSchema from "../../validation/plantFormSchema.js";

const initialCreateButtonDisabled = true;


export default function EditPlant() {
    const { isLoading, setIsLoading } = useContext(GlobalPropsContext);
    const [plantInfo, setPlantInfo] = useState({});
    const [plantFormValues, setPlantFormValues] = useState({});
    const params = useParams();
    const { id } = params
    const [plantId, setPlantId] = useState(plantInfo?.plant_id);
    const [plantImg, setPlantImg] = useState(null);
    const [plantImgError, setPlantImgError] = useState(null);


    // use axios to get plant info to display in form
    useEffect(() => {
        axios
            .get(`https://water-my-plants-fullstack-api.herokuapp.com/plants/${id}`)
            .then((res) => {
                setPlantInfo(res.data);
                setPlantFormValues({ nickname: plantInfo.nickname, species: plantInfo.species, water_frequency: plantInfo.water_frequency });
                console.log(res.data)

            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        setPlantFormValues(plantInfo);
    }, [plantInfo]);
    console.log('plantInfo',plantInfo)




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
        
        console.log()
    };

    const handleFileChange = (e) => {
        setPlantImg(null);
        let selected = e.target.files[0];
        console.log(selected);
        if (!selected) {
            setPlantImgError("please select an image file");
            return;
        }
        if (!selected.type.includes("image")) {
            setPlantImgError("please select an image file");
            return;
        }
        if (selected.size > 1000000) {
            setPlantImgError("file size is too large, 100kb max");
            return;
        }
        setPlantImgError(null);
        setPlantImg(selected);
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
                nickname: plantInfo.nickname, species: plantInfo.species, water_frequency: plantInfo.water_frequency, image: plantImg,
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
                    name="water_frequency"
                    label="water_frequency"
                    type="text"
                    id="water_frequency"
                    onChange={onChange}
                    value={plantFormValues.water_frequency}
                />
                <input type="file" required onChange={handleFileChange} />
                {plantImgError && <div className="error">{plantImgError}</div>}
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
