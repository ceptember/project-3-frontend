import React from "react";
import { Link} from "react-router-dom";


function Header({user}){
    return(
        <div id="header">
            <Link className='link' to={"/"} style={{textDecoration: 'none'}}><h1>parkfinder</h1></Link><span> a searchable National Park database </span>
            <span style={{float: 'right', paddingRight: '10px', paddingTop: '17px'}}>{"Hello, " + user.name + "!"}</span>
        </div>
    )
}

export default Header