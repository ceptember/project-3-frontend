import React from "react";

function Results ({allFilterResults}){

    return (
        <div>
            <h2> RESULTS FROM RESULTS COMPONENT: </h2>
            <ul>
                {allFilterResults.map( (result) => <li>{result.name} <br /> <a href={result.url}>See more</a><br /><br /></li>)}
            </ul>
        </div>
    )

}

export default Results 