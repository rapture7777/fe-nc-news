const axios = require('axios');

exports.fetchUsers = () => {
  return axios.get('https://nc-news-asv.herokuapp.com/api/users');
};

exports.fetchArticles = params => {
  return axios.get('https://nc-news-asv.herokuapp.com/api/articles', params);
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
