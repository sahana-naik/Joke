import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "./categories.scss";

const CategoryList = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false)
  const [joke, setJoke] = useState("");
  const [cat, setCat] = useState("");

  useEffect(() => {
    setLoading(true)
    axios
      .get("https://api.chucknorris.io/jokes/categories")
      .then((res) => {
        //console.log("response", JSON.stringify(res?.data));
        setLoading(false)
        setCategory(res && res.data);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, []);

  const jokeDisplay = (item) => {
    console.log("items", item);
    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${item}`)
      .then((res) => {
        //  console.log(res)
        setJoke(res && res.data);
        setCat(res && res.data && res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(joke);
  console.log(cat);
  const result = (cat || []).map((items) => items);

  console.log("ss", result);
  return (
    <React.Fragment>
      <Container className="joke-main-container">
        <Row className="category-wrap">
          {loading ? <h1>Loading...</h1> : 
          ((category || []).map((item, index) => {
            return (
              <Col lg={3} xs={3} className="category-col">
                <div className="btn-wrap">
                <button
                  key={index}
                  onClick={() => jokeDisplay(item)}
                  className="category-btn"
                >
                  {item}
                </button>
                </div>
              </Col>
            );
          }))
        }
        </Row>

        {joke && (
          <>
            <div className="joke-display-wrap">
              <p>Select Category: {joke.categories}</p>
              <div className="joke-value-wrap">
                <p>{joke && joke.value}</p>
              </div>
              {(cat || []).map((item) => (
                <button onClick={() => jokeDisplay(item)} className="new-joke-btn"> New Joke</button>
              ))}
            </div>
          </>
        )}
        {/* <button onClick={jokeDisplay}>New Joke</button> */}
      </Container>
    </React.Fragment>
  );
};

export default CategoryList;
