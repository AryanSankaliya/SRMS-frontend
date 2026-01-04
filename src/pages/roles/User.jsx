import React from "react";
import Dashboard from "../Dashboard";
import AddRequestForm from "../../components/AddRequestForm";

function User() {
  return (
    <Dashboard userName="Ajay" role="USER">
      <AddRequestForm />
    </Dashboard>
  );
}

export default User;
