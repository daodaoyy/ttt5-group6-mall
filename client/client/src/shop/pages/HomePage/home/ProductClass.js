import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './home.less';

class ProClass extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="proclass">
        <div className="partclass">
          <div className="entry-item">
            <NavLink to="/classificationProduct/1">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class1.png') }
                  width="98%"
                  height="98%"
                  alt="个人护理"
                />
              </div>
              <div className="entry-item-name">
                <span>个人护理</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/2">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class2.png') }
                  width="98%"
                  height="98%"
                  alt="日用百货"
                />
              </div>
              <div className="entry-item-name">
                <span>日用百货</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/3">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class3.png') }
                  width="98%"
                  height="98%"
                  alt="生鲜冷藏"
                />
              </div>
              <div className="entry-item-name">
                <span>生鲜冷藏</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/4">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class4.png') }
                  width="98%"
                  height="98%"
                  alt="乳饮酒水"
                />
              </div>
              <div className="entry-item-name">
                <span>乳饮酒水</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/5">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class5.png') }
                  width="98%"
                  height="98%"
                  alt="面点素食"
                />
              </div>
              <div className="entry-item-name">
                <span>面点素食</span>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="partclass">
          <div className="entry-item">
            <NavLink to="/classificationProduct/6">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class6.png') }
                  width="98%"
                  height="98%"

                  alt="数码电器"
                />
              </div>
              <div className="entry-item-name">
                <span>数码电器</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/7">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class7.png') }
                  width="98%"
                  height="98%"
                  alt="家用纺织"
                />
              </div>
              <div className="entry-item-name">
                <span>家用纺织</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/8">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class8.png') }
                  width="98%"
                  height="98%"
                  alt="坚果蜜饯"
                />
              </div>
              <div className="entry-item-name">
                <span>坚果蜜饯</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/9">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class9.png') }
                  width="98%"
                  height="98%"
                  alt="纸品家清"
                />
              </div>
              <div className="entry-item-name">
                <span>纸品家清</span>
              </div>
            </NavLink>
          </div>
          <div className="entry-item">
            <NavLink to="/classificationProduct/10">
              <div className="entry-item-img">
                <img
                  src={ require('../../../../images/class10.png') }
                  width="98%"
                  height="98%"
                  alt="粮油米面"
                />
              </div>
              <div className="entry-item-name">
                <span>粮油米面</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default ProClass;
