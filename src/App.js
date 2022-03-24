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
      <Header />

      {/* The search page is the index page for now, might add a Home page later */}
      <Route exact path="/">
        <Search testActivities={testActivities} allFilterResults={allFilterResults} onSearchFilterChange={handleSearch} />
        <Results allFilterResults={allFilterResults}/>
      </Route>

      <Route path="/test">
        <Test />
      </Route>

      {/* <Route path={"/parkinfo/"+id}>
        <ParkInfo parkID={id}/>
      </Route> */}

      
      {/* {
      arr.map((p)=> {return(
        <Route path={"/parkinfo/"+p.id} key={p.id} >
          <ParkInfo p={p} />
        </Route>
      )})} */}
      
      
      {
       // THIS WORKS WHEN YOU GO THROUGH <Link /> BUT NOT WHEN YOU TYPE IT DIRECTLY 
       allFilterResults.map((p)=> {return(
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