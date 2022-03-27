import React from "react";
import {useState} from "react";

function Review({review, deleteReview, editReview}){

    const [vis, setVis] = useState("hidden")
    const [textToEdit, setTextToEdit] = useState(review.review_text)


function handleDelete(e){
    let url = "http://localhost:9292/reviews/" + e.target.parentNode.parentNode.id
    deleteReview(url)
}

function handleEdit(e){
    let url = "http://localhost:9292/reviews/" + e.target.parentNode.parentNode.id
    let textArea = e.target.parentNode.parentNode.childNodes[2].childNodes[0]
    console.log(textArea)
    setVis("visible")
}

function handleCancel(e){
    e.preventDefault()
    setVis("hidden")
}

function handleEditSubmit(e){
    e.preventDefault()
    let url = "http://localhost:9292/reviews/" + e.target.parentNode.parentNode.id
    let reviewObj = {review_text: textToEdit }
    editReview(url, reviewObj)
    setVis("hidden")
}

return(
    <div id ={review.id}  >
        {review.user_name} <br />
        {review.review_text}
        {/* CHANGE USER IDEA SITUATION  */}
        {review.user_id == 203 ? <div> <button id="delete" onClick={handleDelete}>Delete</button> <button onClick={handleEdit}>Edit</button></div> : "" }
        <form style={{visibility: vis }}> 
            <textarea value={textToEdit} onChange={(e) => setTextToEdit(e.target.value)}> </textarea>
            <br />
            <button onClick={handleEditSubmit}>submit </button> <button onClick={handleCancel}>cancel</button>
            <br />
        </form>
    </div>  
    )
}

export default Review
