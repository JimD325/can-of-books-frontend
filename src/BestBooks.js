import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    }
  }
  async fetchBooks() {
    let apiUrl = `${process.env.REACT_APP_SERVER}/books`;
    try {
      const response = await axios.get(apiUrl);
      this.setState({ books: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  displayCreateForm = () => {
    this.setState({
      showModal: true,
    })
  }

  hideCreateForm = () => {
    this.setState({
      showModal: false,
    })
  }

  updateFilteredBooks = (filteredBooks) => {
    this.setState({
      books: filteredBooks
    })
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  async componentDidMount() {
    this.fetchBooks();
  }

  handleBookCreate = async (newBookInfo) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBookInfo);
    // console.log(response.data);
    this.setState({ books: [...this.state.books, response.data] })
    // this.props.updateCatsArray(response.data);
  }


  render() {
    console.log(this.state.books.length);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={this.displayCreateForm}>Add Book</Button>
        <BookFormModal
          showModal={this.state.showModal}
          hideCreateForm={this.hideCreateForm}
          handleBookCreate={this.handleBookCreate} />

        {this.state.books.length ?
          <Carousel variant='dark'>
            {
              this.state.books.map(book => (
            
                  <Carousel.Item key={book._id}>
                    <Image src="https://via.placeholder.com/150" />
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                    <Book
                      books={this.state.books}
                      book={book}
                      // handleUpdateBook={this.handleUpdateBook}
                      updateFilteredBooks={this.updateFilteredBooks} />
                      
                    </Carousel.Caption>
                  </Carousel.Item>
              ))
            }
          </Carousel> : (
            <h3>No Books Found 💩</h3>
          )
        }
      </>
    )
  }
}

class Book extends React.Component {

  handleBookDelete = async (event, bookToBeDeleted) => {
    console.log(this.props.books.length)
    console.log('book to be deleted: ', bookToBeDeleted);
    const filteredbooks = this.props.books.filter(book => book._id !== bookToBeDeleted);
    this.props.updateFilteredBooks(filteredbooks);
    await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookToBeDeleted}`);
    console.log(this.props.books.length);
  }


  render() {
    return (
      <>

        < Button onClick={event => this.handleBookDelete(event, this.props.book._id)} >Remove Book</Button >

      </>
    )
  }
}

export default BestBooks;
