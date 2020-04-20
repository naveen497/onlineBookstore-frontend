import * as React from "react";
import './InventoryComponent.css';
import {getAllBooks, searchBooksByISBN, deleteBookListing,editBookListing} from "../../services/BookService";
import t from 'typy';
import {Link, withRouter} from "react-router-dom";

class SellerInventoryItem extends React.Component {

    state = {
        currentBook: {},
        editing: false,
        price: this.props.book.price.amount,
        quantity: this.props.book.quantity
    }

    componentDidMount = async () => {
        this.setState(({
            currentBook: await searchBooksByISBN(this.props.book.isbn.identifier)
        }))
    }

    editBookListing = async (isbn, newPrice, newQuantity) => {
        this.setState(({
            price: newPrice,
            quantity: newQuantity
        }))
        let details = {
            isbn: isbn,
            price: newPrice,
            quantity: newQuantity
        }
        await editBookListing(isbn,details)
    }

    deleteBookListing = async (isbn) => {
        await deleteBookListing(isbn)
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="">
                    <div id="searchResultsContainer" className="py-5 px-5 card-group">
                        <div className="container">
                            <ul className="list-group">
                                <div className="row">
                                    <div className="col-3">
                                        <Link to={`/bookDetails/${t(
                                                 this.state.currentBook,
                                                 'volumeInfo.industryIdentifiers[0].identifier').safeObject}`}>
                                            {t(this.state.currentBook,'volumeInfo.imageLinks').safeObject &&
                                                <img className="card-img-top"
                                                     src={t(this.state.currentBook,'volumeInfo.imageLinks').safeObject &&
                                                     t(this.state.currentBook,'volumeInfo.imageLinks.thumbnail').safeObject}
                                                     alt="Card image cap"/>}
                                        </Link>
                                    </div>

                                    <div className="col-9">
                                        <div className="card z-depth-5">
                                            <div className="card-body">
                                                <table className="table table-striped table-condensed">
                                                    <tbody>
                                                    <tr>
                                                        <td><label className="font-weight-bold">Title</label></td>
                                                        <td><span>{t(this.state.currentBook,'volumeInfo.title').safeObject}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label className="font-weight-bold">Author</label></td>
                                                        <td><span>{t(this.state.currentBook,'volumeInfo.authors').safeObject}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label className="font-weight-bold">ISBN-13</label></td>
                                                        <td><span>{this.props.book.isbn.identifier}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label className="font-weight-bold">Price</label></td>
                                                        {!this.state.editing && <td><span itemProp="isbn">
                                                            {this.props.book.price.currency} {this.state.price}
                                                         </span></td>}
                                                        {this.state.editing && <td>
                                                            <input type="number" class="form-control"
                                                                   onChange={(e) => {
                                                                       this.setState({
                                                                          price: e.target.value
                                                                      })}}
                                                                   value={this.state.price} />
                                                        </td>}
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-bold"><label>Quantity</label></td>
                                                        {!this.state.editing &&
                                                            <td>{this.state.quantity}</td>
                                                        }
                                                        {this.state.editing && <td>
                                                            <input type="number" class="form-control"
                                                                   onChange={(e) => {
                                                                       this.setState({
                                                                          quantity: e.target.value
                                                                      })}}
                                                                   value={this.state.quantity} />
                                                        </td>}
                                                    </tr>
                                                    <tr>
                                                        <td className="font-weight-bold"></td>
                                                        <td>
                                                            {!this.state.editing && <div>
                                                                <button type="button"
                                                                        class="btn btn-success float-right"
                                                                        onClick={() => {
                                                                            this.deleteBookListing(this.props.book.isbn.identifier)
                                                                        }}>
                                                                    <i class="fas fa-trash"></i> Delete Listing
                                                                </button>
                                                                <button type="button"
                                                                        class="btn btn-success float-right"
                                                                        onClick={() => {
                                                                            this.setState({editing: true})
                                                                        }}>
                                                                    <i class="fas fa-edit"></i> Edit Listing
                                                                </button>
                                                            </div>}
                                                            {this.state.editing &&
                                                                <button class="btn btn-success float-right"
                                                                    onClick={() => {
                                                                        this.editBookListing(this.props.book.isbn.identifier,this.state.price,this.state.quantity)
                                                                        this.setState({editing: false})
                                                                    }}><i class="fas fa-check"></i> Update Listing </button>
                                                            }
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        )


    }
}

export default SellerInventoryItem;