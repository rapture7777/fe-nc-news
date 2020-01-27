import '../css/Articles.css';
import * as api from '../utils/api';
import React, { Component } from 'react';
import ArticlesSm from './ArticlesSm';
import PageBar from './PageBar';
import Filters from './Filters';
import PostArticle from './PostArticle';
import { Button, Spinner } from 'react-bootstrap';

class Articles extends Component {
  state = {
    articles: [],
    totalArticles: null,
    topic: '',
    sort_by: '',
    isLoading: true,
    newPost: false,
    err: '',
    showPost: false,
    page: 1,
    limit: 10
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
    const { topic, sort_by, page, newPost } = this.state;
    if (
      prevState.topic !== topic ||
      prevState.sort_by !== sort_by ||
      prevState.newPost !== newPost
    ) {
      console.log('inside');
      console.log(prevState);
      api
        .fetchArticles(topic, sort_by)
        .then(({ data: { articles, total_count } }) => {
          this.setState(currentState => {
            return {
              articles: articles,
              totalArticles: total_count,
              showPost: false,
              newPost: false,
              page: 1
            };
          });
        });
    }
    if (prevState.page !== page && prevState.page < page) {
      api
        .fetchArticles(topic, sort_by, page)
        .then(({ data: { articles, total_count } }) => {
          this.setState(currentState => {
            return {
              articles: [...currentState.articles, ...articles],
              totalArticles: total_count
            };
          });
        });
    }
  }

  handlePostedArticle = article => {
    this.setState(currentState => {
      return { articles: [article, ...currentState.articles], newPost: true };
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
    const { page, totalArticles, limit } = this.state;
    if (Math.round(totalArticles / limit) >= page) {
      this.setState(currentState => {
        return { page: currentState.page + 1 };
      });
    }
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
          <Spinner animation="border" variant="secondary" className="Loader" />
        )}
        {totalArticles > articles.length && (
          <section className="PageBar">
            <PageBar handlePageChange={this.handlePageChange} />
          </section>
        )}
        <section className="Post">
          <Button
            variant="secondary"
            id="showPost"
            value={true}
            onClick={this.handleShowPost}
          >
            <b>Post Article</b>
          </Button>
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
