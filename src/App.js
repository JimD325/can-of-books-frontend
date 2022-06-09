import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import Profile from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import Welcome from './Welcome';





class App extends React.Component {




  render() {
    return (
      <>

        <Router>
          <Header />
          <Routes>
            {this.props.auth0.isAuthenticated ?
              <Route
                exact path="/"
                element={<BestBooks />}
              >
              </Route>
              :
              <Route
                exact path="/"
                element={<Welcome />}
              >
              </Route>
            }
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
            <Route
              exact path='/about'
              element={<About />}
            >
            </Route>
            <Route
            exact path='/Profile'
            element={<Profile />}>
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);