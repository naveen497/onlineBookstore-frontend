import React from 'react';
import {Link} from "react-router-dom";
import '../components/SearchBoxComponent.css'
import {searchBooks} from "../services/BookService";
import t from 'typy';

import 'react-multi-carousel/lib/styles.css';
import BookCarousel from "./BookCarousel";
import SearchResultsComponent from "./SearchResultsComponent";
import {Fade} from "react-reveal";

const DEFAULT_TITLE = "a";

export default class SearchBoxComponent extends React.Component {

    state = {
        books: [],
        title: ''
    }


    searchBooks = async (title) => {
        await searchBooks(title)
            .then(results => this.setState({
                books: results,
                title: title
            }))
    }

    async componentDidMount() {
        if(this.props.searchQuery) {
            await searchBooks(this.props.searchQuery)
                .then(results => this.setState({
                    books: results,
                    title: this.props.searchQuery
                }))
        }
    }



    render() {
        return (
            <div>

                <div className="jumbotron jumbotron-fluid bg-picture">
                    <div className="container">
                        <br/>
                        <br/>
                        <br/>

                        <Fade top cascade collapse>
                            <h1 className="text-center h1-color">Shop online with Bookbar,</h1>
                        </Fade>
                        <h1 className="text-center h1-color">our Web Development final project!</h1>
                    </div>
                    &nbsp;
                    &nbsp;

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
                                  onClick={() => this.searchBooks(this.state.title)}
                                  className="search_icon"><i className="fas fa-search"></i></Link>
                        </div>
                    </div>
                </div>



                {this.props.searchMode && <div className="container">
                        <Fade left cascade>
                            <h2 className="carousel-style">Most Relevant Books</h2>
                        </Fade>
                        &nbsp;
                        <Fade top>
                            <BookCarousel
                                title="g"
                                sorter="relevance"
                            />
                        </Fade>


                    <Fade left cascade>
                        <h2 className="carousel-style">Newest Books</h2>
                    </Fade>
                    &nbsp;
                    <Fade top>
                        <BookCarousel
                            title="l"
                            sorter="newest"
                        />
                    </Fade>


                    <h2 className="carousel-style">Top Action Books</h2>
                    &nbsp;
                    <BookCarousel
                        title="action"
                        sorter="newest"
                    />


                </div>
                }

                {!this.props.searchMode &&
                <SearchResultsComponent
                    books={this.state.books}
                    title={this.state.title}

                />}

            </div>

        );
    }
}

