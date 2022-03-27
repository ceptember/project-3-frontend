import React from "react";
import { Link} from "react-router-dom";


function Results ({allFilterResults}){

    return (
        <div id="results">
            <h2> RESULTS FROM RESULTS COMPONENT: </h2>
            <ul>
                {allFilterResults.map( (result) => <li>{result.name} <br /> {result.id} <br /> <Link className='link' to={"/parkinfo/"+result.id} > click here </Link><br /><br /></li>)}
            </ul>
        </div>
    )

}

export default Results 