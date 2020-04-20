import * as React from "react";
import './InventoryComponent.css';
import {getAllBooks, searchBooksByISBN, searchBooks} from "../../services/BookService";
import SellerInventoryItem from "./SellerInventoryItem";
import {logout} from "../../actions/session";
import {connect} from "react-redux";
import SearchBoxComponent from "../SearchBoxComponent";
import {Link, withRouter} from "react-router-dom";

const mapStateToProps = ({session}) => ({
    session
});

class InventoryComponent extends React.Component {

    state = {
        books: [],
        title: ''
    }

    componentDidMount = () => {
        let allBooks = getAllBooks()
            .then(books => this.setState(({
                books:books
            })))
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>

                    <div>
                        <div className="d-flex justify-content-center h-100">
                            <div className="searchbar">
                                <input className="search_input"
                                       type="text"
                                       placeholder="Search books"
                                       value={this.state.title}
                                       onChange={(e) => this.setState({
                                           title: e.target.value
                                       })}/>
                                <Link to={`/search/${this.state.title}`}

                                      className="search_icon"><i className="fas fa-search"></i></Link>
                            </div>
                        </div>

                        {this.state.books && this.state.books.map(book =>
                            book.seller == this.props.session.username ?
                                <SellerInventoryItem
                                    book = {book} />
                                : <div></div>
                        )}
                    </div>

            </div>
        )
    }
}

export default connect(mapStateToProps)
(withRouter(InventoryComponent))
