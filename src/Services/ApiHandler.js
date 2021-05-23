import axiosClient from './ApiService';

const parser = require('fast-xml-parser');
const he = require('he');
var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata",
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: true,
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),
    tagValueProcessor: (val, tagName) => he.decode(val),
    stopNodes: ["parse-me-as-string"]
};

export async function getLocations() {
    try {
        const result = await axiosClient.get('/locations/');
        return parser.parse(result.data, options);
    } catch (err) {
        console.log(err)
    }
}
export async function getDepartmentByLocation(locId) {
    try {
        const result = await axiosClient.get('/departments/?locId=' + locId);
        return parser.parse(result.data, options);
    } catch (err) {
        console.log(err)
    }
}

export async function getDepartments() {
    try {
        const result = await axiosClient.get('/departments/');
        return parser.parse(result.data, options);
    } catch (err) {
        console.log(err)
    }
}
export async function getEmployeesByDepartment(deptId) {
    try {
        const result = await axiosClient.get('/employees/employeesByDept/?deptId=' + deptId);
        return parser.parse(result.data, options);
    } catch (err) {
        console.log(err)

    }
}

export async function getEmployee(empId) {
    try {
        const result = await axiosClient.get('/employees/employee/?empId=' + empId);
        return parser.parse(result.data);
    } catch (err) {
        console.log(err)
    }
}

export async function getEmployeeByName(lastName, firstName) {
    try {
        const result = await axiosClient.get('/employees/search/?lastName=' + lastName + "&firstName=" + firstName);
        return parser.parse(result.data, options);
    } catch (err) {
        console.log(err)
    }
}

//TO-DO CREATE  getEmployee