import React from "react";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <div>
        <img src={user?.picture} />
      </div>
      <h2>Welcome</h2>
      <h2>{user?.name}</h2>
      <h2>
        Email: <span>{user?.email}</span>
      </h2>
    </div>
  );
}

export default Home;
