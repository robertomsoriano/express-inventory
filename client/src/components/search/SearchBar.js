import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { increaseQuantity } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import { Search, Grid, Icon } from "semantic-ui-react";
import BooksList from "../books/BooksList";
import {
  Button,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import AddBookModal from "../books/AddBookModal";
const initialState = { isLoading: false, results: [], value: "" };

class SearchBar extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.name, results: [result] });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(`${result.name}  ${result.author}`);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.books, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    const books = results
    return (
      <Grid>
        <Grid.Column width={10}>
          <Search
            input={{ type: value.length <= 0 ? <Icon name='search' /> : <Icon className='search-icon' name='delete' link onClick={() => this.setState({ isLoading: false, results: [], value: "" })} />, iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            resultRenderer={resultRenderer}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(this.props.books, null, 2)}
            </pre>
          </Segment>
        </Grid.Column> */}
        {results.length && <><Table
          hover
          responsive
          borderless
          style={{ overflowX: "auto" }}
        >
          <thead>
            <tr>
              <th>#</th>

              <th>Title</th>
              <th>Subtitle</th>
              <th>Author</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
            </tr>
          </thead>

          {books.length > 0 &&
            books.map(book => (
              <tbody
                key={book._id}
                bgcolor={book.quantity <= 0 ? "coral" : "white"}
                style={{
                  backgroundColor: null
                }}
              >
                <tr>
                  <th scope="row">
                    <>
                      <Link
                        to={{
                          pathname: `/edit/${book._id}`,
                          state: { book }
                        }}
                      >
                        <Button className="edit-btn" outline>
                          View/Edit
                                    </Button>
                      </Link>
                      <Button
                        className="edit-btn"
                        outline
                        onClick={() => {
                          if (book.quantity <= 0) {
                            Swal.fire({
                              title: 'Book not available!',
                              text: 'Order more copies.',
                              type: 'warning',
                              footer: '<a href="/cart">Go to cart</a>'
                            })
                          } else {
                            this.props.increaseQuantity(book);
                          }
                        }}
                      >
                        Add to Cart
                                  </Button>
                    </>
                  </th>
                  <td>{book.name}</td>
                  <td>{book.subtitle}</td>
                  <td>{book.author}</td>
                  <td>{book.description}</td>
                  <td>{book.price}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <img
                      src={`${book.pic}`}
                      alt={book.name}
                      width="100px"
                      height="100px"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
          <AddBookModal />
        </>
        }
        {!results.length && <BooksList />}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  books: state.book.books
});

export default connect(
  mapStateToProps,
  { increaseQuantity }
)(SearchBar);


const resultRenderer = ({ pic, price, name, author }) => [
  pic && name && (
    <div key='image' className='image'>
      <img src={pic} key='img' alt={name} />
    </div>
  ),
  <div key='content' className='content'>
    {price && <div className='price'>${price}</div>}
    {name && <div className='title'>{name}</div>}
    {author && <div className='description'>{author}</div>}
  </div>
]