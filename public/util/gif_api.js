import $ from 'jquery';
const publicBetaKey = 'dc6zaTOxFJmzC';

export const fetchGIFS = (search, success, error) => {
  let stripped = search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  let keywords = stripped.split(" ").join("+");
  let query = {
    q: keywords,
    limit: 50,
    api_key: publicBetaKey
  };
  
  let url = 'http://api.giphy.com/v1/gifs/search';
  $.ajax({
    method: 'GET',
    url: url,
    data: query,
    dataType: 'json',
    success,
    error
  });
};
