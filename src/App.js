import './App.css';
import {useState, useEffect} from "react"

function App() {

  // Delete this after I get the real ones 
  const testActivities = ["Astronomy", "Picnicking", "Fishing", "Museum Exhibits"]

  // These are from the form inputs 
  const [checkedState, setCheckedState] = useState(new Array(testActivities.length).fill(false));
  const [us_state, setUsState] = useState("")
  const [parkSearched, setParkSearched] = useState("");

  // Combined search results 
  const [allFilterResults, setAllFilterResults] = useState([])
 
  // THIS IS THE COMBINED SEARCH:
  useEffect( () => {
    let checkedActivities = testActivities.filter( (item, index) => checkedState[index]);

    let nameString = "&N=" + parkSearched;
    let locationString = "&S=" + us_state;
    let activitiesString = "&A=" + checkedActivities.join(",");
    let searchString = nameString + locationString + activitiesString
    fetch("http://localhost:9292/parks/search/"+searchString)
      .then((r) => r.json())
      .then((data) => {
        setAllFilterResults(data)   
      });
  }, [us_state, parkSearched, checkedState ]);

  // Handling the filters onChange (name, state, activities)
  function searchParks(e){
    setParkSearched(e.target.value)
  }

  function handleCheckboxChange(position) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  function handleLocationChange(e){
    setUsState(e.target.value)
  }

  return (
    <div className="App">
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

      <h2> RESULTS: </h2>
        <ul>
          {allFilterResults.map( (result) => <li>{result.name} <br /> <a href={result.url}>See more</a><br /><br /></li>)}

        </ul>

      <h1> 4. Fetch all comments for a park </h1>
      <h1> 5. Add a comment on a park</h1>
      <h1> 6. Delete a comment on a park</h1>
      <h1> 7. Edit a comment on a park</h1>

    </div>
  );
}

export default App;





 