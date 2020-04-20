import React from 'react';
import './BookManagerHeadingComponent.css';
import {Link, withRouter} from "react-router-dom";
import {logout} from "../actions/session";
import {connect} from "react-redux";
import Fade from 'react-reveal/Fade';

const mapStateToProps = ({session}) => ({
    session
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

class BookManagerHeadingComponent extends React.Component {
    render() {
        return (
            <nav className={"navbar navbar-expand-lg sticky " +
            (this.props.session.userType === 'SELLER'? 'seller-navbar' : 'buyer-navbar')}>
                <Fade top cascade>
                    <Link className="navbar-brand" to="/">
                        <button className={"btn font-color " +
                        (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                            <div className="row">
                                <div className="col-2">
                                    <h4>
                                        <i className="fas fa-bold"></i>
                                        <i className="fas fa-cocktail"></i>
                                    </h4>
                                </div>
                                <div className="col-10">
                                    <h4>BookBar</h4>
                                </div>
                            </div>
                        </button>
                    </Link>
                </Fade>

                <Fade left cascade>
                    <ul className="navbar-nav mr-auto nav navbar-right">
                        {!this.props.session.username && <li className="nav-item">
                            <Link className="nav-link"
                                  to={`/login`}>
                                <button className={"btn font-color " +
                                (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                    <i className="fas fa-sign-in-alt"></i>
                                    &nbsp;&nbsp;Login
                                </button>
                            </Link>
                        </li>}
                        {!this.props.session.username && <li className=" nav-item">
                            <Link className="nav-link "
                                  to={`/signUp`}>
                                <button className={"btn font-color " +
                                (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                    Sign Up</button>
                            </Link>
                        </li>}
                        <li className="nav-item">
                            {this.props.session.userType == 'BUYER' &&
                                <Link className="nav-link"
                                      to={`/cart`}>
                                    <button className={"btn font-color " +
                                            (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                        <i className="fas fa-shopping-cart font-color"
                                           aria-hidden="true"></i>
                                    </button>
                                </Link>
                            }
                            {this.props.session.userType == 'SELLER' &&
                                <Link className="nav-link"
                                      to={`/retail`}>
                                    <button className={"btn font-color " +
                                            (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                        <span>My Retail</span>
                                    </button>
                                </Link>
                            }
                        </li>

                        <li className="nav-item">
                            {this.props.session.userType == 'BUYER' &&
                                <Link className="nav-link"
                                      to={`/orders`}>
                                    <button className={"btn font-color " +
                                    (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                        <span>My Orders</span>
                                    </button>
                                </Link>
                            }
                            {this.props.session.userType == 'SELLER' &&
                                <Link className="nav-link"
                                      to={`/inventory`}>
                                    <button className={"btn font-color " +
                                    (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                        <span>My Inventory</span>
                                    </button>
                                </Link>
                            }
                        </li>
                        {this.props.session.username && <li className="nav-item">
                            <Link className="nav-link "
                                  to={`/profile`}>
                                <button className={"btn font-color border " +
                                (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    &nbsp;
                                    {this.props.session.username}</button>
                            </Link>
                        </li>}
                        {this.props.session.username && <li className="nav-item">
                            <a className="nav-link"
                               onClick={() => this.props.logout()}>
                                <button className={"btn font-color logout " +
                                (this.props.session.userType === 'SELLER'? 'btn-seller-navbar' : 'btn-buyer-navbar')}>
                                    Logout</button>
                            </a>

                        </li>}

                    </ul>
                </Fade>

            </nav>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(withRouter(BookManagerHeadingComponent))



