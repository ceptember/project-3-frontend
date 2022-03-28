import './App.css';
import {useState, useEffect} from "react"
import { BrowserRouter, Route } from "react-router-dom";
import { Link} from "react-router-dom";

import Search from './Search';
import Test from './Test';
import Results from './Results';
import Header from './Header';
import Footer from './Footer';
import ParkInfo from './ParkInfo';

function App() {

  let arr = [{id:1, name: "TEST 1"}, {id: 2, name: "TEST 2"}]   



  const testActivities = ["Astronomy", "Birdwatching", "Camping","RV Camping","Fishing","Fly Fishing","Swimming","Kayaking", "Boat Tour","Guided Tours","Hiking","Mountain Biking","Horseback Riding","Skiing","Snowmobiling","Gift Shop and Souvenirs", "Junior Ranger Program","Museum Exhibits" ]
  const [allParks, setAllParks] = useState([])
  const [allFilterResults, setAllFilterResults] = useState([])
  const [searchString, setSearchString] = useState("")
  const [resultsDisplay, setResultsDisplay] = useState("block")

  useEffect( () => {
    fetch("http://localhost:9292/parks")
      .then((r) => r.json())
      .then((data) => {
        setAllParks(data)   
      });
  }, []);

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


  // Show and hide results

  function showResults(){
    setResultsDisplay("block")
  }

  function hideResults(){
    setResultsDisplay("none")
  }


  return (
    <div className="App">
      <Header />

      {/* The search page is the index page for now, might add a Home page later */}
      <Route exact path="/">
        <div id="search_page_container">
          <Search testActivities={testActivities} allFilterResults={allFilterResults} onSearchFilterChange={handleSearch} onShowResults={showResults} onHideResults={hideResults}/>
          <Results allFilterResults={allFilterResults} resultsDisplay={resultsDisplay}/>
        </div>
      </Route>

      
      
      {
       allParks.map((p)=> {return(
                   <Route path={"/parkinfo/"+p.id} key={p.id} > 
                     <ParkInfo p={p} />
                   </Route>
         )})}




      <Footer />


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