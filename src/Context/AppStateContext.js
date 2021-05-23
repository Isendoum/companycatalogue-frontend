import React, { createContext, useState } from 'react';


export const AppStateContext = createContext();



export const AppStateProvider = (props) => {


    const [location, setLocation] = useState("");
    const [department, setDepartment] = useState("");
    const [employee, setEmployee] = useState("");




    return (
        <AppStateContext.Provider value={{ location: [location, setLocation], department: [department, setDepartment], employee: [employee, setEmployee] }}>
            {props.children}
        </AppStateContext.Provider>
    );
}