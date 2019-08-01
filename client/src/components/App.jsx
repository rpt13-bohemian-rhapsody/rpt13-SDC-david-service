import React from "react";
import axios from "axios";
import moment from "moment";
import Search from "./Search.jsx";
import "../main.css";

import Votes from "./Votes.jsx";
import Questions from "./Questions.jsx";
import Answers from "./Answers.jsx";
import SearchResults from './SearchResults.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      searchRequest: false,
      searchResult: [],
      searchQuery: ''
    };
    this.changeVote = this.changeVote.bind(this);
    this.searchQueryResults = this.searchQueryResults.bind(this);
  }

  componentDidMount() {
    let id = window.location.href.split('/')[4] || 1

    if (id !== "/") {
      axios.get(`http://localhost:3000/products/questions/${window.location.href.split('/')[4] || 1}`)
        .then(response => {
          this.setState({
            product: response.data
          });
        })
        .catch(err => {
          console.log(err);
      });
    }
  }

  changeVote(event) {
    event.preventDefault();

    const question_id = event.target.elements.question_id.value;
    const voteValue = event.target.elements.voteValue.value;

    // makes POST request to update the question's vote count
    axios.put(`/products/questions/votes/${question_id}`, {
        vote: voteValue
    })
    .then(() => {
      const questions = this.state.product;

      // find the question_id and update the vote value
      questions.forEach(question => {
        if (question.id === parseInt(question_id)) {
          question.votes = voteValue;
        }
      });

      // Change State Based on Votes
      this.setState({
        product: this.state.product
      });
    });
  }

  searchQueryResults(result, query) {
    // if the search query is empty
    if (query === '') {
      this.setState({
        searchRequest: false,
        searchResult: result,
        searchQuery: ''
      })
    } else {
      this.setState({
        searchRequest: true,
        searchResult: result,
        searchQuery: query
      }, () => {
      });
    }
  }


  render() {
    const data = this.state.product;

    if (JSON.stringify(data) === "{}") {
      return (
        <>
        </>
      )
    }

    return (
      <>
        <div id="ask_lazy_load_div">
          <div className="askInlineWidget">
            <hr className="a-divider-normal" />
            <h2 className="a-color-base askWidgetHeader">
              Customers questions & answers
            </h2>
            <div className="askWidgetQuestions askLiveSearchHide">
              <div className="a-row a-spacing-small a-spacing-top-base">
                <div className="a-section askBtfSearchViewContent">
                  <Search questions={data} searchQueryResults={this.searchQueryResults}/>
                </div>
              </div>
              {this.state.searchRequest ? (
                <SearchResults searchResult={this.state.searchResult} query={this.state.searchQuery}/>
              ) : (
                <div
                  className="a-section a-spacing-none askBtfTopQuestionsContainer"
                  style={{ textAlign: "center" }}
                >
                  <div className="a-section askTeaserQuestions">
                    {this.state.product.length === 0 ? (
                      <div className="askQuestionExample">
                        <div className="askTypicalExample">
                          Typical questions asked about products:
                        </div>
                        <div className="askExampleQuestion">
                          &nbsp;-&nbsp; Is the item durable?
                        </div>
                        <div className="askExampleQuestion">
                          &nbsp;-&nbsp; Is this item easy to use?
                        </div>
                        <div className="askExampleQuestion">
                          &nbsp;-&nbsp; What are the dimensions of this item?
                        </div>
                      </div>
                    ) : (
                      this.state.product.map(question => (
                        <div
                          key={question.id}
                          className="a-fixed-left-grid a-spacing-base"
                        >
                          <div
                            className="a-fixed-left-grid-inner"
                            style={{ paddingLeft: "65px" }}
                          >
                            <div
                              className="a-fixed-left-grid-col a-col-left"
                              style={{
                                width: "65px",
                                marginLeft: "-65px",
                                float: "left"
                              }}
                            >
                              <Votes
                                changevotes={this.changeVote.bind(this)}
                                vote={question.votes}
                                questionId={question.id}
                              />
                            </div>

                            <div
                              className="a-fixed-left-grid-col a-col-right"
                              style={{ paddingLeft: "1%", float: "left" }}
                            >
                              <Questions question={question} />
                              <Answers answers={question} questionId={question.id} />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="a-spacing-large a-divider-normal" />
      </>
    );
  }
}

// ReactDOM.render(<Questions />, document.getElementById('App'));

export default App;
