import React, {useState, useEffect} from "react";
import './index.css';
import Weather from "./Component/Weather/Weather";
import search from "./axios";

function App() {
   const [defaultCity, setDefaultCity] = useState('');

    useEffect(() => {
        search().then(result => {
            setDefaultCity(result)
        });
    }, []);

    if (!defaultCity) {
        return (
            <div className='app'></div>
        )
    } else {
        return (
            <div>
                <Weather defaultCity={defaultCity}/>
            </div>
        )
    }

}
export default App;
