import React, { Component } from "react";

class Votes extends Component {
  constructor(props) {
    super(props);
  }

  updateVote(event) {
    event.preventDefault();
    this.props.changevotes(event);
  }
  render() {
    const { vote, productId, questionId } = this.props;
    return (
      <div className="a-fixed-left-grid-col a-col-left">
        <ul className="vote voteaxios">
          <li key={"up"}>
            <form className="up" onSubmit={this.updateVote.bind(this)}>
              <input name="voteValue" value={vote + 1} type="hidden" />
              <input name="question_id" value={questionId} type="hidden" />
              <input type="submit" value="vote up" className="arrow-up" />
            </form>
          </li>
          <li className="vote-value" key={"votes"}>
            <span>{vote}</span>
            <span>
              <br />
              votes
            </span>
          </li>
          <li className="down-vote" key={"down"}>
            <form className="down" onSubmit={this.updateVote.bind(this)}>
              <input name="voteValue" value={vote - 1} type="hidden" />
              <input name="product_id" value={productId} type="hidden" />
              <input name="question_id" value={questionId} type="hidden" />
              <input type="submit" value="vote down" className="arrow-down" />
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

export default Votes;
