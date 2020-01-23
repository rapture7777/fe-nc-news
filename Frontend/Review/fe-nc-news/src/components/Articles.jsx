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
    totalArticles: null,
    topic: '',
    sort_by: '',
    isLoading: true,
    err: '',
    showPost: false,
    page: 1
  };

  componentDidMount() {
    api.fetchArticles().then(({ data: { articles, total_count } }) => {
      this.setState({
        articles: articles,
        totalArticles: total_count,
        isLoading: false
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic, sort_by, articles, page } = this.state;
    if (
      prevState.topic !== topic ||
      prevState.sort_by !== sort_by ||
      prevState.articles.length === articles.length - 1
    ) {
      api.fetchArticles(topic, sort_by, page).then(({ data: { articles } }) => {
        this.setState(currentState => {
          return {
            articles: articles,
            showPost: false
          };
        });
      });
    }
    if (prevState.page !== page) {
      api.fetchArticles(topic, sort_by, page).then(({ data: { articles } }) => {
        this.setState(currentState => {
          return {
            articles: [...currentState.articles, ...articles],
            showPost: false
          };
        });
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

  handlePageChange = () => {
    this.setState(currentState => {
      return { page: currentState.page + 1 };
    });
  };

  render() {
    const { articles, showPost, isLoading, totalArticles } = this.state;
    const { username } = this.props;
    return (
      <main className="Articles">
        <Filters handleArticlesChange={this.handleChange} />
        {!isLoading ? (
          <section className="ArticlesSm">
            <ArticlesSm articles={articles} />
          </section>
        ) : (
          <div className="ArticlesSm lds-hourglass"></div>
        )}
        {totalArticles > articles.length && (
          <section className="PageBar">
            <PageBar handlePageChange={this.handlePageChange} />
          </section>
        )}
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
