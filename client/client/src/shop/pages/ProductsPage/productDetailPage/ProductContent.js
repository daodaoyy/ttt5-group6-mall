import React, { Component } from 'react';
import { Badge } from 'antd-mobile';
import './detail.less';

class ProductContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="productContent">
        <div className="productTitle">
          <i className="price-symbol">￥</i>
          <span className="proPrice">{ this.props.data.price }</span>
        </div>
        <div className="productName">
          <Badge
            text="自营"
            style={
              {
                marginRight: 5, padding: '0 3px', backgroundColor: '#3cbc34', borderRadius: 2,
              }
            }
          />
          <span className="productDesc">{ this.props.data.title }</span>
        </div>
        <div className="productAbout">
          <span className="productSaled">
            已售
            { this.props.data.count }
件
          </span>
          <span className="productSaled">
            库存
            { this.props.data.stock }
件
          </span>
          <span className="productSaled">
            福建厦门
          </span>
        </div>
      </div>
    );
  }
}

export default ProductContent;
