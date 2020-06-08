import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login.js";
import Credits from "./components/Credits.js";
import Debits from "./components/Debits";
import AccountBalance from "./components/AccountBalance.js";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      debitInfo: [],
      creditInfo: [],
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "06-03-2010",
      },
    };
  }

  componentDidMount() {
  
    axios
    .get( "https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;
        this.setState({ debitInfo: data });
        let total = this.state.accountBalance;
        data.forEach((element) => (total -= element.amount));
        this.setState({ accountBalance: total });
      })
      .catch((err) => console.log(err));

    
    axios
    .get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        const data = response.data;
        this.setState({ creditInfo: data });
        let total = this.state.accountBalance;
        data.forEach((element) => {
          total += element.amount;
        });
        this.setState({ accountBalance: total });
      })
      .catch((err) => console.log(err));
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  addCredit = (credit) => {
    let newCredit = [credit, ...this.state.creditInfo];
    this.setState({creditInfo: newCredit});
    this.setState({
      accountBalance: this.state.accountBalance + parseInt(credit.amount),
    });
  };

  Debits = (debit) => {
    let newDebit = [debit, ...this.state.debitInfo];
    this.setState({debitInfo: newDebit});
    this.setState({ accountBalance: this.state.accountBalance - debit.amount });
   
  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <Login
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );
    const AddCreditComponent = () => (
      <Credits
        balance={this.state.accountBalance}
        addCredit={this.addCredit}
        creditInfo={this.state.creditInfo}
      />
    );
    const AddDebitComponent = () => (
      <Debits
        balance={this.state.accountBalance}
        Debits={this.Debits}
        debitInfo={this.state.debitInfo}
      />
    );

    return (
      <Router>
      
          <div>
            <Route exact path="/" render={HomeComponent}></Route>
            <Route
              exact
              path="/userProfile"
              render={UserProfileComponent}
            ></Route>
            <Route exact path="/Login" render={LogInComponent} />
            <Route exact path="/Credits" render={AddCreditComponent}></Route>
            <Route exact path="/Debits" render={AddDebitComponent}></Route>
          </div>
     
      </Router>
    );
  }
}

export default App;