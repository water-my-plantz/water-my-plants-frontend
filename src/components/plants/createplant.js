import { useContext, useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { GlobalPropsContext } from "../GlobalPropsContext";
import "../../App.css";
import plantFormSchema from "../../validation/plantFormSchema.js";
import { useHistory, Redirect } from "react-router-dom";

const initialCreatePlantFormValues = {
    nickname: "",
    species: "",
    water_frequency: "",
    image: "",
};

const initialCreatePlantFormErrors = {
    nickname: "",
    species: "",
    water_frequency: "",
};

const initialCreateButtonDisabled = true;


export default function CreatePlant() {
    const { isLoading, setIsLoading } = useContext(GlobalPropsContext);
    let history = useHistory();

    const [plantFormValues, setPlantFormValues] = useState(
        initialCreatePlantFormValues
    );
    const [createPlantErrors, setCreatePlantErrors] = useState(
        initialCreatePlantFormErrors
    );
    const [createDisabled, setCreateDisabled] = useState(
        initialCreateButtonDisabled
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        yup.reach(plantFormSchema, name)
            .validate(value)
            .then(() => {
                setCreatePlantErrors({ ...createPlantErrors, [name]: "" });
            })
            .catch((err) => {
                setCreatePlantErrors({
                    ...createPlantErrors,
                    [name]: err.message,
                });
                <Redirect to="/login" />;
            });
        console.log(createPlantErrors);
        setPlantFormValues({
            ...plantFormValues,
            [e.target.name]: e.target.value,
        });
    };

    //ENABLE BUTTON WHEN NO ERRORS EXIST
    useEffect(() => {
        plantFormSchema.isValid(plantFormValues).then((isSchemaValid) => {
            setCreateDisabled(!isSchemaValid);
        });
    }, [plantFormValues]);

    const createPlantSubmitHandler = (e) => {
        e.preventDefault();

        const plant = {
            nickname: plantFormValues.nickname,
            species: plantFormValues.species,
            water_frequency: plantFormValues.water_frequency,
            image: plantFormValues.image,
        };
        console.log('plant', plant);

        axios
            .post(
                "https://water-my-plants-fullstack-api.herokuapp.com/plants/addplant",
                plant
            )
            .then((res) => {
                setPlantFormValues(res.data);
                console.log("post", res);
                history.push("/plants");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <form onSubmit={createPlantSubmitHandler} className="form">
                <h2 className="create-h2" >Add Plant!</h2>
                <input
                    placeholder="Plant Name*"
                    name="nickname"
                    label="nickname"
                    type="text"
                    id="nickname"
                    onChange={onChange}
                    value={plantFormValues.nickname}
                />
                <input
                    placeholder="Species*"
                    name="species"
                    label="species"
                    type="text"
                    id="species"
                    onChange={onChange}
                    value={plantFormValues.species}
                />

                <input
                    placeholder="Watering Frequency*"
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
                    <div>{createPlantErrors.nickname}</div>
                    <div>{createPlantErrors.species}</div>
                    <div>{createPlantErrors.water_frequency}</div>
                </div>

                <button className='createButton' type="submit" disabled={createDisabled}>
                    SUBMIT
                </button>
            </form>
        </div>
    );
}