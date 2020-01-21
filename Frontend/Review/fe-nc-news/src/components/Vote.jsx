import '../css/Vote.css';
import React, { Component } from 'react';
import * as api from '../utils/api';

class Vote extends Component {
  state = {
    optimisticVoteCount: 0
  };

  changeVote = num => {
    const { optimisticVoteCount } = this.state;
    const { id, name } = this.props;
    if (
      (optimisticVoteCount <= 0 && num === 1) ||
      (optimisticVoteCount >= 0 && num === -1)
    )
      this.setState(
        currentState => {
          return {
            optimisticVoteCount: currentState.optimisticVoteCount + num
          };
        },
        () => {
          if (name === 'commentVote') api.voteOnComment(id, num);
          if (name === 'articleVote') api.voteOnArticle(id, num);
        }
      );
  };

  render() {
    const { votes } = this.props;
    const { optimisticVoteCount } = this.state;
    return (
      <div className="Votes">
        <button onClick={() => this.changeVote(1)}>+</button>
        {!isNaN(votes) ? (
          <p>{votes + optimisticVoteCount}</p>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={() => this.changeVote(-1)}>-</button>
      </div>
    );
  }
}

export default Vote;
