import { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

class Profile extends Component {

  render() {

    return (
      <Container>
        <Card bg={'light'} border={'primary'} className='text-center mb-2' style={{ width: '18rem'}}>
          <Card.Img src=''/>
          <Card.Body>
            <Card.Header>James Howard Brunswig Doyle III</Card.Header>
            <Card.Text>I like to code.</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    )
  }
};

export default Profile;