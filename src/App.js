import './App.css';
import {useState, useEffect} from "react"
import Search from './Search';

function App() {

  // Delete this after I get the real ones 
  const testActivities = ["Astronomy", "Picnicking", "Fishing", "Museum Exhibits"]

  // These are from the form inputs -- move to component 
  const [checkedState, setCheckedState] = useState(new Array(testActivities.length).fill(false));
  const [us_state, setUsState] = useState("")
  const [parkSearched, setParkSearched] = useState("");

  // Combined search results -- keep in this component 
  const [allFilterResults, setAllFilterResults] = useState([])

  // string for searching passed up from Search
  const [searchString, setSearchString] = useState("")

  function handleSearch (activ, name, loc ) {
    let checkedActivities = testActivities.filter( (item, index) => activ[index]);
    let activitiesString = "&A=" + checkedActivities.join(",");
    let nameString = "&N=" + name;
    let locationString = "&S=" + loc;  
    setSearchString(nameString + locationString + activitiesString )
  };

  // KEEP THIS HERE AS-IS
  useEffect( () => {
    fetch("http://localhost:9292/parks/search/"+searchString)
      .then((r) => r.json())
      .then((data) => {
        setAllFilterResults(data)   
      });
  }, [searchString]);


  //******************** */

  // Handling the filters onChange (name, state, activities)

  // moving to search component
  function searchParks(e){
    setParkSearched(e.target.value)
  }

    // moving to search component

  function handleCheckboxChange(position) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  // moving to search component
  function handleLocationChange(e){
    setUsState(e.target.value)
  }

  return (
    <div className="App">
      <Search testActivities={testActivities} allFilterResults={allFilterResults} onSearchFilterChange={handleSearch} />

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

 /* ********************

APP
|
|-- Search Page
    |-- Search sidebar
    |-- Results list
|-- Park page
    |-- Park info 
    |-- Reviews list
    |-- Add a review form 

 **********************/