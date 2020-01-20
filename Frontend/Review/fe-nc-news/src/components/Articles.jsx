import '../css/Articles.css';
import * as api from '../utils/api';
import React, { Component } from 'react';
import ArticlesSm from './ArticlesSm';

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    api.fetchArticles().then(({ data: { articles } }) => {
      this.setState({ articles: articles }, () => {
        console.log(this.state.articles);
      });
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <main className="Articles">
        <p className="Filters">Filters</p>
        <section className="ArticlesSm">
          <ArticlesSm articles={articles} />
        </section>
        <p className="Post">Post</p>
      </main>
    );
  }
}

export default Articles;
