import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import BookUpdate from './BookUpdate';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      selectedUpdateBook: {},
      showModal: false,
      showUpdateModal: false
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
      showModal: false
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
  
    this.setState({ books: [...this.state.books, response.data] })
 
  }

  hideUpdateForm = () => {
    this.setState({
      selectedUpdateBook: {},
      showUpdateModal: false
    });
  }

  showUpdateForm =() =>{
    this.setState({
      showUpdateModal: true
    })
  }

  handleBookUpdate = (event, book) => {
    console.log("Book: ", book);
    console.log("TYPEOF book: ", typeof book);
    this.setState({
      selectedUpdateBook: book,
      showUpdateModal: true
    }, console.log("STATE: ", this.state));
  };

  render() {
    console.log(this.state.showUpdateModal);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={this.displayCreateForm}>Add Book</Button>
        <BookFormModal
          showModal={this.state.showModal}
          hideCreateForm={this.hideCreateForm}
          handleBookCreate={this.handleBookCreate} />
        <BookUpdate 
        books={this.state.books}
        book={this.state.selectedUpdateBook}
        handleBookUpdate = {this.handleBookUpdate}
        hideUpdateForm = {this.hideUpdateForm}
        onHide = {this.hideUpdateForm}
        show = {this.state.showUpdateModal}
        updateFilteredBooks = {this.updateFilteredBooks}
        />

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
                      handleBookUpdate={this.handleBookUpdate}
                      updateFilteredBooks={this.updateFilteredBooks}
                      show = {this.showUpdateForm}
                       />
                      
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
        <Button onClick={event => this.props.handleBookUpdate(event, this.props.book)}>Update Book</Button>

      </>
    )
  }
}

export default BestBooks;
