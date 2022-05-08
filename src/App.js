import React, { useRef, useState, useEffect } from 'react';
import Home from './components/Home';
import './App.css';
import Calendar from 'react-calendar'

function App() {
    const [planets, setPlanets] = useState([]);
    const [spacecraft, setSpacecraft] = useState([]);
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDestPlanet, setSelectedDestPlanet] = useState("__");
    const [selectedDepartPlanet, setSelectedDepartPlanet] = useState("__");
    const [selectedTripType, setSelectedTripType] = useState("__");
    const [selectedSpacecraft, setSelectedSpacecraft] = useState("__");
    const [selectedSpecies, setSelectedSpecies] = useState("__");
    const [passengerName, setPassengerName] = useState("__");

    const [planetResidents, setPlanetResidents] = useState("__");

    const [startValue, onStartChange] = useState(new Date());
    const [endValue, onEndChange] = useState(new Date());

    useEffect(() => {

      async function fetchPlanets(){
        let res = await fetch('https://swapi.dev/api/planets/?format=json');
        let data = await res.json();
        setPlanets(data.results);
      }

      async function fetchSpacecraft(){
        let res = await fetch('https://swapi.dev/api/starships/?format=json');
        let data = await res.json();
        setSpacecraft(data.results);
      }

      async function fetchSpecies(){
        let res = await fetch('https://swapi.dev/api/species/?format=json');
        let data = await res.json();
        setSpecies(data.results);
      }

      // async function findResidents(){
      //   setPlanetResidents(planets[0].residents);
      // }

      fetchPlanets();
      fetchSpacecraft();
      fetchSpecies();
      // findResidents();
      setLoading(false);

    }, [])

    console.log("planets: ", planets);
    console.log("spacecraft: ", spacecraft);
    console.log("species: ", species);
    console.log("residents: ", planetResidents);
    console.log("start: ", startValue);
    console.log("end: ", endValue);

    //display if API cannot be fetched for some reason
    if (loading) return <div> <h1> Please wait some time.... </h1> </div>;

    return(
      <div>
        <h1>Star Tours!</h1>
        <p>Welcome to Star Tours! Here, you can book a trip anywhere across the galaxy. Travel to Coruscant in the Millennium Falcon, or to Tatooine in the Executor. Star 
        Tours has a wide range of various available spacecrafts and destinations. The galaxy is yours for the taking! <br /> May the force be with you. </p>
        <br />

        <p>Please enter your name: </p>
        <input onChange={event => setPassengerName(event.target.value)}></input>

        <p>Please choose your species: </p>
        {species.map((species, i) => {
            return (
            <button key={i} name='species' value={species.name} onClick={() => setSelectedSpecies(species.name)}> {species.name} </button>
        )
        })}

        <p>Please choose your departure planet: </p>
        {planets.map((planet, i) => {
            return (
            <button key={i} name='planet' value={planet.name} onClick={() => setSelectedDepartPlanet(planet.name)}> {planet.name} </button>
        )
        })}

        <p>Please choose your destination planet: </p>
        {planets.map((planet, i) => {
            return (
            <button key={i} name='planet' id='destPlanet' value={planet.name} onClick={() => setSelectedDestPlanet(planet.name)}> {planet.name} </button>
        )
        })}

        <p>Please choose from the available spacecraft: <br /><span id='chooseNewShip'>*You cannot choose military spacecraft.</span></p>
        {spacecraft.map((spacecraft, i) => {
           if(spacecraft.name !== "Death Star"){
            return (
              <button key={i} name='spacecraft' value={spacecraft.name} onClick={() => setSelectedSpacecraft(spacecraft.name)}> {spacecraft.name} </button>
            )
           } else {
             return <button disabled key={i} name='spacecraft' value={spacecraft.name} onClick={() => setSelectedSpacecraft(spacecraft.name)}> {spacecraft.name} </button>
           }       
        })}

        <p>One-way or round-trip?</p>
        <button id='trip-type' value="One-way" onClick={() => setSelectedTripType("one-way")}> One-way </button>
        <button id='trip-type' value="Round-trip" onClick={() => setSelectedTripType("round")}> Round-trip </button>    

        <p>Please choose a start-date: </p>  
        <div className='calendar'>
          <Calendar onChange={onStartChange} value={startValue} />
        </div>
        
        <p>Please choose an end-date: </p>
        <div className='calendar'>
          <Calendar onChange={onEndChange} value={endValue} />
        </div>

        <h3>Trip Summary: </h3>

        <p>You've input {passengerName} as your name. </p>
        <p>You've selected {selectedSpecies} as your species. </p>
        <p>You've selected {selectedDepartPlanet} as your departure planet. </p>
        <p>You've selected {selectedDestPlanet} as your destination planet. </p>  
        <p>You've selected the {selectedSpacecraft} as your spacecraft. </p>
        <p>You've selected a {selectedTripType} trip. </p>

        {/* <p>The residents in {selectedDestPlanet} are {planetResidents}</p> */}

        <p>You've chosen "{startValue.toDateString()}" as your start-date and "{endValue.toDateString()}" as your end-date.</p>
        
      </div>
    )


}

export default App;
