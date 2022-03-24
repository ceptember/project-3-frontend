import './App.css';
import {useState, useEffect} from "react"
import Search from './Search';

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
      <Search testActivities={testActivities} allFilterResults={allFilterResults} onSearchFilterChange={handleSearch} />

      <h2> RESULTS: </h2>
        <ul>
          {allFilterResults.map( (result) => <li>{result.name} <br /> <a href={result.url}>See more</a><br /><br /></li>)}
        </ul>
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