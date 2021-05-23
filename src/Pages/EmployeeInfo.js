import React, { useContext, useEffect } from 'react';


import { useHistory } from "react-router-dom";
import { getEmployee } from '../Services/ApiHandler';
import { AppStateContext } from '../Context/AppStateContext'




const EmployeeInfo = () => {

    const { employee } = useContext(AppStateContext);

    const [selectedEmployee, setSelectedEmployee] = employee;

    const history = useHistory()

    const getEmployeeFromServer = async (empId) => {
        const result = await getEmployee(empId);
        if (result === undefined) {
            setSelectedEmployee(undefined)
        } else setSelectedEmployee(result.Employee);

    }

    useEffect(() => {
        getEmployeeFromServer(selectedEmployee.empId);
        return () => { }
    }, [selectedEmployee.empId])


    return <div style={{ paddingTop: 50 }} >
        <div >
            <h1>Πληροφορίες Υπαλλήλου</h1>
            <button onClick={history.goBack}>Επιστροφή</button>
        </div>
        {selectedEmployee ? <div style={{ borderWidth: 2, borderColor: "black", borderStyle: "solid", display: "inline-table", minWidth: 400 }}>
            <h4>ID:{selectedEmployee.empId} </h4>
            <h4>Επώνημο: {selectedEmployee.lastName}</h4>
            <h4>Όνομα: {selectedEmployee.firstName}</h4>
            <h4>Εργασία: {selectedEmployee.job}</h4>
            <h4>Μάνατζερ: {selectedEmployee.employee}</h4>
            <h4>Ημερομηνία Πρόσληψης: {selectedEmployee.hireDate}</h4>
            <h4>Ετήσιος Μισθός: {selectedEmployee.salary}</h4>
            <h4>Ετήσιες Προμήθειες: {selectedEmployee.comm}</h4>
            <h4>Τμήμα: {selectedEmployee.department}</h4>
        </div> : <p>Παρουσιάστικε κάποιο πρόβλημα</p>}

    </div>





}

export default EmployeeInfo;