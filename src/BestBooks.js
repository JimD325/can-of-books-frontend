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
    let apiUrl = `http://localhost:3001/books`;
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
  
  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  async componentDidMount() {
    this.fetchBooks();
  }

  handleBookCreate = async (newBookInfo) => {
    const response = await axios.post(`http://localhost:3001/books`, newBookInfo);
    // console.log(response.data);
    this.setState({ books: [...this.state.books, response.data] })
    console.log(this.state);
    // this.props.updateCatsArray(response.data);
  }

  handleBookDelete = async (event, bookToBeDeleted) => {
    console.log('book to be deleted: ', bookToBeDeleted);
    const filteredbooks = this.props.books.filter(book => book._id !== bookToBeDeleted);
    this.props.updateFilteredBooks(filteredbooks);
    await axios.delete(`http://localhost:3001/cats/${bookToBeDeleted}`);
  }

  render() {
    console.log(this.state.books.length);
    console.log(this.state.books);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={this.displayCreateForm}>Add Book</Button>
        <BookFormModal 
        showModal = {this.state.showModal}
        hideCreateForm = {this.hideCreateForm}
        handleBookCreate ={this.handleBookCreate}/>
        
        {this.state.books.length ?
          <Carousel variant='dark'>
            {
              this.state.books.map(value => (
                <Carousel.Item key={value._id}>
                  <Image src="https://via.placeholder.com/150"/>
                  <Carousel.Caption>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </Carousel.Caption>
                  <Button onClick={this.handleBookDelete}>Delete</Button>
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

export default BestBooks;