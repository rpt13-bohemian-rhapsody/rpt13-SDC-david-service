import { check } from "k6";
import http from "k6/http";

// get homepage
export const requestHomePage = function() {
  let res = http.get("http://localhost:3000/");
  check(res, {
    "is status 200": (r) => r.status === 200
  });
};

// get questions for particular product id
export const requestRviews = function() {
  let res = http.get("http://localhost:3000/products/questions/1");
  check(res, {
    "is status 200": (r) => r.status === 200
  });
};

// post
export const postReview = function() {
  var url = "http://localhost:3000/products/questions/";

  var payload = JSON.stringify({
    question_id: Math.floor(Math.random() * (10000000000 - 10000001 + 1) + 10000001),
    question: "Hello",
    response: "badsjfldfajdf",
    username: "Magee",
    createdat: "01/01/2019",
    vote: 200,
    productId: Math.floor(Math.random() * 20000)

  });
  var params =  { headers: { "Content-Type": "application/json" } }
  http.post(url, payload, params);
};