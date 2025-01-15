import React from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const { state } = useLocation();
  return (
    <div>
      <h1>Welcome, {state.username}</h1>
      <p>Email: {state.email}</p>
    </div>
  );
}

export default Home;
