import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      male: false,
      female: false,
      gender: "",
      genderValid: false,
      fname: "",
      lname: "",
      email: "",
      age: "",
      dob: "",
      country: "",
      countryValid: false,
      English: false,
      Hindi: false,
      Telgu: false,
      Marathi: false,
      dobValid: false,
      emailValid: false,
      lnameValid: false,
      fnameValid: false,
      ageValid: false,
      formValid: false,
      formErrors: {
        fname: "",
        lname: "",
        email: "",
        age: "",
        dob: "",
        country: "",
        gender: "",
      },
    };
  }
  validateForm(name, value) {
    let l_fnameValid = this.state.fnameValid;
    let l_formErrors = this.state.formErrors;
    let l_lname_valid = this.state.lnameValid;
    let l_emailValid = this.state.emailValid;
    let l_ageValid = this.state.ageValid;
    let l_dobValid = this.state.dobValid;
    let l_countryValid = this.state.countryValid;
    let l_genderValid = this.state.genderValid;
    switch (name) {
      case "gender":
        l_genderValid = this.state.male || this.state.female;
        l_formErrors.gender = l_genderValid ? "" : "Select Gender";
        break;
      case "fname":
        l_fnameValid = value.length >= 6;
        l_formErrors.fname = l_fnameValid
          ? ""
          : "Minimum 6 characters are required";
        break;
      case "lname":
        l_lname_valid = value.length >= 6;
        l_formErrors.lname = l_lname_valid
          ? ""
          : "Last name must contain atleast 6 characters";
        break;
      case "email":
        l_emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        l_formErrors.email = l_emailValid
          ? ""
          : "Email must contain @gmail.com";
        break;
      case "age":
        l_ageValid = parseInt(value) >= 23 && parseInt(value) < 60;
        l_formErrors.age = l_ageValid ? "" : "Age should between 23-60 ";
        break;
      case "dob":
        l_dobValid = value.length >= 8;
        l_formErrors.dob = l_dobValid ? "" : "Dob must contain 8 letters";
        break;
    }
    this.setState(
      {
        lnameValid: l_lname_valid,
        fnameValid: l_fnameValid,
        formErrors: l_formErrors,
        emailValid: l_emailValid,
        ageValid: l_ageValid,
        dobValid: l_dobValid,
        countryValid: l_countryValid,
        genderValid: l_genderValid,
      },
      this.finalFun
    );
  }
  finalFun() {
    this.setState({
      formValid:
        this.state.fnameValid &&
        this.state.lnameValid &&
        this.state.emailValid &&
        this.state.ageValid &&
        this.state.dobValid &&
        this.state.genderValid,
    });
  }

  handleData = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "English") {
      this.setState((prevState) => ({
        English: !prevState.English,
      }));
    } else if (name === "Hindi") {
      this.setState((prevState) => ({
        Hindi: !prevState.Hindi,
      }));
    } else if (name === "Telgu") {
      this.setState((prevState) => ({
        Telgu: !prevState.Telgu,
      }));
    } else if (name === "Marathi") {
      this.setState((prevState) => ({
        Marathi: !prevState.Marathi,
      }));
    } else if (name === "gender") {
      if (value === "Male") {
        this.setState(
          (prevState) => ({
            male: !prevState.male,
          }),
          () => {
            this.validateForm(name, value);
          }
        );
      } else {
        this.setState(
          (prevState) => ({
            female: !prevState.female,
          }),
          () => {
            this.validateForm(name, value);
          }
        );
      }
    } else {
      this.setState(
        {
          [name]: value,
        },
        () => {
          this.validateForm(name, value);
        }
      );
    }
  };

  register = (event) => {
    console.log(JSON.stringify(this.state.country));
    let languages = [];
    let gender = "";
    for (let key in this.state) {
      if (
        key === "English" ||
        key === "Hindi" ||
        key === "Telgu" ||
        key === "Marathi"
      ) {
        if (this.state[key] === true) {
          languages.push(key);
        }
      } else if (key === "male" || key === "female") {
        if (this.state[key] === true) {
          gender = key;
        }
      }
    }

    let record = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      dob: this.state.dob,
      gender: gender,
      languages: languages,
      country: this.state.country,
    };
    axios.post("http://localhost:8080//registeration", record).then(
      (posRes) => {
        console.log(posRes);
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <label>Fname</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="fname"
              value={this.state.fname}
              placeholder="Enter the First Name"
              onChange={this.handleData}
            ></input>
          </div>
          <div>
            <p style={{ color: "red" }}>{this.state.formErrors.fname}</p>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>Lname</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              name="lname"
              value={this.state.lname}
              placeholder="Enter the Last Name"
              onChange={this.handleData}
            ></input>
          </div>
          <div>
            <p style={{ color: "red" }}>{this.state.formErrors.lname}</p>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>Email</label>
          </div>
          <div className="col-md-9">
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Enter the Email here"
              onChange={this.handleData}
            ></input>
          </div>
          <div>
            <p style={{ color: "red" }}>{this.state.formErrors.email}</p>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>Age</label>
          </div>
          <div className="col-md-9">
            <input
              type="number"
              name="age"
              value={this.state.age}
              placeholder="Enter the Age"
              onChange={this.handleData}
            ></input>
          </div>
          <div>
            <p style={{ color: "red" }}>{this.state.formErrors.age}</p>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>Dob</label>
          </div>
          <div className="col-md-9">
            <input
              type="date"
              name="dob"
              placeholder="Enter date of birth"
              value={this.state.dob}
              onChange={this.handleData}
            ></input>
          </div>
          <div>
            <p style={{ color: "red" }}>{this.state.formErrors.dob}</p>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>Languages</label>
          </div>
          <div className="col-md-9">
            <input
              type="checkbox"
              name="English"
              checked={this.state.English}
              value="English"
              onChange={this.handleData}
            ></input>
            <b> English</b>
            <input
              type="checkbox"
              name="Hindi"
              checked={this.state.Hindi}
              value="Hindi"
              onChange={this.handleData}
            ></input>
            <b> Hindi</b>
            <input
              type="checkbox"
              name="Telgu"
              checked={this.state.Telgu}
              value="Telgu"
              onChange={this.handleData}
            ></input>
            <b>Telgu</b>
            <input
              type="checkbox"
              name="Marathi"
              value="Marathi"
              checked={this.state.Marathi}
              onChange={this.handleData}
            ></input>
            <b>Marathi</b>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>Country</label>
          </div>
          <div className="col-md-9">
            <select name="country" onChange={this.handleData}>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="China">China</option>
              <option value="Russia">Russia</option>
            </select>
          </div>
          <div>
            <p style={{ color: "red" }}>{this.state.formErrors.country}</p>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <label>Gender</label>
          </div>
          <div className="col-md-9">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={this.state.male}
              onChange={this.handleData}
            ></input>
            <b>Male</b>

            <input
              type="radio"
              name="gender"
              value="Female"
              checked={this.state.female}
              onChange={this.handleData}
            ></input>

            <b>Female</b>
          </div>
          <div>
            <p style={{ color: "red" }}>{this.state.formErrors.gender}</p>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <input
              className="btn btn-success btn-sm"
              type="submit"
              value="Register"
              disabled={!this.state.formValid}
              onClick={this.register}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
