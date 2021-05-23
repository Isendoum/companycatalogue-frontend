import React, { useContext, useState, useEffect } from 'react';
import List from '../Components/List'



import { useHistory } from "react-router-dom";
import { AppStateContext } from '../Context/AppStateContext'
import { getLocations } from '../Services/ApiHandler';

const Locations = () => {
    const { location } = useContext(AppStateContext);

    const [locations, setLocations] = useState();

    const [, setSelectedLocation] = location;

    const history = useHistory();

    const navigateToDepartments = (location) => {
        setSelectedLocation(location)
        history.push("/departments/" + location.locName)
    }

    const getLocationsFromServer = async () => {
        const result = await getLocations();
        setLocations(result);
    }

    useEffect(() => {
        getLocationsFromServer();
    }, [])

    return <div style={{ display: "inline-flex", flexDirection: "column", paddingTop: 50 }}>
        <h1>Λίστα Τοποθεσιών</h1>

        <List list={locations} onClick={navigateToDepartments} />
    </div>
}





export default Locations;