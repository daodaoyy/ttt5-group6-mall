import Sha from 'crypto';

(() => {
  if (window.JS_ENV !== 'dev') {
    const { search } = window.location;
    if (search.indexOf('?') !== 0) {
      console.log('no query string');
      window.location.href = '/unauth';
    }

    const querystring = search.substring(1);
    const queries = querystring.split('&')
      .map(str => str.split('='))
      .reduce((acc, curr) => Object.assign(acc, { [curr[0]]: curr[1] }), {});
    const queryKeys = Object.keys(queries);

    if (queryKeys.includes('loginid')
      || queryKeys.includes('token')
      || queryKeys.includes('stamp')) {
      console.log('missing query');
      window.location.pathname = '/error/401';
      return;
    }

    const hash = Sha.createHash('sha1');
    hash.update(window.uKey);
    hash.update(queries.loginid);
    hash.update(queries.stamp);
    const token = hash.digest('hex');
    if (token !== queries.token) {
      window.location.pathname = '/error/401';
    }
  }
})();
