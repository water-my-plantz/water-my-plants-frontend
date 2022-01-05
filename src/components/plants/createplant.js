// - `id`: Integer
// - `nickname`: String
// - `species` : String
// - `h2oFrequency`: Type determined by implementation
// - `image`: (optional)


import { useContext, useState, useEffect } from "react";
import axios from 'axios'
// import * as yup from 'yup'
import { GlobalPropsContext } from '../GlobalPropsContext'
import "../../App.css"
// import plantFormSchema from "../../validation/plantFormSchema.js";


const initialCreatePlantFormValues = {id: "", name: "", species: "", h2oFrequency: ""};

const initialCreatePlantFormErrors = {id: "", name: "", species: "", h2oFrequency: ""}; 

const initialCreateButtonDisabled = false;//CHANGE TO TRUEY

const testObjValues = {
};


export default function CreatePlant() {
    const { isLoading, setIsLoading } = useContext(GlobalPropsContext);

    const [plantId, setPlantId] = useState(0);
    const [plantFormValues, setPlantFormValues] = useState(initialCreatePlantFormValues);

	const [createPlantErrors, setCreatePlantErrors] = useState(
		initialCreatePlantFormErrors,
        );
    const [createDisabled, setCreateDisabled] = useState(
		initialCreateButtonDisabled,
        );


    const [testObj, setTestObj] = useState(testObjValues)

    const onChange = (e) => {
		const { name, value } = e.target;
		// yup
		// 	.reach(plantFormSchema, name)
		// 	.validate(value)
		// 	.then(() => {
		// 		setCreatePlantErrors({ ...createPlantErrors, [name]: "" });
		// 	})
		// 	.catch((err) => {
		// 		setCreatePlantErrors({ ...createPlantErrors, [name]: err.message });
		// 	});
		// console.log(createPlantErrors);

            setPlantFormValues({
            ...plantFormValues, [e.target.name]: e.target.value
            })  
        
            
    }

    
	//ENABLE BUTTON WHEN NO ERRORS EXIST
	// useEffect(() => {
	// 	plantFormSchema.isValid(plantFormValues).then((isSchemaValid) => {
	// 		setCreateDisabled(!isSchemaValid);
	// 	});
	// }, [plantFormValues]);

    const createPlantSubmitHandler = (e) => {
        e.preventDefault();
        console.log(plantFormValues)
        // setIsLoading(true);
        // console.log(isLoading);

//NOT WORKING*
        axios.post('localhost:9000/plants/addplant', plantFormValues)
            .then(res => {
				setPlantFormValues(res.data);
				setPlantId(res.data.class_id);
                console.log("plant", res);
            })
            .catch(err => {
                console.log(err);
            })
        }

                
    return (
        <div>
            <form onSubmit={createPlantSubmitHandler} className="form">
                <h1>Create a Plant!</h1>
                <input
                    placeholder="Plant Name"
                    name="name"
                    label="name"
                    type="text"
                    id="name"
                    onChange={onChange}
                    value={plantFormValues.name}
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
                    Create a Plant!
                </button>
            </form>
        </div>
    )
}

// make sure punch pass is an option for createClass