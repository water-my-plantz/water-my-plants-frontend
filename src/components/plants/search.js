import { useContext, useEffect, useState } from "react";
import "../../App.css"
import { GlobalPropsContext } from "../GlobalPropsContext";


export default function Search() {
    const { setFilteredPlants, allPlants } = useContext(GlobalPropsContext);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [filterDropDownValue, setFilterDropDownValue] = useState("");


    const handleDropdownChange = (e) => {
        setFilterDropDownValue(e.target.value);
    }


    // when user types in the search this filter 
    // should be activated and display results instantly
    useEffect(() => {
        if (searchInputValue === "") {
            setFilteredPlants(allPlants);
        } else {
            const filteredPlantsFromAllPlants =
                allPlants.filter((eachPlantBy) => {

                    let filterBy;

                    // if by name: 
                    if (filterDropDownValue === "nickname") {
                        filterBy = eachPlantBy.nickname.toLowerCase().includes(searchInputValue.toLowerCase());
                    } else if (filterDropDownValue === "species") {
                        // if by type:
                        filterBy = eachPlantBy.species.toLowerCase().includes(searchInputValue.toLowerCase());
                    }
                    return filterBy;
                })

            setFilteredPlants(filteredPlantsFromAllPlants);
        }
    })

    return (
        <div className="searchPlants">
            <input className="searchInput" type='text' name="search" placeholder="Search Through Plants By" onChange={e => { setSearchInputValue(e.target.value) }}></input>
            <select name="filterByDropdown" id="filterByDropdown" onChange={handleDropdownChange}>
                <option value="nickname">
                    Plant Name
                </option>
                <option value="species">
                    Type of Plant
                </option>
            </select>
        </div>
    )
}
