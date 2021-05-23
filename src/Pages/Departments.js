import React, { useContext, useEffect, useState } from 'react';


import { useHistory } from "react-router-dom";
import { AppStateContext } from '../Context/AppStateContext'

import { getDepartmentByLocation, getDepartments } from '../Services/ApiHandler';
import List from '../Components/List'

const Departments = () => {
    const history = useHistory();
    const { location, department } = useContext(AppStateContext);
    const [departments, setDepartments] = useState()

    const [selectedLocation,] = location;
    const [, setSelectedDepartment] = department;

    const navigateToDepartment = (department) => {
        setSelectedDepartment(department)
        history.push("/department/" + selectedLocation.locName + "/" + department.dname)
    }
    const getDepartmentsByLocationFromServer = async (locId) => {

        const result = await getDepartmentByLocation(locId);
        if (result.ArrayList === "") {
            setDepartments(undefined);
        } else setDepartments(result);

    }

    const getAllDepartmentsFromServer = async () => {

        const result = await getDepartments();
        setDepartments(result);
    }

    useEffect(() => {
        if (selectedLocation) {
            getDepartmentsByLocationFromServer(selectedLocation.locId);
        } else {
            getAllDepartmentsFromServer()
        }
        return () => {


        }
    }, [selectedLocation.locId, selectedLocation])


    return <div style={{ display: "inline-flex", flexDirection: "column", paddingTop: 50 }}>
        <div>
            <h1>Λίστα Τμημάτων </h1>
            <button onClick={history.goBack}>Επιστροφή</button>
        </div>
        <h3>Περιοχή: {selectedLocation.locName}</h3>
        <List list={departments} onClick={navigateToDepartment} />

    </div>

}

export default Departments;