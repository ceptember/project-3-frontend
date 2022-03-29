import React from "react";
import {useState} from "react";

function Review({review, deleteReview, editReview,user}){

    const [dis, setDis] = useState("none")
    const [textToEdit, setTextToEdit] = useState(review.review_text)


function handleDelete(e){
    let url = "http://localhost:9292/reviews/" + e.target.parentNode.parentNode.id
    deleteReview(url)
}

function handleEdit(e){
    let url = "http://localhost:9292/reviews/" + e.target.parentNode.parentNode.id
    let textArea = e.target.parentNode.parentNode.childNodes[2].childNodes[0]
    console.log(textArea)
    setDis("block")
}

function handleCancel(e){
    e.preventDefault()
    setDis("none")
}

function handleEditSubmit(e){
    e.preventDefault()
    let url = "http://localhost:9292/reviews/" + e.target.parentNode.parentNode.id
    let reviewObj = {review_text: textToEdit }
    editReview(url, reviewObj)
    setDis("none")
}

return(
    <div id ={review.id}  className="reviewCard">
        <span className="userName"> {review.user_name} </span><br />
        {review.review_text}
        {review.user_id == user.id ? <div> <button id="delete" onClick={handleDelete} className="review_btn">Delete</button> <button onClick={handleEdit} className="review_btn">Edit</button></div> : "" }
        <form style={{display: dis }}> 
            <textarea className="edit_textarea" value={textToEdit} onChange={(e) => setTextToEdit(e.target.value)}> </textarea>
            <br />
            <button onClick={handleEditSubmit} className="review_btn">submit </button> <button onClick={handleCancel} className="review_btn">cancel</button>
            <br />
        </form>
    </div>  
    )
}

export default Review
