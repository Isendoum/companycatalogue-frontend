import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import React, { useContext } from 'react';
import EmployeeInfo from '../Pages/EmployeeInfo';
import Locations from '../Pages/Locations';
import Departments from '../Pages/Departments';
import Department from '../Pages/Department';
import Search from '../Pages/Search';
import { AppStateContext } from '../Context/AppStateContext';
import { AppBar, MenuItem } from '@material-ui/core'
import './CustomRouter.css'


function CustomRouter() {
  const { location, department, employee } = useContext(AppStateContext);

  const [selectedLocation,] = location;
  const [selectedDepartment,] = department;


  return (
    <div >

      <Router>
        <AppBar style={{ backgroundColor: "#282c34", height: 50, display: "inline-flex", flexDirection: "row", justifyContent: "space-evenly", fontSize: 30, alignContent: "center" }}>
          <NavLink className="link" color="white" to="/locations">Τοποθεσίες</NavLink>
          <NavLink className="link" to="/">Search</NavLink>
        </AppBar>
        <Switch >

          <Route path="/locations">
            <Locations />
          </Route>

          <Route path={"/departments/" + selectedLocation.locName}>
            <Departments />
          </Route>
          <Route path={"/department/" + selectedLocation.locName + "/" + selectedDepartment.dname}>
            <Department />
          </Route>
          <Route path="/employee-information">
            <EmployeeInfo />
          </Route>

          <Route path="/">
            <Search />
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default CustomRouter;