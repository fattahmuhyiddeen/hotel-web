export default ({
  endpoint,
  data = null,
  onSuccess = () => null,
  onFail = () => null
}) => {
  const xhr = new XMLHttpRequest();
  const isGet = endpoint[0].toLowerCase() === 'get';
  let urlParams = '';
  if (isGet && !!data) {
    urlParams = '?' + Object.entries(data).map(e => e.join('=')).join('&');
  }
  if (!!data) {
    console.log('data in API call', data);
  }
  if (endpoint) {
    xhr.open(endpoint[0], endpoint[1] + urlParams);
  }
  const requestHeaders = {
    Accept: 'application/json',
    contentType: 'application/json',
    dataType: "json"
  };

  for (let header in requestHeaders) {
    xhr.setRequestHeader(header, requestHeaders[header]);
  }

  xhr.onload = ({ target }) => {
    if (target.status >= 200 && target.status < 300) {
      onSuccess(JSON.parse(target.responseText));
      console.log('API success ', target.responseText);
    } else {
      console.log('API fail ', target);
      onFail(target);
    }
  };

  xhr.onerror = error => {
    console.log('API failed', error);
    onFail(error);
  };

  if (data && !isGet) {
    xhr.send(JSON.stringify(data))
  } else {
    xhr.send();
  }
};