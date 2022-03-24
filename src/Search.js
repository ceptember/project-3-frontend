import React from 'react'
import {useState, useEffect} from 'react'

function Search({testActivities, allFilterResults, onSearchFilterChange}){

    const [checkedState, setCheckedState] = useState(new Array(testActivities.length).fill(false));
    const [us_state, setUsState] = useState("")
    const [parkSearched, setParkSearched] = useState("");

    useEffect( ()=>{
        onSearchFilterChange(checkedState, parkSearched, us_state)
    }, [us_state, parkSearched, checkedState])

    function searchParks(e){
        setParkSearched(e.target.value)
      }

    function handleLocationChange(e){
        setUsState(e.target.value)
      }

      function handleCheckboxChange(position) {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
      };

    return (
        <div>
            <h1> FROM SEARCH COMPONENT</h1>

            <h1> Search </h1>

            <form>
            <label for="name_input">Park Name </label>
                <input id="name_input" type="text"  placeholder="search by park name" value={parkSearched} onChange={ searchParks }></input>
                <label for="state_input">State </label>
                <input id="state_input" type="text" value={us_state} onChange={handleLocationChange} maxlength="2"></input>
            </form>    

            <h4>Activities:</h4>
      <ul className="activities">
      {testActivities.map(( name , index) => {
        return (
          <li key={index}>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
          </li>
        );
      })}
    </ul>


        </div>
    )
}

export default Search