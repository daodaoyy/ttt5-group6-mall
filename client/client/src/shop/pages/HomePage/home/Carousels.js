import React, { Component } from 'react';
import {
  Carousel,
  WingBlank,
} from 'antd-mobile';
import { getRecommendProduct } from '@/api/product';
import './home.less';

class Carousels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendList: [],
      imgHeight: 300,
      slideIndex: 0,
      show: false,
    };
  }

  componentDidMount() {
    getRecommendProduct().then(res => {
      if (res.data.data.products.length) {
        this.setState({
          recommendList: res.data.data.products,
          show: true,
        });
      } else {
        this.setState({
          show: false,
        });
      }
    });
    if (this.state.slideIndex !== this.state.recommendList.length - 1) {
      this.setState({ slideIndex: this.state.recommendList.length - 1 });
    }
  }

  render() {
    const states = this.state;
    if (this.state.show) {
      return (
        <div className="carousels">
          <WingBlank>
            <Carousel
              autoplay
              infinite
              selectedIndex={ states.slideIndex }
            >
              { states.recommendList.map((val, index) => (
                <a
                  key={ val.id }
                  href={ `/productDetail/${val.id}` }
                  style={ { display: 'inline-block', width: '100%', height: states.imgHeight } }
                >
                  <img
                    src={ `${val.cover[0]}` }
                    alt={ index }
                    style={ { width: '100%', verticalAlign: 'top' } }
                    onLoad={ () => {
                      // fire window resize event to change height
                      // eslint-disable-next-line no-undef
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: '300px' });
                    } }
                  />
                </a>
              )) }
            </Carousel>
          </WingBlank>
        </div>
      );
    } return (
      <div className="carousels"></div>
    );
  }
}

export default Carousels;
