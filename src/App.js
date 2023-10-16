import React, { useRef, useState } from "react";
import Auth from "./components/auth";
import Cookies from "universal-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Chat} from "./components/chat"

const cookies = new Cookies();

function App() {
  const [loggedIn, setLoggedIn] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const roomInput = useRef(null)
  if (!loggedIn) {
    return (
      <div className="App">
        <Auth setLoggedIn={setLoggedIn}></Auth>
      </div>
    );
  }
  return (
    <>
      <div>{room ? <div> Chat <Chat room={room}></Chat></div> : <div className="room">
       
      <Form className="center">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter the room name</Form.Label>
        <Form.Control ref={roomInput} type="text" placeholder="Room name" />
        <Button onClick={() => {
          setRoom(roomInput.current.value)
        }} style={{marginTop: 8}}>Join Room</Button>
        <p className="text-muted"  >Note: please press the button, pressing ENTER does not work.</p>
      </Form.Group>
      </Form>
        </div>}</div>
    </>
  );
}

export default App;
