import 'babel-polyfill';
import 'whatwg-fetch';
import * as Promise from 'bluebird';
import * as Set from 'es6-set/polyfill';
import * as assign from 'object-assign';

if (typeof window.Promise === 'undefined') {
  window.Promise = Promise;
}

Object.assign = assign;

if (!window.Set || !window.Set.prototype.forEach) {
  window.Set = Set;
}
