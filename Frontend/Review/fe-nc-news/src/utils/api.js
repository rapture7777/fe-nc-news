const axios = require('axios');

exports.fetchUsers = () => {
  return axios.get('https://nc-news-asv.herokuapp.com/api/users');
};

exports.fetchArticles = (topic, sort_by, page) => {
  const sort = sort_by || null;
  return axios.get('https://nc-news-asv.herokuapp.com/api/articles', {
    params: {
      topic: topic,
      sort_by: sort,
      page: page
    }
  });
};

exports.fetchDetailedArticle = article_id => {
  return axios.get(
    `https://nc-news-asv.herokuapp.com/api/articles/${article_id}`
  );
};

exports.fetchComments = article_id => {
  return axios.get(
    `https://nc-news-asv.herokuapp.com/api/articles/${article_id}/comments?sort_by=created_at`
  );
};

exports.postComment = (article_id, username, body) => {
  return axios.post(
    `https://nc-news-asv.herokuapp.com/api/articles/${article_id}/comments`,
    {
      username: username,
      body: body
    }
  );
};

exports.deleteComment = comment_id => {
  return axios.delete(
    `https://nc-news-asv.herokuapp.com/api/comments/${comment_id}`
  );
};

exports.voteOnComment = (comment_id, num) => {
  return axios.patch(
    `https://nc-news-asv.herokuapp.com/api/comments/${comment_id}`,
    { inc_votes: num }
  );
};

exports.voteOnArticle = (article_id, num) => {
  return axios.patch(
    `https://nc-news-asv.herokuapp.com/api/articles/${article_id}`,
    { inc_votes: num }
  );
};

exports.postArticle = (title, body, topic, username) => {
  return axios.post('https://nc-news-asv.herokuapp.com/api/articles', {
    title: title,
    body: body,
    topic: topic,
    author: username
  });
};

exports.deleteArticle = article_id => {
  return axios.delete(
    `https://nc-news-asv.herokuapp.com/api/articles/${article_id}`
  );
};
