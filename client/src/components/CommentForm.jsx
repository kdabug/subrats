import React, { Component } from "react";
import { createNewComment } from "../services/users-helpers";
import { withRouter } from "react-router-dom"
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: {
        activity: '3',
        cleanliness: '3',
        wait_time: '3',
        opt_comment: '',
        is_there: null,
      }
    }
    this.handleCommentFormChange = this.handleCommentFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
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
async handleSubmit(e){
  e.preventDefault();
  console.log('submitted');
  const resp = await createNewComment(this.props.match.params.id, this.props.match.params.user_id, this.state.commentData);
  console.log(resp);
  this.setState(prevState => ({
    commentData: {
      ...prevState.commentData,
      opt_comment: '',
    }
  }))
}

handleRadio(e){
  const is_there = e.target.value === 'true' ? true: false;
  console.log(is_there);
  this.setState(prevState => ({
    commentData: {
      ...prevState.commentData,
      is_there
    }
  }));
}
async componentDidMount() {
  this.setState(prevState => ({
    commentData: {
      ...prevState.commentData,
      stationId: this.props.match.params.id
    }
  }))
}

  render() {
    return (
      <form>
        <h2>Comment Form</h2>
        <label htmlFor="clean">On a scale of 1-5, how clean was the station?</label>
        <input
          type="range"
          name="cleanliness"
          min="1"
          max="5"
          value={this.props.clean}
          id="cleanliness"
          className="slider"
          onChange={this.handleCommentFormChange}
        />
        <label htmlFor="busy">On a scale of 1-5, how busy was the station?</label>
        <input
          type="range"
          name="activity"
          min="1"
          max="5"
          value={this.props.busy}
          id="activity"
          className="slider"
          onChange={this.handleCommentFormChange}
        />
        <label htmlFor="onTime">
          On a scale of 1-5, how long did it take for your train to arrive?
        </label>
        <input
          type="range"
          name="wait_time"
          min="1"
          max="5"
          className="slider"
          value={this.props.onTime}
          id="onTime"
          onChange={this.handleCommentFormChange}
        />
        <label htmlFor="comment">Optional comments for your fellow commuters</label>
        <input
          type="text"
          name="comment"
          value={this.props.comment}
          id="comment"
          onChange={this.props.handleCommentFormChange}
        />
        <label htmlFor="is_there"> Are you still at the station?</label>
        <input
          type="radio"
          name="is_there"
          onChange={this.handleRadio}
          value="true"/> Yes
        <input
          type="radio"
          name="is_there"
          onChange={this.handleRadio}
          value="false"/> No
        <button onClick={this.handleSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(CommentForm);
