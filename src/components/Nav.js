import React from 'react'

export default function Nav() {
  return (
    <div>
        <h1>Star Tours!</h1>
        <p>Welcome to Star Tours! Here, you can book a trip anywhere across the galaxy. Travel to Coruscant in the Millennium Falcon, or to Tatooine in the Executor. Star 
        Tours has a wide range of various available spacecrafts and destinations. The galaxy is yours for the taking! <br /> May the force be with you. </p>
        <br />

        <p>Please choose your destination planet: </p>
        <select>
            <option value="1" disabled selected> Choose </option>
            <option name='planets'></option>
        </select>

        <p>Please choose your departure planet: </p>
        <select>
            <option value="1" disabled selected> Choose </option>
            <option name='planets'></option>
        </select>

        <p>One-way or round-trip?</p>
        <select>
            <option value="1" disabled selected> Choose </option>
            <option id='trip-type' value="One-way"> One-way </option>
            <option id='trip-type' value="Round-trip"> Round-trip </option>      
        </select>

        <p>Please choose from the available spacecraft: </p>
        <select>
            <option value="1" disabled selected> Choose </option>
            <option name='spacecraft'></option>
        </select>

        <p>Please choose your species: </p>
        <select>
            <option value="1" disabled selected> Choose </option>
            <option name='species'></option>
        </select>

        <p>Please enter your name: </p>

        
    </div>
  )
}
