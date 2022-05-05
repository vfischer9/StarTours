import React, { Component, useState } from 'react';

export default class Home extends Component {

    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
            planets: [],
            selectedPlanet: "",
            tripType: "",
            passengerName: "",
            passengerSpecies: "",
            departurePlanet: "",
            starships: [],
            selectedStarship: "",
            species:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTripChange = this.handleTripChange.bind(this);
        this.handlePlanetChange = this.handlePlanetChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);  
        this.handleSpeciesChange = this.handleSpeciesChange.bind(this); 
        this.handleDepartureChange = this.handleDepartureChange.bind(this); 
        this.handleStarshipChange = this.handleStarshipChange.bind(this); 
    }

    //handle changes and update states

    handleChange(e) {
        console.log("Handle Change: ", e.target.value);
      }

      handleTripChange(type) {
        this.setState({ 
            tripType: type.target.value 
          }, 
          () => console.log("Trip type: ", this.state.tripType),
        )
      }

      handlePlanetChange = (planet) => {
        this.setState({ 
            selectedPlanet: planet.target.value 
          }, 
          () => console.log("Destination Planet: ", this.state.selectedPlanet),
        )
        this.createResidentsList();
      }

      handleNameChange(name) {
        this.setState({ 
            passengerName: name.target.value
          }, 
          () => console.log("Passenger Name: ", this.state.passengerName)
        )
      }

      handleSpeciesChange(species) {
        this.setState({ 
            passengerSpecies: species.target.value
          }, 
          () => console.log("Passenger Species: ", this.state.passengerSpecies)
        )
      }

      handleDepartureChange = (planet) => {
        this.setState({ 
            departurePlanet: planet.target.value 
          }, 
          () => console.log("Departure Planet: ", this.state.departurePlanet),
        )
      }

      handleStarshipChange = (starship) => {
        this.setState({ 
            selectedStarship: starship.target.value 
          }, 
          () => console.log("Starship: ", this.state.selectedStarship),
        )
      }
      

      //create array of residents of a chosen planet
      createResidentsList(){
        let planetsList = this.state.planets;

        let resList = new Map(
            planetsList.map(planetsList => {
              return [planetsList.residents];
            }),
          );
        console.log(resList);


    }


    //Fetch the planets
    fetchPlanets(){
    fetch("https://swapi.dev/api/planets/")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                planets: json.results,
                DataisLoaded: true
            });
        })
    }

    //Fetch available spacecraft
    fetchSpacecraft(){
        fetch("https://swapi.dev/api/starships/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    starships: json.results,
                    DataisLoaded: true
                });
            })
        }

        //Fetch species
        fetchSpecies(){
        fetch("https://swapi.dev/api/species/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    species: json.results,
                    DataisLoaded: true
                });
            })
        }

    //Fetch the API
    componentDidMount() {
        fetch("https://swapi.dev/api/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
            this.fetchPlanets();
            this.fetchSpacecraft();
            this.fetchSpecies();
        }

        componentDidUpdate(){
            let pTag = document.getElementById('chooseNewShip');
            let pTag2 = document.getElementById('chooseNewPlanet');

            if(this.state.selectedStarship == "Death Star"){
                alert('Cannot pick a military spacecraft. Please choose another option. ');
                pTag.innerText = '*Please choose a different spacecraft.'
            } else if (this.state.selectedStarship != "Death Star"){
                pTag.innerText = " ";
            }   
        }


  render() {

    const { DataisLoaded, items, planets, starships, species } = this.state;

    //display if API cannot be fetched for some reason
    if (!DataisLoaded) return <div>
        <h1> Please wait some time.... </h1> </div>;

    //api test data
    console.log(items);
    console.log(planets);
    console.log(starships);
    console.log(species);

        
    return (
        <div>
            <h1>Star Tours!</h1>
            <p>Welcome to Star Tours! Here, you can book a trip anywhere across the galaxy. Travel to Coruscant in the Millennium Falcon, or to Tatooine in the Executor. Star 
                Tours has a wide range of various available spacecrafts and destinations. The galaxy is yours for the taking! <br /> May the force be with you. </p>
                
                <br />
                <p>Please enter your name: </p>
                    <input id='input' type="text" value={this.state.passengerName} onChange={this.handleNameChange} />
                    <br />
                    <p>Please choose your species: </p>
                    <select onChange={this.handleSpeciesChange}>
                    <option value="1" disabled selected> Choose </option>
                    {species.map(species => {
                        return (
                            <option value={species.name} id='speciesName'> {species.name} </option>
                        )
                    })}
                </select>


                <p>Please choose a destination planet: </p>
                <p id='chooseNewPlanet'></p>
                <select onChange={this.handlePlanetChange}>
                    <option value="1" disabled selected> Choose </option>
                    {planets.map(planets => {
                        return (
                            <option value={planets.name} id='planetName'> {planets.name} </option>
                        )
                    })}
                </select>

                <p>Please choose your departure planet: </p>
                <select onChange={this.handleDepartureChange}>
                    <option value="1" disabled selected> Choose </option>
                    {planets.map(planets => {
                        return (
                            <option value={planets.name} id='planetName'> {planets.name} </option>
                        )
                    })}
                </select>

                <p>One-way or round-trip?</p>
                <select onChange={this.handleTripChange}>
                    <option value="1" disabled selected> Choose </option>
                    <option id='trip-type' value={"One-way"}> One-way </option>
                    <option id='trip-type' value={"Round-trip"}> Round-trip </option>      
                </select>

                <p>Choose from the available spacecraft: </p>
                <p id='chooseNewShip'></p>
                <select onChange={this.handleStarshipChange}>
                    <option id='disabledValue' value="1" disabled selected> Choose </option>
                    {starships.map(starships => {
                        return (
                            <option value={starships.name} id='starshipName'> {starships.name} </option>
                        )
                    })}
                </select>
        
        </div>
    )
  }
}
