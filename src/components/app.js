import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazy-load";
import { isMobile } from "react-device-detect";
import { StickyContainer, Sticky } from "react-sticky";
import { getMovies } from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 1,
      init: true,
      isVisible: false,
      isMobile: false
    };
  }

  componentDidMount() {
    this.props.actions.getMovies(this.state.page);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  genImage(image, index, length) {
    return (
      <LazyLoad>
        <div
          style={{
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <img
            style={{
              width: "100%"
            }}
            src={
              `./assets/${image}` ||
              `./assets/placeholder_for_missing_posters.png`
            }
            alt={`./assets/placeholder_for_missing_posters.png`}
          />
        </div>
      </LazyLoad>
    );
  }

  showPosts() {
    return this.props.movies.length > 1 ? (
      this.props.movies.map((post, index) => {
        const image = post["poster-image"];
        return (
          <Col
            xs={4}
            style={{
              float: "left",
              marginBottom: "45px",
              marginRight: "0px",
              marginLeft: "0px"
            }}
          >
            <div
              style={{
                display: "inline-block"
              }}
            >
              <div style={{ paddingBottom: "10px" }}>
                {this.genImage(image, index, this.props.movies.length)}
              </div>
              <p style={{ color: "#ffffff", fontSize: "3vw" }}>{post.name}</p>
            </div>
          </Col>
        );
      })
    ) : (
      <div>Loading...</div>
    );
  }
  showHead() {
    return (
      <div style={{ position: "sticky", top: "0" }}>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            maxHeight: "190px"
          }}
        >
          <input
            type="image"
            src="./assets/Back.png"
            width="28"
            height="28"
            style={{ display: "inline", float: "left", paddingTop: "0px" }}
          />
          <p
            style={{
              display: "inline",
              color: "#ffffff",
              fontSize: "4vw",
              marginLeft: "20px"
            }}
          >
            {" "}
            Romantic Comedy
          </p>
          <input
            type="image"
            src="./assets/search.png"
            width="28"
            height="28"
            style={{ display: "inline", float: "right", paddingTop: "0px" }}
          />
        </div>
      </div>
    );
  }
  fetchMovies(page) {
    console.log(`new movies for page ${page}`);
    this.props.actions.getMovies(this.state.page);
  }

  handleScroll = event => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 400
    ) {
      if (this.state.page < 3) {
        this.setState({ page: this.state.page + 1 });
        this.fetchMovies(this.state.page);
      }

      console.log(`looks like yeah `);
    }
  };

  render() {
    const renderMovies = this.showPosts();
    const renderHead = this.showHead();
    return isMobile ? (
      <div className="">
        <div>{renderHead}</div>
        <Grid>
          <div>
            <Row>{renderMovies}</Row>
          </div>
        </Grid>
      </div>
    ) : (
      <div>
        <p
          style={{
            color: "#ffffff",
            fontSize: "25px",
            paddingTop: "30px",
            right: "50%"
          }}
        >
          React JS/ Workshop/ Diagnal technologies
        </p>
        <div
          style={{
            padding: 0,
            margin: 0,
            marginTop: "30px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "500px",
            backgroundImage: "url(./assets/mobileOnly.jpg)",
            color: "#ffffff",
            fontSize: "25px",
            position: "relative"
          }}
        >
          <p
            style={{
              position: "absolute",
              bottom: "80px",
              left: "20px",
              backgroundColor: "#191a21",
              color: "#ffffff",
              paddingLeft: "20px",
              paddingRight: "20px",
              width: "300px"
            }}
          >
            This is Mobile only version, please view the page in mobile or use
            browser devtools to toggle device view and then refresh the page.
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { movies: state.movies };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getMovies }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
