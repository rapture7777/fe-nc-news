import '../css/Articles.css';
import '../css/Loader.css';
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
    isLoading: true,
    err: '',
    showPost: false
  };

  componentDidMount() {
    api.fetchArticles().then(({ data: { articles } }) => {
      this.setState({ articles: articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic, sort_by, articles } = this.state;
    if (
      prevState.topic !== topic ||
      prevState.sort_by !== sort_by ||
      prevState.articles.length !== articles.length
    ) {
      api.fetchArticles(topic, sort_by).then(({ data: { articles } }) => {
        this.setState({ articles: articles, showPost: false });
      });
    }
  }

  handlePostedArticle = article => {
    this.setState(currentState => {
      return { articles: [article, ...currentState.articles] };
    });
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleShowPost = event => {
    this.setState(currentState => {
      return { showPost: !currentState.showPost };
    });
  };

  render() {
    const { articles, showPost, isLoading } = this.state;
    const { username } = this.props;
    return (
      <main className="Articles">
        <Filters handleArticlesChange={this.handleChange} />
        {!isLoading ? (
          <section className="ArticlesSm">
            <ArticlesSm articles={articles} />
          </section>
        ) : (
          <div class="ArticlesSm lds-hourglass"></div>
        )}
        <section className="PageBar">
          <PageBar />
        </section>
        <section className="Post">
          <button id="showPost" value={true} onClick={this.handleShowPost}>
            <b>Post Article</b>
          </button>
          {showPost && (
            <PostArticle
              className="Post"
              username={username}
              handlePostedArticle={this.handlePostedArticle}
            />
          )}
        </section>
      </main>
    );
  }
}

export default Articles;
