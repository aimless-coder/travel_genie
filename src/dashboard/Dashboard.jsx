import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex">
      <div className="w-[300px] h-[90vh] flex flex-col gap-10 border-x-4">
        <Link to="/dashboard/home">
          <div className=" shadow-sm hover:shadow-lg">
            <h2 className="py-5 px-10 font-semibold">Home</h2>
          </div>
        </Link>

        <Link to="/dashboard/create-trip">
          <div className=" shadow-sm hover:shadow-lg">
            <h2 className="py-5 px-10 font-semibold">Create Trip</h2>
          </div>
        </Link>

        <Link to="/dashboard/my-trips">
          <div className=" shadow-sm hover:shadow-lg">
            <h2 className="py-5 px-10 font-semibold">My Trips</h2>
          </div>
        </Link>
      </div>
      <div className="flex-1 px-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
