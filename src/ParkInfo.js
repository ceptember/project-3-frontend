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
            user_id: 203, // change this 
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
              let newObj = data
              // Change this eventually 
              newObj.user_name = "Ms_Cleotilde_Wiza"
              setReviews([...reviews, newObj])})

        setReviewTextArea("")
    }

    function handleChange(e){
        setReviewTextArea(e.target.value)
      }

    function deleteReview(url){
        fetch(url,{method: "DELETE"})
          .then( (r) => r.json() )
          .then (data =>  setReviews(reviews.filter( (rev)=> rev.id != data.id) ))
    }

    function editReview(url, reviewObj){
        fetch(url,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
              body: JSON.stringify(reviewObj)
            })
          .then( (r) => r.json() )
          .then (data => { 
            let newObj = data;   
            // Change this eventually 
            newObj.user_name = "Ms_Cleotilde_Wiza"
            setReviews([...reviews.filter( (rev)=> rev.id != data.id), newObj ])
          })
    }

    return(
        <div>
            <Link className='link' to={"/"}>BACK</Link>
            <h1>{p.name}</h1>
            
            <a href = {p.url} target="_blank">more info ↗</a>

            <h4>Reviews</h4>
            { reviews.map( (r) => <Review review={r} deleteReview={deleteReview} editReview={editReview}/> ) }
            
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