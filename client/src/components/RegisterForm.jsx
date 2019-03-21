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
    isLocal,
    title,
    user
  } = props;
  function renderImage(imgurl) {
    return (
      <div>
        <img src={imgurl} />
      </div>
    );
  }
  const showRegister = !show && !toggle;
  console.log("register user form props", props);
  return (
    showRegister && (
      <>
        {username ? (
          <>
            <div className="user-form-container">
              <h2>{title}</h2>
              <form>
                <label htmlFor="email">Email </label>
                <input
                  type="text"
                  onChange={onChange}
                  name="email"
                  id="email"
                  value={username.email}
                />
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  onChange={onChange}
                  name="username"
                  id="username"
                  value={username.username}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={onChange}
                  name="password"
                  id="password"
                  value={username.password}
                />
                <label htmlFor="isLocal">
                  Do you consider yourself a local?
                </label>
                <input
                  type="boolean"
                  onChange={onChange}
                  name="isLocal"
                  id="isLocal"
                  value={username.isLocal}
                />
                <div className="stock-list">
                  {ratAvatars &&
                    ratAvatars.map(el => (
                      <div className="image-container" value={el.id}>
                        <img
                          key={el.id}
                          src={el.src}
                          title={el.title}
                          alt={el.description}
                          id="avatar-pics"
                          name="avatar"
                          value={el.src}
                          onClick={onChange}
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
          </>
        ) : (
          <>loading</>
        )}
      </>
    )
  );
};
