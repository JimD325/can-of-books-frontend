import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BookFormModal extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            title: event.target.formName.value,
            description: event.target.formDescription.value,
            status: event.target.formStatus.value
        }
        this.props.handleBookCreate(newBook);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.hideCreateForm} >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a New Book!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter Book Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="name" placeholder="Brief Book Description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formStatus">
                                <Form.Check type="checkbox" label="Have you read it?" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.hideCreateForm} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }
}

export default BookFormModal;
