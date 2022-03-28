import React from "react";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Review from "./Review";

function ParkInfo({p}){

    const [activities, setActivities] = useState([]); 
    const [reviews, setReviews] = useState([]);
    const [reviewTextArea, setReviewTextArea] = useState("")
    

    useEffect( ()=>{
        fetch("http://localhost:9292/parks/"+p.id+"/reviews")
        .then((r) => r.json())
        .then((data) => {setReviews(data)})
    },[])

    useEffect( ()=> {
      fetch("http://localhost:9292/parks/"+p.id+"/activities")
      .then((r) => r.json())
      .then((data) => {setActivities(data)})
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
            <h3>{p.city}, {p.state}</h3>
            <h2>About</h2>
            <p class="park_description">{p.description}</p>
            <br />
            <h2>Things to Do</h2>
            <ul >
              {activities.map( (act) => <li key={act.name} style={{marginLeft: '-40px'}}>{act.name}</li>)}
            </ul>
            <h2> More Info</h2>
            <a href = {p.url} target="_blank">Official Park Page ↗</a>

            <h2>Reviews</h2>
            { reviews.map( (r) => <Review review={r} deleteReview={deleteReview} editReview={editReview}/> ) }
            
            <br />

            <div id="comment-form">
                <h2>Submit a Review</h2>
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