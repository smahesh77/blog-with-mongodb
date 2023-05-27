import React from 'react'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik' // for forms
import * as yup from 'yup' //for validation
import { useHistory } from 'react-router-dom'

function CreatePost() {
    let history = useHistory();
    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const onSubmit = (data) => {

        axios.post("https://blog-b1g5.onrender.com/posts", data).then((response) => {// sends the data to server 
            if (response.data.error) {
                alert("You are not Authorized, please log in!")
                history.push("/log");
            } else {
                console.log(response.data)
                console.log("IT WORKS")
                history.push("/")
            }

        })
    }

    const validationSchema = yup.object().shape({ // basically checks for stuff like pass too weak name too small valid gmail stuff like that
        title: yup.string().required(), // enter your custom error messges inside the required 
        postText: yup.string().required(),
        username: yup.string().required("Enter ya name brosky").min(3, "Your name aint that short homie").max(15, "Quit playin' fool"),

    })

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <Field
                        id="inputCreatePost"
                        name="title"
                        placeholder="(Ex. Title...)"
                    />  {/* thw title postText and username has the exactly same as that of the sql model only then the data could be send*/}
                    <ErrorMessage className='error' name="title" component="span" />

                    <label>Post: </label>
                    <Field
                        id="inputCreatePost"
                        name="postText"
                        placeholder="(Ex. Post...)"
                    />
                    <ErrorMessage className='error' name="postText" component="span" />
                    <label>Name to be displayed: </label>
                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. sammy)"
                    />
                    <ErrorMessage className='error' name="username" component="span" />


                    <button type="submit" on > Create Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost