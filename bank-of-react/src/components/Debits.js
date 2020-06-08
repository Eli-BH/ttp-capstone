import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
class Debits extends Component {
    constructor(props) {
        super(props);
        this.state = {
          debitInfo: {
            id: "",
            debitDescription: "",
            amount: 0,
            date: "",
          },
          isRedirect: false,
        };
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.addDebit(this.state.debitInfo);
        this.setState({isRedirect: true});
      };
    

      handleChange = (e) => {
        let input = e.target.name;
        let value = e.target.value;
        let newDebit = { ...this.state.debitInfo };
        newDebit[input] = value;
        const date = new Date().toLocaleDateString("en-US");
        newDebit.date = date;
        let id = Math.random();
        newDebit.id = id;
        this.setState({ debitInfo: newDebit });
      };
    
      render() {
        if (this.state.isRedirect) {
            return <Redirect to="/" />;
          }
    
        let display = this.props.debitInfo.map((details) => {
          return (
            <div className="debitInfo" key={details.id}>
              <ul>
                <li>Description: {details.description}</li>
                <li>Amount: {details.amount}</li>
                <li>Date: {details.date.toString()}</li>
                
              </ul>
            </div>
            
          );
          
        });
    
        return (
          <>
            <div>
              <h1>Add Your Debit Amount</h1>
              <form onSubmit={this.handleSubmit}>
                
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="Description"
                    value={this.state.debitInfo.description}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="amount">Debit Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={this.state.debitInfo.amount}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  disabled={
                    !(this.state.debitInfo.amount && this.state.debitInfo.description)
                  }
                >
                  Confirm
                </button>
              </form>
            </div>
            <Link to="/">Home Page</Link>
            <br></br>
            <Link to="/UserProfile">User Profile</Link>
            {display}
          </>
        );
      }
    }
//   constructor(props) {
//     super(props);
//     this.state = {
//       debitInfo: {
//         id: "",
//         description: "",
//         debitAmount: 0,
//         date: "",
//       },
//       redirected: false,
//     };
//   }

//   handleChange = (e) => {
//     const debitUpdate = { ...this.state.info };
//     const inputField = e.target.name;
//     const inputValue = e.target.value;
//     debitUpdate[inputField] = inputValue;
//     let date = new Date();
//     debitUpdate.date = date.toISOString();
//     let id = Math.random()
//     debitUpdate.id = id;
//     this.setState({ debitInfo: debitUpdate });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.addDebit(this.state.debitInfo);
//     this.setState({ redirected: true });
//   };

//   render() {
//     if (this.state.redirected) {
//       return <Redirect to="/" />;
//     }

//     let display = this.props.debitInfo.map((debit) => {
//       return (
//         <div className="info" key={debit.id}>
//           <ul>
//             <li>Description: {debit.description}</li>
//             <li>Amount: {debit.debitAmount}</li>
//             <li>Date: {debit.date.toString()}</li>
//           </ul>
//         </div>
//       );
//     });

//     return (
//       <>
//         <Link to="/">Home Page</Link>
//         <div>
//           <h1>Add Debit Amount</h1>
//           <form onSubmit={this.handleSubmit}>
//             <div>
//               <label htmlFor="debitAmount">Debit Amount</label>
//               <input
//                 type="number"
//                 name="debitAmount"
//                 value={this.state.debitInfo.debitAmount}
//                 onChange={this.handleChange} 
//               />
//             </div>
//             <div>
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={this.state.debitInfo.description}
//                 onChange={this.handleChange} 
//               />
//             </div>
//             <button
            
//             >
//               Confirm
//             </button>
//           </form>
//         </div>
//         {display}
//       </>
//     );
//   }
// }

export default Debits;