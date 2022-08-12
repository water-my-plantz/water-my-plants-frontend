import { useContext, useEffect, useState } from "react";
import "../../App.css";
import { GlobalPropsContext } from "../GlobalPropsContext";
import { useHistory } from "react-router-dom";
import { MdSearch } from "react-icons/md";




export default function Search() {
    const { setFilteredPlants, plantList } = useContext(GlobalPropsContext);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [filterDropDownValue, setFilterDropDownValue] = useState("nickname");
    const history = useHistory()

    // const handleDropdownChange = (e) => {
    //     setFilterDropDownValue(e.target.value);
    // };

    // when user types in the search this filter
    // should be activated and display results instantly
    useEffect(() => {
        if (searchInputValue === "") {
            setFilteredPlants(plantList);
        } else {
            const filteredPlantsFromAllPlants = plantList.filter(
                (eachPlantBy) => {
                    let filterBy;
                    // if by name:
                    if (filterDropDownValue === "nickname") {
                        filterBy = eachPlantBy.nickname
                            .toLowerCase()
                            .includes(searchInputValue.toLowerCase());
                    } else if (filterDropDownValue === "species") {
                        // if by type:
                        filterBy = eachPlantBy.species
                            .toLowerCase()
                            .includes(searchInputValue.toLowerCase());
                    }
                    return filterBy;
                }
            );
            setFilteredPlants(filteredPlantsFromAllPlants);
        }
    }, [searchInputValue, filterDropDownValue, plantList, setFilteredPlants]);

    return (
        <div className="searchPlants">

            <input
                className="searchInput"
                type="text"
                name="search"
                placeholder=""
                onChange={(e) => {
                    history.push("/plants");
                    setSearchInputValue(e.target.value);
                }}
            ></input>

            <button class="search-icon"><MdSearch /></button>



            {/* <select
                name="filterByDropdown"
                id="filterByDropdown"
                onChange={handleDropdownChange}
            >
            <option value="nickname">Name</option>
            <option value="species">Species</option>
            </select> */}


        </div >
    );
}
