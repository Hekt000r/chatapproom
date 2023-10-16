import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../App.css";
export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMsg = query(
      messagesRef,
      where("room", "==", room),
      orderBy("dateCreated")
    );
    const unsubscribe = onSnapshot(queryMsg, (snapsh) => {
      let messages = [];
      snapsh.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      dateCreated: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };
  return (
    <div className="chat">
      <div className="header">
        <h1 className="center">You are texting in {room}</h1>
      </div>
      <div className="messages center">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="username ">{message.user} : </span>{" "}
            <span className="message">{message.text}</span>{" "}
          </div>
        ))}
      </div>
      <Form onSubmit={handleSubmit} className="new-message-form center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Message"
          />
          <button type="submit" style={{ marginTop: 10 }} className="send-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="lightgrey"
              class="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
            Send
          </button>

          <br />
          <Form.Text className="text-muted">
            The messages you are sending are publicly visible to anyone in this
            room
          </Form.Text>
          <br />
          <Form.Text className="text-muted">
            Please use the send button, ENTER does not work .
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};
