import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Header extends Component {
    constructor(props) {
        super(props)

        this.onLoginFormSubmitted = this.onLoginFormSubmitted.bind(this);
    }

    onLoginFormSubmitted(event) {
        event.preventDefault();
        this.props.authWithEmailPassword(this.emailInput.value, this.passwordInput.value);
        this.loginForm.reset();

    }

    render() {
        let self = this;
        return (
            <nav className="navbar navbar-toggleable-md navbar-dark">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" to="/">Home Diner</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">

                        {this.props.authenticated
                            ? (
                                <div className="center-div">
                                    <Link className="nav-item nav-link active" to="/">Recipes <span className="sr-only">(current)</span></Link>
                                    {/* <Link className="nav-item nav-link" to="/pantry">Pantry</Link> */}
                                    <Link className="nav-item nav-link" to="/shoppinglist">Shopping List</Link>
                                </div>
                            ) : null
                        }
                    </div>
                </div>

                {/* SIGN UP/IN BUTTON */}

                {this.props.authenticated
                    ? (
                        <div id="logout">
                            <Link id="logout-btn" to="/logout" aria-label="Log Out">Logout</Link>
                        </div>
                    ) :
                    <div id="sign-in">
                        <span id="sign-in-btn" data-toggle="modal" data-target="#signInUp">Sign In</span>
                    </div>
                }

                {/* SIGN UP/IN MODAL POPUP */}
                <div className="modal fade" id="signInUp" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sign In</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <button type="button" data-dismiss="modal" className="btn btn-primary" onClick=
                                        {this.props.loginFacebook}>Facebook
                                    </button>
                                    <hr />
                                </div>

                                <form id="email-login-form" onSubmit={this.onLoginFormSubmitted} ref={(form) => { self.loginForm = form }}>
                                    <div>
                                        <h5>Note:</h5>
                                        <small>If you don't already have an account, this form will create an account for you.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="InputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={(input) => { self.emailInput = input }} />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="InputPassword1">Password</label>
                                        <input type="password" className="form-control" id="InputPassword1" placeholder="Password" ref={(input) => { self.passwordInput = input }} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" form="email-login-form">Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
