import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditInfo: {
        id: "",
        description: "",
        amount: 0,
        date: "",
      },
      isRedirect: false,
    };
  }

  handleChange = (e) => {
    const newCredit = { ...this.state.creditInfo };
    const input = e.target.name;
    const value = e.target.value;
    newCredit[input] = value;
    const date = new Date().toLocaleDateString("en-US");
        newCredit.date = date;
    let id = Math.random();
    newCredit.id = id;
    this.setState({ creditInfo: newCredit });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCredit(this.state.creditInfo);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    let display = this.props.creditInfo.map((credit) => {
      return (
        <div className="creditInfo" key={credit.id}>
          <ul>
            <li>Description: {credit.description}</li>
            <li>Amount: {credit.amount}</li>
            <li>Date: {credit.date}</li>
          </ul>
        </div>
      );
    });

    return (
      <>
        
        <div>
          <h1>Add Your Credit Amount</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="amount">Credit Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="0"
                value={this.state.creditInfo.amount}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Enter Credit Description"
                name="description"
                value={this.state.creditInfo.description}
                onChange={this.handleChange}
              />
            </div>
            <button>
              Confirm
            </button>
            <div className = "links">
            <br></br>
            <Link to="/">Home Page</Link>
            <br></br>
            <Link to="/Debits">Debit Page</Link>
            <br></br>
            <Link to="/Login">Login Page</Link>
            <br></br>
            <Link to="UserProfile">User Profile</Link>
            <br></br>
            <Link to="AccountBalance">Accound Balance</Link>
            </div>
          </form>
        </div>
        {display}
      </>
    );
  }
}

export default Credits;