import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'antd-mobile';
import './detail.less';

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const arr = [];
    for (let i = 0; i < this.props.appraisa.score; i++) {
      arr.push(1);
    }
    const Item = List.Item;
    const productDetailId = `/evaluateList/${this.props.data}`;
    if (this.props.show) {
      return (
        <ul className="evaluate1">
          <div className="evaluate-title1">
            <List className="my-list">
              <NavLink to={ productDetailId }>
                <Item
                  extra="查看全部"
                  arrow="horizontal"
                >
                  评价（
                  { this.props.num }
                  ）
                </Item>
              </NavLink>
            </List>
          </div>
          <div className="first-evaluate">
            <li>
              <div className="first-evaluate-user">
                <div className="avatar">
                  <img
                    src={ this.props.appraisa.avatar }
                    width="100%"
                    height="100%"
                    alt="头像"
                  />
                </div>
                <span className="first-evaluate-username">{ this.props.appraisa.nickname }</span>
                <span className="first-evaluate-startFive">
                  {
                    arr.map(item => {
                      return (
                        <span key={ item }>
                          { item >= item.Star ? <span style={ { color: '#3cbc34', fontSize: '30px' } }>☆</span> : <span style={ { color: '#3cbc34', fontSize: '30px' } }>★</span> }
                        </span>
                      );
                    })
                  }
                </span>
                <span className="evaluate-date">{ this.props.appraisa.createTime }</span>
              </div>
              <div className="evaluate-content">
                <span>{ this.props.appraisa.content }</span>
              </div>
            </li>
          </div>
        </ul>
      );
    } return (
      <div className="evaluate1">
        <div className="evaluate-title1">
          <List className="my-list">
            <Item extra="">
              暂无评论
            </Item>
          </List>
        </div>
      </div>
    );
  }
}

export default Evaluate;
