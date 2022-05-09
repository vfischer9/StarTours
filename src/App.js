import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import Alderaan from './components/planets/alderaan.webp';
import Bespin from './components/planets/bespin.webp';
import Coruscant from './components/planets/Coruscant.webp';
import Dagobah from './components/planets/dagobah.webp';
import Endor from './components/planets/endor.webp';
import Hoth from './components/planets/hoth.webp';
import Kamino from './components/planets/kamino.webp';
import Naboo from './components/planets/naboo.webp';
import Tatooine from './components/planets/tatooine.webp';
import YavinIV from './components/planets/yavin iv.webp';

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

    const [planetResidents, setPlanetResidents] = useState([]);

    const [startValue, onStartChange] = useState(new Date());
    const [endValue, onEndChange] = useState(new Date());

    const [fillingOut, setFillingOut] = useState(true);

    const [departImage, setDepartImage] = useState();
    const [destImage, setDestImage] = useState();

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

      fetchPlanets();
      fetchSpacecraft();
      fetchSpecies();
      setLoading(false);
    }, [])

    //use planets API to access residents, use people API to find species, use species API to find name of species.
    async function fetchResidents(key, planet){

      setSelectedDestPlanet(planet);

      if(planet === "Tatooine"){
        setDestImage(Tatooine);
      } else if(planet === "Alderaan"){
        setDestImage(Alderaan);
      } else if(planet === "Yavin IV"){
        setDestImage(YavinIV);
      } else if(planet === "Hoth"){
        setDestImage(Hoth);
      } else if(planet === "Dagobah"){
        setDestImage(Dagobah);
      } else if(planet === "Bespin"){
        setDestImage(Bespin);
      } else if(planet === "Endor"){
        setDestImage(Endor);
      } else if(planet === "Naboo"){
        setDestImage(Naboo);
      } else if(planet === "Coruscant"){
        setDestImage(Coruscant);
      } else if(planet === "Kamino"){
        setDestImage(Kamino);
      }

      //logic to fetch planet residents
      let planetsAPIres = await fetch('https://swapi.dev/api/planets/?format=json');
      let dataPlanets = await planetsAPIres.json();
      let planetsToResidents = dataPlanets.results[key].residents;
      console.log('Planet api to Residents: ', planetsToResidents);

      let residentsAPIres = await fetch('https://swapi.dev/api/people/?format=json');
      let dataResidents = await residentsAPIres.json();
      let residentsToSpecies = [];
      for(let i = 0; i < planetsToResidents.length; i++){
        if(planetsToResidents.length > 0){
          residentsToSpecies.push(dataResidents.results[i]);  //push dataResidents.results[i] to residentsToSpecies
        } else {
          console.log('No residents on this planet. ');
        } 
      }
      console.log('Resident api to Species: ', residentsToSpecies);

      let speciesAPIres = await fetch('https://swapi.dev/api/species/?format=json');
      let dataSpecies = await speciesAPIres.json();
      let speciesToHTML = [];
      for(let i = 0; i < residentsToSpecies.length; i++){
        if(residentsToSpecies.length > 0){
          speciesToHTML.push(dataSpecies.results[i].name);  //push dataSpecies.results[i].name to speciesToHTML
        } else {
          console.log('No residents on this planet. ');
        }
      }
      console.log('Species api: ', speciesToHTML);

      setPlanetResidents(speciesToHTML);


      //logic to check if selected passenger species is on the planet
      let count = 0;
      for(let i=0; i < speciesToHTML.length; i++){
        if(speciesToHTML[i] === selectedSpecies){
          count++;
        } 
      }

      if(count > 0){
        console.log('Planet has matching residents. ');
      } else {
        alert('Your species does not reside here... Please choose another planet. ');
        console.log('Planet does not have matching residents. ');
        setSelectedDestPlanet("__");
      }
      
      //for of loop iteration attempt:
      // for (let i of speciesToHTML) {
      //   if (speciesToHTML[i] === selectedSpecies) {
      //       console.log('Match!');
      //       break;
      //   }
      // }
    }

    //get depart planet image <<HARDCODED>>
    async function fetchDepartPlanet(planet){
      setSelectedDepartPlanet(planet);

      if(planet === "Tatooine"){
        setDepartImage(Tatooine);
      } else if(planet === "Alderaan"){
        setDepartImage(Alderaan);
      } else if(planet === "Yavin IV"){
        setDepartImage(YavinIV);
      } else if(planet === "Hoth"){
        setDepartImage(Hoth);
      } else if(planet === "Dagobah"){
        setDepartImage(Dagobah);
      } else if(planet === "Bespin"){
        setDepartImage(Bespin);
      } else if(planet === "Endor"){
        setDepartImage(Endor);
      } else if(planet === "Naboo"){
        setDepartImage(Naboo);
      } else if(planet === "Coruscant"){
        setDepartImage(Coruscant);
      } else if(planet === "Kamino"){
        setDepartImage(Kamino);
      } 
    }

    console.log("planets: ", planets);
    console.log("spacecraft: ", spacecraft);
    console.log("species: ", species);
    console.log("start: ", startValue);
    console.log("end: ", endValue);
    console.log("end: ", endValue);
    console.log("residents: ", planetResidents);

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
        <input onChange={event => setPassengerName(event.target.value)} placeholder='Obi Wan Kenobi'></input>
        <p className='yellow'>------------------------------------------------------------------------------------</p>

        <p className='white'>Please choose your species: </p>
        {species.map((species, i) => {
            return (
            <button key={i} name='species' value={species.name} onClick={() => setSelectedSpecies(species.name)}> {species.name} </button>
        )
        })}
        <p className='yellow'>{selectedSpecies}</p>
        <p className='yellow'>------------------------------------------------------------------------------------</p>

        <p className='white'>Please choose your departure planet: </p>
        {planets.map((planet, i) => {
            return (
            <button key={i} name='planet' value={selectedDepartPlanet} onClick={() => fetchDepartPlanet(planet.name)}> {planet.name} </button>
        )
        })}
        <p className='yellow'>{selectedDepartPlanet}</p>
        <p className='yellow'>------------------------------------------------------------------------------------</p>

        <p className='white'>Please choose your destination planet: </p>
        {planets.map((planet, i) => {
            return (
            <button key={i} name='planet' id='destPlanet' value={selectedDestPlanet} onClick={() => fetchResidents(i, planet.name)}> {planet.name} </button>
        )
        })}
        <p className='yellow'>{selectedDestPlanet}</p>
        <p id='planetResident' className='white'>Planet residents: </p>

        <br/>
        {planetResidents.map((resident, i) => {
            return (
            <p key={i} name='resident' id='planetResident' className='white'> | {resident} | </p>
        )
        })}

        <p className='yellow'>------------------------------------------------------------------------------------</p>
        

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
        <p className='yellow'>{selectedSpacecraft}</p>

        <p className='yellow'>------------------------------------------------------------------------------------</p>

        <p className='white'>One-way or round-trip?</p>
        <button id='trip-type' value="One-way" onClick={() => setSelectedTripType("one-way")}> One-way </button>
        <button id='trip-type' value="Round-trip" onClick={() => setSelectedTripType("round")}> Round-trip </button>    
        <p className='yellow'>{selectedTripType}</p>

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
            <br/>

            {startValue.getDate() > endValue.getDate() &&
              <div id='chooseNewShip'>*Conflicting start/end dates! Please check that start-date isn't before end-date.</div>
            }
          </div>
        }

      <p className='yellow'>------------------------------------------------------------------------------------</p>

        <br/><br/>

        {fillingOut == true &&
          <button className='doneButton' onClick={() => setFillingOut(false)} >Show Summary</button>
        }

        <br/><br/>

        <div>
            {fillingOut == false &&
            <div className='white shadow'>
              <h2 className='white'>Trip Summary: </h2>
              <p>Passenger name: {passengerName} </p>
              <p>Selected species: {selectedSpecies} </p>
              <p>Departing planet: {selectedDepartPlanet} </p>
              <img src={departImage}></img>
              <p>Destination planet: {selectedDestPlanet} </p> 
              <img src={destImage}></img> 
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
