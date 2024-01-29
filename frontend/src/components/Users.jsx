import { useState, useEffect } from "react";

import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { GenericMessage } from "./GenericMessage";
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (filter.trim() != "") {
          const response = await axios.get(
            `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
          );
          
          setUsers(response.data.message);
        } else {
          const response = await axios.get(
            "http://localhost:3000/api/v1/user/allusers"
          );
          
          setUsers(response.data.users);
        }
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };
    fetchUsers();
  }, [filter]);

  return (
    <>
      <div className="font bold mt-6 text-lg">Users</div>

      <div className="my-2">
        <input
          type="text"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder="Search users...."
          className="py-2 px-2 rounded-full border border-slate-200 w-full"
        ></input>
      </div>
      <div>
        {/* {users.map(user=> <User user={user} />)} */}
        {users ? users.map((user) => <User user={user} />) : <div>No user</div>}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 ">
          <div className="flex flex-col h-full justify-center">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center ml-2">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={(e) => {
            navigate(
              "/transfermoney?id=" + user._id + "&name=" + user.firstName
            );
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
