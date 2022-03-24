import React from "react";
import { Link} from "react-router-dom";


function ParkInfo({p}){
    return(
        <div>
            <Link className='link' to={"/"}>BACK</Link>
            <h1>{p.name}</h1>
            <a href = {p.url} target="_blank">more info ↗</a>
        </div>
    )
}

export default ParkInfo