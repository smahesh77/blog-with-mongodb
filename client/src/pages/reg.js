import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Reg() {
  
  let history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(data);
      
      if (response.data.error) {  // all errors will come here, will be only true when there is a error
        alert(response.data.error);
      } else {// use else or it  will create an empty token in storage
        //sessionStorage.setItem("accessToken", response.data); this will get lost when we close the tab to prevent this we use local storage
        localStorage.setItem("accessToken", response.data.token);// this will keep us signedin in even different tabs
        alert(response.data.msg)
        history.push("/log");
      }
    })
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Reg;