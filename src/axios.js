import React, {useState} from "react";
import axios from "axios";

function search(userQuery = 'Kyiv') {

    return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${userQuery}&appid=33408ae1821856c9225795ef2f70fb54`)
        .then(result => {
            console.log(result.data)
            const lat = result.data[0].lat;
            const lon = result. data[0].lon;

            return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=33408ae1821856c9225795ef2f70fb54`)
                .then(result => {
                    console.log(result.data)
                    return result.data;
                })
        })
}
export default search;
