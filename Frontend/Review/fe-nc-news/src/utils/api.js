const axios = require('axios');

exports.fetchUsers = () => {
  return axios.get('https://nc-news-asv.herokuapp.com/api/users');
};

exports.fetchArticles = () => {
  return axios.get('https://nc-news-asv.herokuapp.com/api/articles');
};
