import './App.css';
import {useState, useEffect} from "react"
import { BrowserRouter, Route } from "react-router-dom";

import Search from './Search';
import Test from './Test';
import Results from './Results';


function App() {

  // NEED TO ADD THE REST OF THEM. 
  const testActivities = ["Astronomy", "Picnicking", "Fishing", "Museum Exhibits"]

  // Combined search results 
  const [allFilterResults, setAllFilterResults] = useState([])

  // string for searching passed up from Search
  const [searchString, setSearchString] = useState("")

  // Processing selections passed up from Search and getting url string ready to fetch
  function handleSearch (activ, name, loc ) {
    let checkedActivities = testActivities.filter( (item, index) => activ[index]);
    let activitiesString = "&A=" + checkedActivities.join(",");
    let nameString = "&N=" + name;
    let locationString = "&S=" + loc;  
    setSearchString(nameString + locationString + activitiesString )
  };

  // Search the DB based on search string 
  useEffect( () => {
    fetch("http://localhost:9292/parks/search/"+searchString)
      .then((r) => r.json())
      .then((data) => {
        setAllFilterResults(data)   
      });
  }, [searchString]);

  return (
    <div className="App">

    <Route path="/test">
       <Test />
    </Route>

    <Route path="/">
      <Search testActivities={testActivities} allFilterResults={allFilterResults} onSearchFilterChange={handleSearch} />
      <Results allFilterResults={allFilterResults}/>
    </Route>


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