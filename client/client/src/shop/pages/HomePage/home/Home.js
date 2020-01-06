import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Footer from './Footer/Footer';
import Search from './Search';
import Carousels from './Carousels';
import ProClass from './ProductClass';
import ActivityEntry from './ActivityEntry';
import HotProduct from './HotProduct';

class Home extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <DocumentTitle title="首页">
        <div className="homePage">
          <Search />
          <Carousels />
          <img
            className="pic1"
            src={ require('../../../../images/pic1.png') }
            style={ { width: '100%' } }
            alt="品质保障"
          />
          <ProClass />
          <ActivityEntry />
          <HotProduct />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
