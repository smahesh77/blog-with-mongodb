import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik' // for forms
import * as yup from 'yup' //for validation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../helpers/authContext";




function Post() {
    let history = useHistory();
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});// this will get the value given to setpostObject and store it in postobject
    const [comments, setcommentObject] = useState([]);
    const [newComment, setnewComment] = useState([])
    const [newUserComment, setnewUserComment] = useState([])
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);// sends to postobject
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setcommentObject(response.data);
          });


    }, []); // always put [] and the states in which you want to rerun the api requests never leave empty(just put[])

    const addComment = () => {
        axios.post(`http://localhost:3001/comments`, {
            commentBody: newComment, PostId: id, tokentest: localStorage.getItem("accessToken")// to get token from session storage
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                    test: "test got in"// you can send this to your server
                }
            }).then((response) => {

                if(response.data === "err"){
                    alert("enter somethin' fool")
                }

                if (response.data.error) {
                    console.log("are you stupid")
                    alert("You are not Authorized, please log in!")
                    history.push("/log");
                } else {
                    toast('Comment added!!!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000, // Set autoClose duration in milliseconds
                        closeButton: true, // Show close button
                    })
                    const commentToAdd = { commentBody: newComment, username: response.data.username };
                    setcommentObject([...comments, commentToAdd]); // this is how you add an element to an existing list
                    setnewComment("");
                }

            }).catch((err) => {
                alert(err)
            })


    }

    const deleteComment = (commentId) => {
        axios
          .delete(`http://localhost:3001/comments/${commentId}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            alert("Hmmm whatcha delete bro, was it something Sus 📸📸📸");
            setcommentObject((prevComments) =>
              prevComments.filter((comment) => comment.id !== commentId)
            );
          })
          .catch((error) => {
            alert("Hmmm,that was pretty fast was it something Sus 📸📸📸");
          });
      };






    return (
        <div className="postPage">
            <ToastContainer /> {/**to show toasts */}
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"> {postObject.title} </div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comment" value={newComment} onChange={(event) => { setnewComment(event.target.value) }} />
                    {/*this is how you get value from one variabe forms and inputs*/}
                    <button onClick={addComment}>Submit</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">
                                {comment.commentBody}
                                <hr></hr>
                                <label>Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post


