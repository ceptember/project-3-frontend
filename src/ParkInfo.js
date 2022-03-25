import React from "react";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";


function ParkInfo({p}){

    const [reviews, setReviews] = useState([]);
    const [reviewTextArea, setReviewTextArea] = useState("moo")
    const [test, setTest] = useState("");

    useEffect( ()=>{
        fetch("http://localhost:9292/parks/"+p.id+"/reviews")
        .then((r) => r.json())
        .then((data) => {setReviews(data)})
    },[]
    )

    function handleSubmit(e){
        e.preventDefault()
    }

    function handleTextAreaChange(e){
        setReviewTextArea(e.target.value)
    }

    function handleChange(e){
        setReviewTextArea(e.target.value)
      }

    return(
        <div>
            <Link className='link' to={"/"}>BACK</Link>
            <h1>{p.name}</h1>
            <a href = {p.url} target="_blank">more info ↗</a>
            <ul>
               { reviews.map( (r) => <li>{r.review_text}</li>) }
            </ul>

            <br />

            <div id="comment-form">
                <h4>Submit a Review</h4>
                <form onSubmit={handleSubmit} >
                    <textarea class="review-textarea" value={reviewTextArea} onChange={handleChange} ></textarea>
                    <br />
                    <input type="submit"></input>
                </form >
                {reviewTextArea}

            </div>
        </div>
    )
}

export default ParkInfo