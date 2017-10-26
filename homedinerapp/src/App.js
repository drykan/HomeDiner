import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { app, facebookProvider } from './components/base';
// import logo from './logo.svg';
import Header from './components/header';
import Logout from './components/logout';
import Recipe from './pages/recipe';
import ShoppingList from './pages/shoppingList';
import Pantry from './pages/pantry';

class App extends Component {
  constructor(props) {
    super(props)

    this.addToList = this.addToList.bind(this);
    this.authWithFacebook = this.authWithFacebook.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);

    this.state = {
      shoppingList: [],
      authenticated: false,
      redirect: false
    };
  }

  componentWillMount() {
    //database
    let shoppingListRef = app.database().ref('shoppingList').orderByKey();
    shoppingListRef.on('child_added', (snapshot) => {
      let shopping = {
        text: snapshot.val(),
        id: snapshot.key
      };
      this.setState({
        shopingList: [shopping].concat(this.state.shoppingList)
      });
    });

    //authentication
    this.removeAuthListner = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true
        })
      } else {
        this.setState({
          authenticated: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListner();
    // base.removeBinding(this.shoppingListRef);
  }

  addToList(ingreds) {
    this.setState((prevState) => {
      return {
        shoppingList: prevState.shoppingList.concat(ingreds)
      }
    })
    app.database().ref("shoppingList").push(this.state.shoppingList);
  }

  authWithFacebook() {
    console.log("Login with Facebook");
    app.auth().signInWithPopup(facebookProvider)
      .then((result, err) => {
        if (err) {
          console.log("unable to sign in with Facebook")
        } else {
          this.setState({ redirect: true });
        }
      })
  }

  authWithEmailPassword(email, password) {
    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          //create user
          return app.auth().createUserWithEmailAndPassword(email, password);
        } else if (providers.indexOf("password") === -1) {
          //used facebook
          return <div className="alert alert-danger" role="alert">Your account is already tied to an email. Please login with Email and Password.</div>
        } else {
          //sign in user
          return app.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.setState({ redirect: true });
        }
      })
      .catch((err) => {
        alert("DANGER- Message: " + err.message);
      })
  }



  render() {
    return (
      <Router>
        <div>
          <Header authenticated={this.state.authenticated} loginFacebook={this.authWithFacebook} authWithEmailPassword={this.authWithEmailPassword} />
          <Switch>
            <Route exact path="/" render={() => {
              return (<Recipe onAddIngredient={this.addToList} />)
            }} />

            <Route exact path="/recipe" render={() => {
              return (<Recipe onAddIngredient={this.addToList} />)
            }} />

            {/* <Route exact path="/pantry" component={Pantry} /> */}

            <Route exact path="/shoppinglist" render={() => {
              return (<ShoppingList shoppingList={this.state.shoppingList} />)
            }} />
            <Route exact path="/logout" component={Logout} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
