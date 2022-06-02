import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  async componentDidMount() {
    let url = `${process.env.REACT_APP_SERVER}/books`;
    const response = await axios.get(url);
    this.setState({ books: response.data })
  }

  render() {
    console.log(this.state.books);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
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