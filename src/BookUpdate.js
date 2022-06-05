import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class BookUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectedUpdateBook: {},
            _id: this.props.book?._id,
            title: this.props.book?.title,
            description: this.props.book?.description,
            status: this.props.book?.status
        }
    }

    bookUpdateAxios = async (selectedUpdateBook) => {
        await axios.put(`http://localhost:3001/books/${this.props.book._id}`, selectedUpdateBook);

        const updatedBooks = this.props.books.map(preExistingBook => {
            if (preExistingBook._id === selectedUpdateBook._id) {
                return selectedUpdateBook;
            } else {
                return preExistingBook;
            }
        });

        this.props.updateFilteredBooks(updatedBooks);
        window.location.reload();
    }

   

    handleSubmit = (event) => {
        event.preventDefault();
        this.bookUpdateAxios(this.state);
    }

    handleTitleChange = event => this.setState({ title: event.target.value });
    handleDescriptionChange = event => this.setState({ description: event.target.value });
    handleStatusChange = event => this.setState({ status: event.target.value });

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Update your book!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder={this.state.title}
                                    onChange={this.handleTitleChange}
                                    // TODO: grab the name of the book that was clicked on to be updated from state and put in value
                                    value={this.state.title}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder={this.state.description}
                                    onChange={this.handleDescriptionChange}
                                    value={this.state.description}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formStatusCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Have you read it?"
                                    onChange={this.handleStatusChange}
                                    checked={this.state.status}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onHide} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }
}

export default BookUpdate;
