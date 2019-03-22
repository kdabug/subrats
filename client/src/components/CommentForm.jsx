import React, { Component } from "react";
import { createNewComment } from "../services/users-helpers";
import { withRouter, Link } from "react-router-dom";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: {
        activity: "",
        cleanliness: "",
        wait_time: "",
        opt_comment: "",
        at_station: ""
      }
    };
    this.handleCommentFormChange = this.handleCommentFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCommentFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      commentData: {
        ...prevState.commentData,
        [name]: value
      }
    }));
  }
  async handleSubmit(e) {
    e.preventDefault();
    const resp = await createNewComment(
      this.props.match.params.id,
      this.state.commentData
    );
    console.log(resp);
    this.setState(prevState => ({
      commentData: {
        ...prevState.commentData,
        opt_comment: ""
      }
    }));
    this.props.history.push(`/stations/${this.props.match.params.id}`);
  }

  async componentDidMount() {
    this.setState(prevState => ({
      commentData: {
        ...prevState.commentData,
        stationId: this.props.match.params.id
      }
    }));
  }
  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <h2>Comment Form</h2>
        <label htmlFor="cleanliness">
          On a scale of 1-5 (1 being the worst), how clean was the station?
        </label>
        <div className="slider-container">
          <span>1</span>
          <input
            type="range"
            name="cleanliness"
            min="1"
            max="5"
            value={this.props.cleanliness}
            id="cleanliness"
            className="slider"
            onChange={this.handleCommentFormChange}
          />
          <span>5</span>
        </div>
        <label htmlFor="activity">
          On a scale of 1-5 (1 having the lowest traffic), how busy was the station?
        </label>
        <div className="slider-container">
          <span> 1</span>{" "}
          <input
            type="range"
            name="activity"
            min="1"
            max="5"
            value={this.props.activity}
            id="activity"
            className="slider"
            onChange={this.handleCommentFormChange}
          />
          <span>5</span>
        </div>
        <label htmlFor="wait_time">
          On a scale of 1-5 (1 being the worst), how long did it take for your train to arrive?
        </label>
        <div className="slider-container">
          <span>1</span>
          <input
            type="range"
            name="wait_time"
            min="1"
            max="5"
            className="slider"
            value={this.props.wait_time}
            id="onTime"
            onChange={this.handleCommentFormChange}
          />
          <span>5</span>
        </div>
        <label htmlFor="opt_comment">
          Optional comments for your fellow commuters
        </label>
        <input
          type="text"
          name="opt_comment"
          value={this.props.opt_comment}
          id="opt_comment"
          onChange={this.handleCommentFormChange}
        />
        <label htmlFor="at_station"> When were you there?</label>
        <input
          type="datetime-local"
          name="at_station"
          id="at_time"
          value={this.props.at_station}
          onChange={this.handleCommentFormChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(CommentForm);
