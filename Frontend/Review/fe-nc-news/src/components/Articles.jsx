import '../css/Articles.css';
import * as api from '../utils/api';
import React, { Component } from 'react';
import ArticlesSm from './ArticlesSm';
import PageBar from './PageBar';
import Filters from './Filters';
import PostArticle from './PostArticle';

class Articles extends Component {
  state = {
    articles: [],
    topic: '',
    sort_by: '',
    isLoading: false,
    err: ''
  };

  componentDidMount() {
    api.fetchArticles().then(({ data: { articles } }) => {
      this.setState({ articles: articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic, sort_by } = this.state;
    if (prevState.topic !== topic || prevState.sort_by !== sort_by) {
      api.fetchArticles(topic, sort_by).then(({ data: { articles } }) => {
        this.setState({ articles: articles });
      });
    }
  }

  handleChange = event => {
    const { id, value } = event.target;
    console.log(id, value);
    this.setState({ [id]: value });
  };

  render() {
    const { articles } = this.state;
    const { username } = this.props;
    return (
      <main className="Articles">
        <Filters handleArticlesChange={this.handleChange} />
        <section className="ArticlesSm">
          <ArticlesSm articles={articles} />
        </section>
        <section className="Post">
          <PostArticle className="Post" username={username} />
        </section>
        <section className="PageBar">
          <PageBar />
        </section>
      </main>
    );
  }
}

export default Articles;
