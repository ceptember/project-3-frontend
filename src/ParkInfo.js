import React from "react";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Review from "./Review";

function ParkInfo({p}){

    const [reviews, setReviews] = useState([]);
    const [reviewTextArea, setReviewTextArea] = useState("")

    useEffect( ()=>{
        fetch("http://localhost:9292/parks/"+p.id+"/reviews")
        .then((r) => r.json())
        .then((data) => {setReviews(data)})
    },[])

    function handleSubmit(e){
        e.preventDefault()

        let reviewObj = {
            park_id: p.id,
            user_id: 1,
            likes: 0,
            review_text: reviewTextArea
        }

        fetch("http://localhost:9292/reviews",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewObj),
          })
          .then( (r) => r.json() )
          .then( (data) => {
              setReviews([...reviews, data])})

        setReviewTextArea("")
    }

    function handleChange(e){
        setReviewTextArea(e.target.value)
      }

    return(
        <div>
            <Link className='link' to={"/"}>BACK</Link>
            <h1>{p.name}</h1>
            {p.id}
            <a href = {p.url} target="_blank">more info ↗</a>
            <ul>
               { reviews.map( (r) => <Review review={r} /> ) }
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