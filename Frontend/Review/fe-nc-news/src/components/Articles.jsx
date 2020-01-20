import '../css/Articles.css';
import * as api from '../utils/api';
import React, { Component } from 'react';
import ArticlesSm from './ArticlesSm';
import PageBar from './PageBar';
import Filters from './Filters';

class Articles extends Component {
  state = {
    articles: [],
    topic: ''
  };

  componentDidMount() {
    api.fetchArticles().then(({ data: { articles } }) => {
      this.setState({ articles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.state;

    if (prevState.topic !== topic) {
      let params = { params: { topic } };
      api.fetchArticles(params).then(({ data: { articles } }) => {
        this.setState({ articles: articles });
      });
    }
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  render() {
    const { articles } = this.state;
    return (
      <main className="Articles">
        <Filters handleChange={this.handleChange} />
        <section className="ArticlesSm">
          <ArticlesSm articles={articles} />
        </section>
        <p className="Post">Post</p>
        <PageBar />
      </main>
    );
  }
}

export default Articles;
