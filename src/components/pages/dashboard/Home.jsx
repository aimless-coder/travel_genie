function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="grid place-items-center gap-5">
      <div className="h-[120px] w-[120px] ">
        <img src={user?.picture} className="h-full w-full rounded-full" />
      </div>
      <h2 className="font-bold text-center text-3xl">Welcome</h2>
      <div className="grid gap-3 w-full">
        <h2 className="font-bold text-xl">
          Name: <span className="font-normal">{user?.name}</span>{" "}
        </h2>
        <h2 className="font-bold text-xl">
          Email: <span className="font-normal">{user?.email}</span>
        </h2>
      </div>
    </div>
  );
}

export default Home;
