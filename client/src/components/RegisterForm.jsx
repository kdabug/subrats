import React from "react";
import ratAvatars from "../ratAvatars";

export default props => {
  const {
    show,
    toggle,
    username,
    email,
    password,
    onChange,
    onSubmit,
    onClick,
    submitButtonText,
    backButtonText,
    avatar,
    isLocal
  } = props;
  const showRegister = !show && !toggle;
  console.log("register user form props", props);
  return (
    showRegister && (
      <div className="user-form-container">
        <h2>Register Form</h2>
        <form>
          <label htmlFor="email">Email </label>
          <input
            type="text"
            onChange={onChange}
            name="email"
            id="email"
            value={email}
          />
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            onChange={onChange}
            name="username"
            id="username"
            value={username}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={onChange}
            name="password"
            id="password"
            value={password}
          />
          <label htmlFor="isLocal">Do you consider yourself a local?</label>
          <input
            type="boolean"
            onChange={onChange}
            name="isLocal"
            id="isLocal"
            value={isLocal}
          />
          <div className="stock-list">
            {ratAvatars &&
              ratAvatars.map(({ id, src, title, description }) => (
                <div className="image-container">
                  <img
                    key={id}
                    src={src}
                    title={title}
                    alt={description}
                    name="avatar"
                    value={avatar}
                    onChange={onChange}
                  />
                </div>
              ))}
          </div>
          <button type="submit" onClick={onSubmit}>
            {submitButtonText}
          </button>
          <button type="submit" onClick={onClick}>
            {backButtonText}
          </button>
        </form>
      </div>
    )
  );
};
