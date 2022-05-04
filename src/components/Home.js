import React, { Component } from 'react'

export default class Home extends Component {

    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
            planets: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.value)
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
        }


  render() {

    const { DataisLoaded, items, planets } = this.state;
    if (!DataisLoaded) return <div>
        <h1> Please wait some time.... </h1> </div>;

    console.log(items);
    console.log(planets);
        
    return (
        <div>
            <h1>Star Tours!</h1>
            <p>Welcome to Star Tours! Here, you can book a trip anywhere across the galaxy. Travel to Coruscant in the Millennium Falcon, or to Tatooine in the Executor. Star 
                Tours has a wide range of various available spacecrafts and destinations. The galaxy is yours for the taking! <br /> May the force be with you. </p>

                <p>Please choose a destination planet: </p>
                <select onChange={this.handleChange}>
                    <option value="1" disabled selected> Choose </option>
                    {planets.map(planets => {
                        return (
                            <option value={planets.name}> {planets.name} </option>
                        )
                    })}
                </select>



        </div>
    )
  }
}
