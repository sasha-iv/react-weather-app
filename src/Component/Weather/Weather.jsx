import React, {useEffect, useState} from "react";
import './Weather.scss';
import search from "../../axios";


const Weather = (props) => {

    const [userQuery, setUserQuery] = useState('');
    const [data, setData] = useState({});

    const searchCity = (e) => {
        e.preventDefault()
        console.log(userQuery)
        search(userQuery).then((result) => {
            setData(result);
        })
        setUserQuery('');
    }

    let defaultValue = props.defaultCity;

    useEffect(() => {
        if(defaultValue) {
            setData(defaultValue);
            console.log(defaultValue)
        }
    }, [])

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const showDate = () => {
        const months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date();
        let day = days[date.getDay() - 1];
        let dateNumber = date.getDate();
        let month = months[date.getMonth() - 1];
        let year = date.getFullYear();
        return `${day} ${dateNumber} ${month} ${year}`;
    }

    const WeekData = (props) => {
        let day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(props.weekData.dt * 1000));
        let src = props.weekData.weather[0].icon;
        let tempMax = props.weekData.main.temp_max - 273;
        let tempMin = props.weekData.main.temp_min - 273;
        let description = props.weekData.weather[0].description;

        return(
            <div className='weekData'>
                <h4>{day}</h4>
                <img src={process.env.PUBLIC_URL + `/images/${src}.png`} alt='img'/>
                <div className='temp'>
                    <span>{Math.round(tempMax)}&#176;</span>
                    <span>{Math.round(tempMin)}&#176;</span>
                </div>
                <span>{description}</span>
            </div>
        )
    }

    let forecastWeekly = null;
    if(data.list){
        const INTERVAL = 8;
        let newDataList = data.list.filter(function(value, index) {
            return index % INTERVAL === 0;
        });
        newDataList.shift();
        forecastWeekly = newDataList.map((weekForecast, i) => <WeekData key={i} weekData={weekForecast}/>)
    }

    return (
        <div className={data.list && (data.list[0].main.temp - 273) > 15 ? 'app warm' : 'app'}>

            <div className='weatherWrapper'>
                <form onSubmit={searchCity}>
                    <input
                        type='text'
                        placeholder='Search city'
                        value={userQuery}
                        onChange={e => setUserQuery(e.target.value)}
                    />
                </form>
                <div className='location'>
                    <span>{data?.city?.name}, {data?.city?.country}</span>
                    { data?.list?.length ?
                        <img src={process.env.PUBLIC_URL +`/images/${data.list[0].weather[0].icon}.png`} alt='img'/> : null}
                    {data?.list?.length ? <h2>{Math.round(data.list[0].main.temp - 273)}&#176;C</h2> : null}
                    {data?.list?.length ?
                        <span>{data.list[0].weather[0].description}</span> : null}
                    {data?.list?.length ? <span>Humidity: {data.list[0].main.humidity}%</span> : null}
                    {data?.list?.length ? <span>Wind: {Math.round(data.list[0].wind.speed)}m/s</span> : null}

                    { data?.list?.length ? <span>{showDate(data.list[0].dt * 1000)}</span>: null}
                </div>
                <div className='bottomBlock'>
                    <p>Week</p>
                    <div className='weeksContainer'>
                        {forecastWeekly}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
