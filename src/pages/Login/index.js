import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { login } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MessageBox from "../../components/MessageBox/index";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/home");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <div className="form-container sign-in-container">
      <MessageBox />
      <Form
        action="#"
        style={{
          //don't change!!!!!!!!!
          marginTop: "170px",
          marginLeft: "100px",
          marginRight: "100px",
          textAlign: "center",
        }}
      >
        <h2 className="form-title">Welcome Back!</h2>
        <Form.Group controlId="formBasicEmail">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            autoComplete="username"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <button className="form-button" type="submit" onClick={submitForm}>
            Log in
          </button>
        </Form.Group>
      </Form>
    </div>
  );
}
