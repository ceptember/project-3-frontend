import React from 'react'
import {useState, useEffect} from 'react'

function Search({testActivities, allFilterResults, onSearchFilterChange, onShowResults, onHideResults}){

    const [checkedState, setCheckedState] = useState(new Array(testActivities.length).fill(false));
    const [us_state, setUsState] = useState("")
    const [parkSearched, setParkSearched] = useState("");
    const [filterBtnVis, setFilterBtnVis] = useState("hidden")
    const [filterContainerDis, setFilterContainerDis] = useState("block")
    const [searchClass, setSearchClass] = useState("search_normal")

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

      function showResults(){
        setFilterBtnVis("visible");
        setFilterContainerDis("none");
        setSearchClass("search_hidden")
        onShowResults(); 
      }

      function showFilters(){
        setFilterContainerDis("block");
        setFilterBtnVis("hidden")
        setSearchClass("search_normal"); 
        onHideResults(); 
      }


    return (
        <div id="search" className={searchClass}>
          <div id="filters_container" style={{display: filterContainerDis}}>
            <h1> Search </h1>

            <form>
            <label for="name_input">Park Name </label>
            <input id="name_input" type="text"  value={parkSearched} onChange={ searchParks }></input>
            <br />
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

    <button id="showResultsButton" onClick={showResults}> Show Results </button>

        </div>

        <button style={{visibility: filterBtnVis}} onClick={showFilters}>Filter</button>
  </div>

    )
}

export default Search