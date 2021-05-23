import React, { useState, useEffect, useContext } from 'react';
import { Select, MenuItem, Button, TextField } from '@material-ui/core'
import { getLocations, getDepartments, getDepartmentByLocation, getEmployeesByDepartment, getEmployeeByName } from '../Services/ApiHandler';
import List from '../Components/List'
import { useHistory } from "react-router-dom";
import { AppStateContext } from '../Context/AppStateContext'




const Search = () => {
    const history = useHistory();
    const { employee } = useContext(AppStateContext);
    const [selectedEmployee, setSelectedEmployee] = employee;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [locations, setLocations] = useState();
    const [location, setLocation] = useState("");
    const [searchContext, setSearchContext] = useState("topothesies");
    const [viewState, setViewState] = useState();


    const handleSearchContextChange = async (event) => {

        setSearchContext(event.target.value)
    }
    const handleLocationChange = async (event) => {

        setLocation(event.target.value)
    }
    const handleEmployeeRowClick = async (employee) => {
        setSelectedEmployee(employee);
        history.push("/employee-information")
    }

    const handleDepartmentRowClick = async (department) => {
        const result = await getEmployeesByDepartment(department.deptId);
        setViewState(<List list={result} onClick={handleEmployeeRowClick} />)
    }


    const getResultsFromServer = async () => {
        let result = null;
        switch (searchContext) {
            case "topothesies":
                result = await getLocations();
                console.log(result)
                setViewState(<List list={result} onClick={() => null} />)
                break;

            case "tmimata":
                if (location !== "ola") {
                    result = await getDepartmentByLocation(location.locId);
                    console.log(result)
                    setViewState(<List list={result} onClick={handleDepartmentRowClick} />)
                } else {
                    result = await getDepartments();
                    console.log(result)
                    setViewState(<List list={result} onClick={handleDepartmentRowClick} />)
                }

                break;
            case "ipaliloi":
                if (location !== "ola") {
                    result = await getEmployeeByName(lastName, firstName);
                    console.log(result)
                    setViewState(<List list={result} onClick={handleEmployeeRowClick} />)
                }

                break;

            default:
                break;
        }

    }

    useEffect(async () => {
        if (searchContext === "tmimata") {
            const result = await getLocations();
            if (result !== undefined) {
                setLocations(result.ArrayList[0].item);
                setLocation(result.ArrayList[0].item[0])
            }


        } else if (searchContext === "topothesies") {
            setLocation("")
        }
        return () => {

        }
    }, [searchContext])




    return <div style={{ display: "inline-flex", flexDirection: "column", paddingTop: 50 }}>
        <h1>Aναζήτηση</h1>
        <form >

            <div style={{ marginBottom: 10 }} >

                <Select

                    style={{ minWidth: 100, justifySelf: "end", marginRight: 10 }}

                    value={searchContext}
                    onChange={handleSearchContextChange}
                >
                    <MenuItem value={"topothesies"}>Τοποθεσίες</MenuItem>
                    <MenuItem value={"tmimata"}>Τμήματα</MenuItem>
                    <MenuItem value={"ipaliloi"}>Υπάλληλοι</MenuItem>

                </Select>
                {(searchContext === "tmimata" && locations) ? <Select
                    value={location}
                    onChange={handleLocationChange}

                ><MenuItem value={"ola"}>Όλα τα τμήματα</MenuItem>
                    {locations.map((item) => <MenuItem key={item.locId} value={item}>{item.locName}</MenuItem>)}</Select> : null}
            </div>
            {searchContext === "ipaliloi" ? <div style={{ margin: 10 }}>
                <TextField onChange={(e) => setFirstName(e.target.value)} label="Όνομα"> </TextField>
                <TextField onChange={(e) => setLastName(e.target.value)} label="Επώνυμο"></TextField></div> : null}



            <div>

                <Button variant="contained" onClick={() => getResultsFromServer()}>αναζητηση</Button>
            </div>

        </form>
        {viewState}

    </div>





}

export default Search;