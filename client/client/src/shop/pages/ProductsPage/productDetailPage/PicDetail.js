import React, { Component } from 'react';
import './detail.less';

class PicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="picDetail">
        <div className="pic-detail-title">
          <span className="detailName">图文详情</span>
        </div>
        <ul>
          {
            this.props.data.map(item => (
              <li key={ item }
                className="everyPic"
              >
                <img
                  src={ item }
                  style={ { width: '100%' } }
                  alt="商品详情"
                />
              </li>
            ))
          }
        </ul>
        <img
          className="bottomdescrib"
          src="https://qnimg.vadxq.com/luckyshop/1571111185558.detail_bottom.png"
          width="100%"
          alt="底部"
        />
      </div>
    );
  }
}

export default PicDetail;
