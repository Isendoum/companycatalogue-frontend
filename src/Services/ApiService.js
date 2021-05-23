import axios from 'axios';




const axiosClient = axios.create({

    baseURL: `https://companycatalogue.herokuapp.com/rest`,
    headers: {
        'Content-Type': 'application/xml',


    }
});




export default axiosClient;