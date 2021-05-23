import React, { useContext, useState, useEffect } from 'react';


import { useHistory } from "react-router-dom";
import { AppStateContext } from '../Context/AppStateContext'
import { getEmployeesByDepartment } from '../Services/ApiHandler';
import List from '../Components/List'



const Department = () => {


    const history = useHistory();
    const { location, department, employee } = useContext(AppStateContext);
    const [employees, setEmployees] = useState();

    const [selectedLocation,] = location;
    const [selectedDepartment,] = department;
    const [selectedEmployee, setSelectedEmployee] = employee;

    const navigateToEmployee = (employee) => {
        setSelectedEmployee(employee)
        history.push("/employee-information")
    }

    const getEmployeesFromServer = async (deptId) => {
        const result = await getEmployeesByDepartment(deptId);
        setEmployees(result);
    }

    useEffect(() => {
        getEmployeesFromServer(selectedDepartment.deptId);
        return () => { }
    }, [selectedDepartment.deptId, selectedEmployee])


    return <div style={{ display: "inline-flex", flexDirection: "column", paddingTop: 50 }}>
        <div>
            <h1>Λίστα Υπαλλήλων Τμήματος</h1>
            <button onClick={history.goBack}>Επιστροφή</button>
        </div>
        <h3>Περιοχή: {selectedLocation.locName}</h3>
        <h3>Τμήμα: {selectedDepartment.dname}</h3>

        <List list={employees} onClick={navigateToEmployee} />

    </div>


}

export default Department;