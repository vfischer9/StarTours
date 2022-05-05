import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Nav from './components/Nav';
import { Dimmer, Loader } from 'semantic-ui-react';
import Planets from './components/Planets';

function App() {
    const [people, setPeople] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [spacecraft, setSpacecraft] = useState([]);
    const [species, setSpecies] = useState([]);
    const [passengerName, setPassengerName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchPeople(){
        let res = await fetch('https://swapi.dev/api/people/?format=json');
        let data = await res.json();
        setPeople(data.results);
      }

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

      fetchPeople();
      fetchPlanets();
      fetchSpacecraft();
      fetchSpecies();
      setLoading(false);

    }, [])

    console.log("people: ", people);
    console.log("planets: ", planets);
    console.log("spacecraft: ", spacecraft);
    console.log("species: ", species);

    return(
      <div>
        { loading ? (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Nav />
        )
        }
      </div>
    )


}

export default App;
