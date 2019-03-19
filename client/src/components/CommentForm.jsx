import React, { Component } from "react";

class CommentForm extends Component {
  constructor(props) {
    super(props);
}
  render() {
    const { clean, busy, onTime, comment, onChange, onSubmit } = this.props;
    return (
      <form>
        <h2>Comment Form</h2>
        <label htmlFor="clean">On a scale of 1-5, how clean was the station?</label>
        <input
          type="range"
          name="cleanliness"
          min="1"
          max="5"
          value={clean}
          id="cleanliness"
          class="slider"
          onChange={onChange}
        />
        <label htmlFor="busy">On a scale of 1-5, how busy was the station?</label>
        <input
          type="range"
          name="activity"
          min="1"
          max="5"
          value={busy}
          id="activity"
          class="slider"
          onChange={onChange}
        />
        <label htmlFor="onTime">
          On a scale of 1-5, how long did it take for your train to arrive?
        </label>
        <input
          type="range"
          name="onTime"
          min="1"
          max="5"
          class="slider"
          value={onTime}
          id="onTime"
          onChange={onChange}
        />
        <label htmlFor="comment">Optional comments for your fellow commuters</label>
        <input
          type="text"
          name="comment"
          value={comment}
          id="comment"
          onChange={onChange}
        />
        <label htmlFor="is_there"> Are you still at the station?</label>
        <input
          type="radio"
          name="is_there"
          value="yes"/> Yes
        <input
          type="radio"
          name="is_there"
          value="no"/> No
        <button onClick={onSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default CommentForm;
