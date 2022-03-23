import './App.css';
import {useState, useEffect} from "react"

function App() {

  // Delete this after I get the real ones 
  const testActivities = ["Astronomy", "Picnicking", "Fishing", "Museum Exhibits"]

  // Check these to see what I'm actually using 
  const [parks, setParks] = useState([]); 
  const [searchResults, setSearchResults] = useState([])
  const [examplePark, setExamplePark] = useState("")

  // These are from the form inputs, I actually need these. Maybe give them consistent names 
  const [checkedState, setCheckedState] = useState(new Array(testActivities.length).fill(false));
  const [us_state, setUsState] = useState("")
  const [parkSearched, setParkSearched] = useState("");

  // Delete these after 
  const [filterResults, setFilterResults] = useState([])
  const [stateFilterResults, setStateFilterResults] = useState([])

  // This is the combined one 
  const [allFilterResults, setAllFilterResults] = useState([])

  // Delete after this functions in combined search
  useEffect( () => {
      fetch("http://localhost:9292/parks")
        .then((r) => r.json())
        .then((data) => {
          setParks(data)
          setExamplePark(data[0].name)
        });
        }, []);
   
  // Delete after this functions in combined search      
  useEffect( () => {
    let locationString = us_state;
    fetch("http://localhost:9292/parks/state/"+locationString)
      .then((r) => r.json())
      .then((data) => {
        setStateFilterResults(data)   
      });
  }, [us_state]);

  // Delete after this functions in combined search
  useEffect( () => {
    let checkedActivities = testActivities.filter( (item, index) => checkedState[index]);
    let checkedString = checkedActivities.join(",");
    fetch("http://localhost:9292/parks/filter/"+checkedString)
      .then((r) => r.json())
      .then((data) => {
        setFilterResults(data)   
      });
  }, [checkedState]);

  //****************************
  // THIS IS THE COMBINED SEARCH:

  useEffect( () => {
    let nameString = "&N=" + parkSearched;
    let locationString = "&S=" + us_state;
    let searchString = nameString + locationString
    fetch("http://localhost:9292/parks/search/"+searchString)
      .then((r) => r.json())
      .then((data) => {
        setStateFilterResults(data)   
      });
  }, [us_state]);



  function searchParks(e){
    setParkSearched(e.target.value)
    setSearchResults(parks.filter( (p) => p.name.includes(parkSearched)));
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
      <h1> 0. Fetch all parks </h1>
      <div>{parks.length} total parks including {examplePark}</div>

      <h1> 1. Fetch a park by name searched </h1>
      <form>
        <input type="text"  placeholder="search by park name" value={parkSearched} onChange={ searchParks }></input>
      </form>
      <p>intentionally disabled due to annoying long list, but it works</p>

      <ul>
        {/* {(parks.filter( (p) => p.name.includes(parkSearched))).map( (x) => <li>{x.name}</li>)} */}
      </ul>     

      <h1> 2. Fetch a park by activities </h1>

      <ul className="ugh">
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

    <ul>
    {filterResults.map((f)=> <li>{f}</li>)}

    </ul>

      <h1> 3. Fetch a park by location </h1>
        <form>
          <input type="text" value={us_state} onChange={handleLocationChange}></input>
        </form>

        <ul>
          {stateFilterResults.map( (r) => <li>{r.name}</li>)}
        </ul>
        

      <h2> RESULTS FOR ALL OF THE ABOVE: </h2>
        goddess help me
        <ul>
          {allFilterResults.map( (result) => <li>{result.name}</li>)}

        </ul>

      <h1> 4. Fetch all comments for a park </h1>
      <h1> 5. Add a comment on a park</h1>
      <h1> 6. Delete a comment on a park</h1>
      <h1> 7. Edit a comment on a park</h1>

    </div>
  );
}

export default App;





 