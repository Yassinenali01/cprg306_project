'use client';

import React from 'react'
import { useState } from 'react'


const API_KEY = process.env.NEXT_PUBLIC_API_KEY;



export default function SearchBar({}) {




    const [search, setSearch] = useState("");

    const [weather, setWeather] = useState({});


    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}` + '&units=metric');
           
            const data = await response.json();
            console.log(data);
            
            if (data.cod === 200) {
                setWeather(data);
            }
        }
        catch (error) {
            console.log('not sure'+error);
        }
    }
    
    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(search)
        fetchWeather();
    }

    

    return (

        <div className="flex flex-col items-center justify-center bg-cover bg-center h-screen w-full" 
        style={{backgroundImage: `url(https://littlevisuals.co/images/atlantic_ridge.jpg)`}}>
    
        <h1 className="text-4xl font-bold p-7"> Weather App </h1>
    
        {/* Search Bar */}
        <div className='flex flex-col items-center justify-center w-full pt-4 '>
            <form className='flex flex-col items-center w-full p-3 bg-transparent border-gray-300 rounded-2xl'>
    
                <input 
                    type="text" 
                    placeholder="Search City" 
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm w-full mb-4 max-w-md"
                    value={search}
                    onChange={handleSearch}
                />
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg"
                    onClick={(e) => handleClick(e)}
                >
                    Search
                </button>
            </form>
        </div>
    
        {/* Weather Display */}
        {Object.keys(weather).length !== 0 ? (
        <div className="relative flex flex-col items-center justify-center text-white p-4 bg-blue-500 border-black rounded-lg mt-10 shadow-lg">
        <button 
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
        onClick={() => {
            setWeather({});
            setSearch('');
    }}
>
    X
</button>
        <h1 className="text-4xl font-bold p-7"> {weather.name} </h1>
        <div className="flex flex-row items-center justify-center">
            <h1 className="text-3xl font-bold p-7"> {Math.round(weather.main.temp)}&deg;C </h1>
            <h1 className="text-2xl font-bold p-7"> {weather.weather[0].main} </h1>
        </div>
        <div className="flex flex-row items-center justify-center">
            <h2 className="text-xl font-bold p-7"> Humidity: {weather.main.humidity}% </h2>
            <h2 className="text-xl font-bold p-7"> Wind Speed: {weather.wind.speed} m/s </h2>
        </div>
    </div>
        ) : null}
    </div>
    )
}
