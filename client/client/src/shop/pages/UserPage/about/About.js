import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import './About.less';

class AboutPage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
    };
  }

  componentDidMount() {
    // 判断有无token 没有则跳转的登录页
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <DocumentTitle title="关于">
        <div className="about">
          <div className="about-title">
            <NavLink to="myCenter">
              <span className="about-title-back" />
            </NavLink>
            <p className="about-title-name">关于</p>
          </div>
          <div className="about-rise">
            <p className="about-rise-title">简介</p>
            <p className="about-rise-box">
              <span className="about-rise-content">
              绿叶超市是一款优质的互联网超市购物平台，绿叶超市你手中的超市网购神器，在家就能享受逛超市的快感，喜欢购物的你还不快来下载体验。
              </span>
            </p>
          </div>
          <div className="about-score">
            <p className="about-score-title">积分规则</p>
            <div className="about-score-content">
              <p className="about-score-exchange">
                <span className="about-score-offset">100个积分可抵消1元</span>
                <span className="about-score-reward">
                  每消费1元可拥有1个积分
                </span>
              </p>
              <p className="about-score-level">
                <span className="score-level1">积分 0</span>
                <span className="score-level2">积分 &gt; 1000</span>
                <span className="score-level3">积分 &gt; 2000</span>
                <span className="score-level4">积分 &gt; 5000</span>
                <span className="score-level5">积分 &gt; 10000</span>
                <span className="score-level6">积分 &gt; 30000</span>
                <span className="score-level7">积分 &gt; 50000</span>
              </p>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default AboutPage;
