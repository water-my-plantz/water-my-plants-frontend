// - `id`: Integer
// - `nickname`: String
// - `species` : String
// - `water_frequency`: Type determined by implementation
// - `image`: (optional)

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
};

const initialCreatePlantFormErrors = {
    nickname: "",
    species: "",
    water_frequency: "",
};

const initialCreateButtonDisabled = false; //CHANGE TO TRUEY

const testObjValues = {};

// const plantImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Oenanthe_crocata_kz04.jpg"

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
    const [plantImg, setPlantImg] = useState(null);
    const [plantImgError, setPlantImgError] = useState(null);

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
            image: plantImg,
        };
        console.log('plant',plant);

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
                <h1>Create a Plant!</h1>
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
                    placeholder="Species"
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
                {/* RENDER THE VALIDATION ERRORS HERE */}
                <div className="formErrors">
                    <div>{createPlantErrors.nickname}</div>
                    <div>{createPlantErrors.species}</div>
                    <div>{createPlantErrors.water_frequency}</div>
                </div>

                <button type="submit" disabled={createDisabled}>
                    Create a Plant!
                </button>
            </form>
        </div>
    );
}