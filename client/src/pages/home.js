import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'


function Home() {

    const [listOfPosts, setListOfPosts] = useState([]); // gets the data from server in useEffect and stores in into list of posts
    let history = useHistory();// ecaxtly like navigator

    useEffect(() => {
        axios.get("https://blog-b1g5.onrender.com/posts").then((response) => {
            setListOfPosts(response.data)// this will somehow send the data to listpost, dw about it now
        })
    }, []);
    // to make the new blogs come first
    const reversedPosts = [...listOfPosts].reverse();
    //value will go through each object in the list
    return (

        <div>
            {reversedPosts.map((value, key) => {
                return (
                    <div className="post" onClick={() => {history.push(`/post/${value._id}`)}}>{/**navigator.push (where you want to go the route) the route must be specified*/}
                        <div className="title"> {value.title} </div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.username}</div>
                    </div>
                );
            })}
        </div>
    )
}

export default Home