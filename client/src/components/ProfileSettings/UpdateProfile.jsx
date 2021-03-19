import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import { Avatar, makeStyles, Button, Collapse } from "@material-ui/core";

import Form from "./Form";

import "./ProfileSettings.scss";
import PasswordForm from "./PasswordForm";

const useStyles = makeStyles((theme) => ({
  large: {
    width: 100,
    height: 100,
    backgroundColor: "#3f51b5",
  },
}));

export default function UpdateProfile() {
  const classes = useStyles();
  const [showPasswordForm, setUserPasswordForm] = useState(false);
  const [updateButton, setUpdateButton] = useState("Update Password");

  const { currentUser } = useAuth();

  const handleFormClick = () => {
    if (showPasswordForm) {
      setUpdateButton("Update Password");
    } else {
      setUpdateButton("Update User Account");
    }
    setUserPasswordForm(!showPasswordForm);
  };

  return (
    <main className="profile">
      <header className="profile__header">
        <Avatar src="/broken-image.jpg" className={classes.large} />
        <h1 className="profile__header-username">{currentUser.username}</h1>
      </header>
      <h2 className="profile__title">Account Settings</h2>
      <p>Update your account information below.</p>
      {showPasswordForm ? <PasswordForm /> : <Form />}
      <Button
        className="profile__box-form-update-button"
        variant="contained"
        color="default"
        type="button"
        onClick={handleFormClick}
      >
        {updateButton}
      </Button>
      <footer className="profile__footer">
        <Link to="/">Go Back To Home Page</Link>
      </footer>
    </main>
  );
}
