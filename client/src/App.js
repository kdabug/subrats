import React, { Component } from "react";
import "./App.css";
import { Link, Route, withRouter } from "react-router-dom";
//import { withRouter } from "react-router";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import StationPage from "./components/StationPage";
import CommentForm from "./components/CommentForm";
import UserProfile from "./components/UserProfile";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LogoutForm from "./components/LogoutForm";
// jwt-decode lets us decode json web token and access the data in them
import decode from "jwt-decode";
import {
  createNewUser,
  loginUser,
  fetchStations,
  editUser
} from "./services/users-helpers";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: "",
      registerFormData: {
        username: "",
        email: "",
        password: "",
        isLocal: "",
        avatar: ""
      },
      currentUser: null,
      toggleLogin: true,
      loginFormData: {
        email: "",
        password: ""
      },
      token: "",
      userData: {},
      commentData: {},
      currentStation: [],
      stationData: [],
      userInput: "",
      autocompleteOptions: [],
      activeOption: 0,
      filteredOptions: [],
      showOptions: false
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQueryClick = this.handleQueryClick.bind(this);
    this.handleQueryKeyDown = this.handleQueryKeyDown.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleEditFormChange = this.handleEditFormChange.bind(this);
    this.handleRegisterFormChange = this.handleRegisterFormChange.bind(this);
    this.getStations = this.getStations.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.findLocation = this.findLocation.bind(this);
    this.findLocation = this.findLocation.bind(this);
    this.handleToggleLocalEdit = this.handleToggleLocalEdit.bind(this);
    this.handleToggleLocalRegister = this.handleToggleLocalRegister.bind(this);
  }

  handleQueryChange = e => {
    const { autocompleteOptions } = this.state;
    const userInput = e.currentTarget.value;
    console.log("this is userInput", userInput);
    const filteredOptions = autocompleteOptions.filter(
      option => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    console.log("this is handleQueryChange: filteredOptions", filteredOptions);
    this.setState({
      activeOption: 0,
      filteredOptions: filteredOptions,
      showOptions: true,
      userInput: userInput
    });
  };

  async handleQueryClick(e) {
    //e.preventDefault();
    console.log(
      "this is handlequeryclick: e.currentTarget.innerText",
      e.currentTarget.innerText
    );
    const userInput = e.currentTarget.innerText;
    const currentStation = this.state.stationData.filter(
      station => station.name + " " + station.lines === userInput
    );

    await this.setState((prevState, newState) => ({
      currentStation: currentStation,
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: userInput
    }));
    console.log(
      "this is handlequeryclick: this.state.userInput",
      this.state.userInput
    );
    console.log(
      "this is handlequeryclick: this.state.currentStation",
      this.state.currentStation
    );
    this.props.history.push(`/stations/${this.state.currentStation[0].id}`);
  }

  handleQueryKeyDown = e => {
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13) {
      this.setState((prevState, newState) => ({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      }));
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  handleQuerySubmit(e) {
    const { name, value } = e.target;
    console.log("querySubmit", this.state.userInput);
    this.setState((prevState, newState) => ({
      [name]: value
    }));
  }

  async handleLogin(e) {
    e.preventDefault();
    const userData = await loginUser(this.state.loginFormData);
    this.setState({
      currentUser: userData.data.user.username,
      userData: userData.data.user,
      loginFormData: {
        email: "",
        password: ""
      }
    });
    localStorage.setItem("jwt", userData.data.token);
    this.props.history.push(`/home`);
  }

  handleLoginClick(e) {
    e.preventDefault();
    console.log("I want to register: handleLoginClick button".toggleLogin);
    this.setState((prevState, newState) => ({
      toggleLogin: !prevState.toggleLogin
    }));
  }
  handleToggleLocalRegister(e) {
    e.preventDefault();
    console.log("I want to toggleLocal: handleLoginClick button".toggleLogin);
    const { name, value } = e.target;
    this.setState((prevState, newState) => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: !prevState.value
      }
    }));
  }
  handleToggleLocalEdit(e) {
    e.preventDefault();
    console.log("I want to toggleLocal: handleLoginClick button".toggleLogin);
    const { name, value } = e.target;
    this.setState((prevState, newState) => ({
      userData: {
        ...prevState.userData,
        [name]: !prevState.value
      }
    }));
  }
  async handleRegister(e) {
    e.preventDefault();
    const userData = await createNewUser(this.state.registerFormData);
    this.setState((prevState, newState) => ({
      currentUser: userData.data.user.username,
      userData: userData.data.user,
      registerFormData: {
        username: "",
        email: "",
        password: "",
        isLocal: "",
        avatar: ""
      }
    }));
    localStorage.setItem("jwt", userData.data.token);
    this.props.history.push(`/home`);
  }

  async handleEdit(e) {
    e.preventDefault();
    const userData = await editUser(
      this.state.userData.id,
      this.state.userData
    );
    this.setState((prevState, newState) => ({
      currentUser: userData.data.user.username,
      userData: userData.data.user
    }));
    localStorage.setItem("jwt", userData.data.token);
    this.props.history.push(`/home`);
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null,
      toggleLogin: true
    });
    this.props.history.push(`/`);
  }

  handleLoginFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }
  handleRegisterFormChange(e) {
    const { name, value } = e.target;
    console.log("handleRegisterChange name, val", name, value);
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }
  handleEditFormChange(e) {
    const { name, value } = e.target;
    console.log("handleEditChange name, val", name, value);
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
  }
  async getStations() {
    const stationData = await fetchStations();
    const autocompleteOptions = stationData.data.map(
      station => station.name + " " + station.lines
    );
    this.setState((prevState, newState) => ({
      stationData: stationData.data,
      autocompleteOptions: autocompleteOptions
    }));
  }
  findLocation() {
    if (this.state.currentLocation === "")
      navigator.geolocation.getCurrentPosition(position => {
        this.setState((prevState, newState) => ({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      });
  }

  async componentDidMount() {
    await this.getStations();
    await this.findLocation();
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState((prevState, newState) => ({
        currentUser: user,
        token: checkUser,
        userData: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isLocal: user.isLocal
        }
      }));
    }
  }

  async componentWillMount() {
    await this.getStations();
    await this.findLocation();
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState((prevState, newState) => ({
        currentUser: user,
        token: checkUser,
        userData: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isLocal: user.isLocal
        }
      }));
    }
  }

  render() {
    return (
      <div className="Main-app-body">
        <div className="header-container">
          <h1 className="main-title">Subway Rats</h1>
          <SearchPage
            userData={this.state.userData}
            onKeyDown={this.handleQueryKeyDown}
            onFormChange={this.handleQueryChange}
            onClick={this.handleQueryClick}
            onSubmit={this.state.handleQuerySubmit}
            showOptions={this.state.showOptions}
            userInput={this.state.userInput}
            filteredOptions={this.state.filteredOptions}
            activeOptions={this.state.activeOption}
          />
        </div>
        <Route
          exact
          path="/"
          render={props => (
            <>
              <LoginForm
                {...props}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleLoginFormChange}
                onSubmit={this.handleLogin}
                email={this.state.loginFormData.email}
                password={this.state.loginFormData.password}
                onClick={this.handleLoginClick}
              />
              <RegisterForm
                {...props}
                userData={""}
                title={"Register User"}
                onClick={this.handleLoginClick}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleRegisterFormChange}
                onSubmit={this.handleRegister}
                username={this.state.registerFormData.username}
                email={this.state.registerFormData.email}
                avatar={this.state.registerFormData.avatar}
                isLocal={this.state.registerFormData.isLocal}
                password={this.state.registerFormData.password}
                submitButtonText="Submit"
                backButtonText="Back to Login"
                toggleLocal={this.state.handleToggleLocalRegister}
              />
            </>
          )}
        />
        <Route
          exact
          path="/home"
          render={props => (
            <Home
              {...props}
              className="home"
              show={this.state.currentUser}
              userData={this.state.userData}
              currentLocation={this.state.currentLocation}
              stationData={this.state.stationData}
              history={this.props.history}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={props => (
            <SearchPage
              {...props}
              userData={this.state.userData}
              onKeyDown={this.handleQueryKeyDown}
              onFormChange={this.handleQueryChange}
              onClick={this.handleQueryClick}
              onSubmit={this.state.handleQuerySubmit}
              showOptions={this.state.showOptions}
              userInput={this.state.userInput}
              filteredOptions={this.state.filteredOptions}
              activeOptions={this.state.activeOption}
            />
          )}
        />
        <Route
          exact
          path="/user/:id/edit"
          render={props => (
            <RegisterForm
              {...props}
              title={"Edit User"}
              userData={this.state.userData}
              onChange={this.handleEditFormChange}
              onSubmit={this.handleEdit}
              username={this.state.userData.username}
              email={this.state.userData.email}
              password={this.state.userData.password}
              avatar={this.state.userData.avatar}
              isLocal={this.state.userData.isLocal}
              submitButtonText={"Submit"}
              backButtonText={"Cancel (Back to Home)"}
              toggle={""}
              onClick={() => this.props.history.push("/home")}
              show={""}
              toggleLocal={this.state.handleToggleLocalEdit}
            />
          )}
        />
        <Route
          exact
          path="/user/:id/username/:username"
          render={props => (
            <UserProfile {...props} userData={this.state.userData} />
          )}
        />

        <Route exact path="/contact" render={() => <Contact />} />
        <Route exact path="/stations/:id/" render={() => <StationPage userData={this.state.userData}/>} />
        <Route
          exact
          path="/stations/:id/comments/new"
          render={() => (
            <CommentForm
              commentData={this.state.commentData}
              onChange={this.handleFormChange}
              onSubmit={this.handleSubmit}
            />
          )}
        />
        <Route
          exact
          path="/logout"
          render={props => (
            <LogoutForm {...props} handleLogout={this.handleLogout} />
          )}
        />
        <Footer
          handleLogout={this.handleLogout}
          show={this.state.currentUser}
          userData={this.state.userData}
        />
      </div>
    );
  }
}

export default withRouter(App);
