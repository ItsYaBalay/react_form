import { useState } from "react";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";

function App() {
  //const [count, setCount] = useState(0)
  const [token, setToken] = useState(null);
  return (
    <>
      <Authenticate token={token} setToken={setToken} />
      <SignUpForm token={token} setToken={setToken} />
    </>
  );
}

export default App;
