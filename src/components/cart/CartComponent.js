import * as React from "react";
import './CartComponent.css'
import {searchBooks} from "../../services/BookService";
import {Link} from "react-router-dom";
import t from "typy";
import Fade from 'react-reveal/Fade';
import _ from "lodash";
import {clearCartForUser, getCartItemsForUser} from "../../services/CartServices";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addToOrder} from "../../services/OrderService";

const mapStateToProps = ({session}) => ({
    session
});

class CartComponent extends React.Component {

    state = {
        books: [],
        total: ''
    }

    checkoutFunctions = async () => {
        let clearCart = await clearCartForUser(this.props.session.username)
        let orderAdded = await addToOrder(this.state.books,this.props.session.username)

        console.log("Order stuff")
        console.log(orderAdded)
    }


    totalSum = () => {
        return _.sumBy(this.state.books, function (book) {
            return book.totalPrice;
        })
    }



    componentDidMount = async () => {
        await getCartItemsForUser(this.props.session.username)
            .then(results => this.setState({
                books: results
            }))

    }

    render() {
        return (
            <div className="container cart-font cart-background">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                {this.state.books.length === 0 &&
                <div>
                    <h1>Shopping Cart</h1>
                    <h2>Your cart is currently empty!</h2>
                    <br/>
                    <Link to={"/"}>
                        <button className="btn btn-dark">Continue Shopping</button>
                    </Link>

                </div>}
                {this.state.books.length !== 0
                && <div className="row">

                    <div className="col-8 border-right">
                        <h3 className="cart-header carousel-style">Your Cart</h3>

                        <br/>
                        <br/>

                        <table className="table w-auto">


                            <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.books &&
                            this.state.books.map(book =>
                                <Fade clear cascade>
                                    <tr>
                                        <td>
                                            <img
                                                src={_.get(book, ['image'])}
                                            />
                                            &nbsp;
                                        </td>
                                        <td>
                                            $ {_.get(book, ['unitPrice'])}
                                        </td>
                                        <td>
                                            {_.get(book, ['quantity'])}
                                        </td>
                                        <th>
                                            $ {_.get(book, ['totalPrice'])}
                                        </th>
                                    </tr>
                                </Fade>
                            )
                            }


                            </tbody>



                        </table>
                    </div>
                    <div className="col-4">
                        <h3 className="carousel-style">Order Summary</h3>
                        <br/>
                        <table className="table w-auto">
                            <thead>
                            <tr>
                                <th scope="col">SUBTOTAL</th>
                                <th scope="col">$ {this.totalSum()}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Shipping</td>
                                <td>$ {this.totalSum() * 0.05.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td>$ {this.totalSum() * 0.10.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <th>$ {this.totalSum() * 1.15.toFixed(2)}</th>
                            </tr>
                            </tbody>
                        </table>
                        <Link to={"/orders"}>
                            <button
                                onClick={() => {
                                    this.checkoutFunctions()
                                }}
                                className="btn btn-dark btn-block">
                                Proceed to checkout
                            </button>
                        </Link>
                        <br/>
                        <p className="text-center">or checkout with:</p>
                        <br/>
                        <a href="https://www.paypal.com/us/home">
                            <button
                                className="btn btn-primary btn-block">
                                <i className="fab fa-paypal"></i>
                            </button>
                        </a>
                        <br/>
                        <p className="text-center">Questions? We can help! Contact us</p>
                        <p className="text-center">1-800-756-3436</p>
                    </div>
                </div>}


            </div>)
    }
}

export default connect(mapStateToProps)
(withRouter(CartComponent))
