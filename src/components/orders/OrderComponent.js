import * as React from "react";
import './OrderComponent.css';
import {getAllBooks, searchBooksByISBN, searchBooks} from "../../services/BookService";
import {logout} from "../../actions/session";
import {connect} from "react-redux";
import SearchBoxComponent from "../SearchBoxComponent";
import {Link, withRouter} from "react-router-dom";
import {Accordion,Card,Button, Jumbotron} from 'react-bootstrap'
import {getAllOrdersForUser} from "../../services/OrderService";
import _ from 'lodash';
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";

const mapStateToProps = ({session}) => ({
    session
});

class OrderComponent extends React.Component {

    state = {
        orders: []
    }

    componentDidMount = () => {
        getAllOrdersForUser(this.props.session.username)
            .then(orders => this.setState({
                orders: orders
            }))
    }

    totalSum = (items) => {
        return _.sumBy(items, function (items) {
            return items.totalPrice;
        })
    }

    totalQuantity = (items) => {
        return _.sumBy(items, function (items) {
            return items.quantity;
        })
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                    <div className="container order-page">
                        <br/>
                        <h1 className={"text-center carousel-style"}>Order History</h1>
                        <br/>
                        <div className={"container"}>
                            {this.state.orders &&
                            this.state.orders.map(order =>
                                <div className={"card card-margins"}>
                                    <div className={"card-header"}>
                                        <span><b>Online Order: </b> {order._id}</span>
                                        <b className={"date-margin"}>{order.createdAt.toString().substring(0,10)}</b>
                                        <div className="dropdown float-right">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="btn btn-light" id="dropdown-basic">
                                                    More Details
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <div>
                                                        <h5 className="carousel-style text-center">Order Invoice</h5>
                                                        <br/>
                                                        <table className="table w-auto dropdown-font">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col">SUBTOTAL</th>
                                                                <th scope="col">$ {this.totalSum(order.items)}</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>Shipping</td>
                                                                <td>$ {this.totalSum(order.items) * 0.05.toFixed(2)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tax</td>
                                                                <td>$ {this.totalSum(order.items) * 0.10.toFixed(2)}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Total</th>
                                                                <th>$ {this.totalSum(order.items) * 1.15.toFixed(2)}</th>
                                                            </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className={"row"}>

                                        <div className={"col-4 small-cards"}>


                                                {order.items.map(item =>
                                                    <span>
                                                        <img
                                                            className="img-size-small"
                                                            src={item.image}/>
                                                            x <b>{item.quantity} </b>
                                                    </span>
                                                        )}


                                        </div>
                                        <div className="col-4 text-center">
                                            <br/>
                                            <b>Shipping Address</b>
                                            <span>{_.get(this.props.session,['email'])}</span>
                                        </div>
                                        <div className="col-3">
                                            <br/>
                                            <p className={"text-center"}>
                                                <b>Preparing</b>
                                            </p>
                                            <ProgressBar now={60} />
                                            <span className="text-disabled">Shipped by {new Date(2020, 10, 24).toDateString()}</span>
                                        </div>


                                    </div>
                                </div>
                            )}
                            <br/>
                        </div>


                    </div>
                <br/>
                <br/>
                <h4 className={"text-center carousel-style"}>You've seen all your purchases!</h4>
            </div>
        )
    }
}

export default connect(mapStateToProps)
(withRouter(OrderComponent))
