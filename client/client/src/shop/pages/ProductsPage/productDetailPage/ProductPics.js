import React, { Component } from 'react';
import {
  Carousel,
  WingBlank,
} from 'antd-mobile';
import creatHistory from 'history/createHashHistory';
import './detail.less';
const history = creatHistory();

class ProductPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHeight: 176,
    };
  }

  componentDidMount() {
    // console.log(this.props.data); // 接收父组件的值不要写在这里，componentDidMount只在最开始执行一次，如果父组件那边有什么变化，这里是不会再变的
  }

  render() {
    return (
      <div>
        <div className="navi-back"
          onClick={ () => history.go(-1) }
        >
          <img
            src={ require('../../../../images/back.png') }
            width="35"
            height="35"
            alt="返回"
          />
        </div>
        <WingBlank>
          <Carousel
            autoplay={ false }
            dots
          >
            { this.props.data.map(val => (
              <div key={ val }>
                <img
                  src={ `${val}` }
                  alt="商品图片"
                  style={ { width: '100%', verticalAlign: 'top' } }
                  onLoad={ () => {
                    // fire window resize event to change height
                    // eslint-disable-next-line no-undef
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  } }
                />
              </div>
            )) }
          </Carousel>
        </WingBlank>
      </div>

    );
  }
}

export default ProductPics;
