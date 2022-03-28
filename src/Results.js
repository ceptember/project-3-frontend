import React from "react";
import { Link} from "react-router-dom";


function Results ({allFilterResults, resultsDisplay}){

    return (
        <div id="results" style={{display: resultsDisplay}}>
            <h1>Explore the Parks</h1>
            <ul id="results_ul">
                {allFilterResults.map( (result) => <li className="park_preview"><h3>{result.name}</h3> <br /> {result.city}, {result.state} <br /> <Link className='park_link' to={"/parkinfo/"+result.id} style={{textDecoration: 'none'}}> More Info </Link><br /><br /></li>)}
            </ul>
        </div>
    )

}

export default Results 