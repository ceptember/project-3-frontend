import React from 'react'; 

function Footer (){
    return(
        <div id="footer"> 
        <p>React.js and Ruby Sinatra demo by <a href="https://ceptember.github.io/project-personal-website/"> <b>Christy Perozzi </b></a></p>
        <p>Published 2022</p>
        <p>Follow Me: &nbsp;  
         <a className = "footer-link" href ="http://www.linkedin.com/in/chrizzi"><i className="fab fa-linkedin"></i> </a>
         <a className = "footer-link" href="https://github.com/ceptember?tab=repositories"><i className="fab fa-github-square"></i></a>
        </p>
        
        
        </div>
    )
    }


export default Footer; 