import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar';

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

    const [fillingOut, setFillingOut] = useState(true);

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
    // if (loading) return <div> <h1> Please wait some time.... </h1> </div>;

    return(
      <div className='hero'>
        <h1 className='logo'>Star Tours!</h1>
        <p className='white intro'>Welcome to Star Tours! Here, you can book a trip anywhere across the galaxy. Travel to Coruscant in the Millennium Falcon, or to Tatooine in the Executor. Star 
        Tours has a wide range of various available spacecrafts and destinations. The galaxy is yours for the taking! <br /> May the force be with you. </p>
        <br />

        <div className='page'>
        <p className='white'>Please enter your name: </p>
        <input onChange={event => setPassengerName(event.target.value)}></input>

        <p className='white'>Please choose your species: </p>
        {species.map((species, i) => {
            return (
            <button key={i} name='species' value={species.name} onClick={() => setSelectedSpecies(species.name)}> {species.name} </button>
        )
        })}

        <p className='white'>Please choose your departure planet: </p>
        {planets.map((planet, i) => {
            return (
            <button key={i} name='planet' value={planet.name} onClick={() => setSelectedDepartPlanet(planet.name)}> {planet.name} </button>
        )
        })}

        <p className='white'>Please choose your destination planet: </p>
        {planets.map((planet, i) => {
            return (
            <button key={i} name='planet' id='destPlanet' value={planet.name} onClick={() => setSelectedDestPlanet(planet.name)}> {planet.name} </button>
        )
        })}

        <p className='white'>Please choose from the available spacecraft: <br /><span id='chooseNewShip'>*You cannot choose military spacecraft.</span></p>
        {spacecraft.map((spacecraft, i) => {
           if(spacecraft.name !== "Death Star"){
            return (
              <button key={i} name='spacecraft' value={spacecraft.name} onClick={() => setSelectedSpacecraft(spacecraft.name)}> {spacecraft.name} </button>
            )
           } else {
             return <button disabled key={i} name='spacecraft' value={spacecraft.name} onClick={() => setSelectedSpacecraft(spacecraft.name)}> {spacecraft.name} </button>
           }       
        })}

        <p className='white'>One-way or round-trip?</p>
        <button id='trip-type' value="One-way" onClick={() => setSelectedTripType("one-way")}> One-way </button>
        <button id='trip-type' value="Round-trip" onClick={() => setSelectedTripType("round")}> Round-trip </button>    

        {selectedTripType == "one-way" &&
          <div>
            <p className='white'>Please choose a start-date: </p>
            <div className='calendar'>
              <Calendar onChange={onStartChange} value={startValue} />
            </div>  
          </div>
        }

        {selectedTripType == "round" &&
          <div>
            <p className='white'>Please choose a start-date: </p>
            <div className='calendar'>
              <Calendar onChange={onStartChange} value={startValue} />
            </div>  
            <p className='white'>Please choose an end-date: </p>
            <div className='calendar'>
              <Calendar onChange={onEndChange} value={endValue} />
            </div>
          </div>
        }

        <br /><br/>

        <button className='doneButton' onClick={() => setFillingOut(false)} >Show Summary</button>

        <br/><br/>

        <div>
            {fillingOut == false &&
            <div className='white shadow'>
              <h2 className='white'>Trip Summary: </h2>
              <p>Passenger name: {passengerName} </p>
              <p>Selected species: {selectedSpecies} </p>
              <p>Departing planet: {selectedDepartPlanet} </p>
              <p>Destination planet: {selectedDestPlanet} </p>  
              <p>Selected spacecraft: {selectedSpacecraft} </p>
              <p>Trip type: {selectedTripType} trip. </p>

              {selectedTripType == "one-way" &&
                <p>Start Date: "{startValue.toDateString()}" </p>
              }
    
              {selectedTripType == "round" &&
                <div>
                  <p>Start Date: "{startValue.toDateString()}" </p>
                  <p>End Date: "{endValue.toDateString()}" </p>
                </div>
              }
              {/* <p>You've chosen "{startValue.toDateString()}" as your start-date and "{endValue.toDateString()}" as your end-date.</p> */}
              <span id='chooseNewShip'>*Blank spaces mean you did not fill out a question.</span>
              <br /><br />
              <button className='doneButton' onClick={() => setFillingOut(true)} >Close Summary</button>
              <br/><br/>
            </div>
            }
        </div>

        </div>

        <br/><br/><br/><br/>

      </div>
    )


}

export default App;
