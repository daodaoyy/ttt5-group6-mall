import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBar,
} from 'antd-mobile';
import './home.less';

class Search extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  onChange= value => {
    this.setState({
      value,
    });
  };

  clear = () => {
    this.setState({
      value: '',
    });
  };

  searchProduct = value => {
    this.context.router.history.push(`/searchResult/${value}`);
  }

  render() {
    const states = this.state;
    return (
      <div className="topSearch">
        <SearchBar
          value={ states.value }
          placeholder="搜索"
          maxLength={ 20 }
          onSubmit={ value => {
            this.searchProduct(value);
          } }
          onChange={ this.onChange }
        />
      </div>
    );
  }
}

export default Search;
