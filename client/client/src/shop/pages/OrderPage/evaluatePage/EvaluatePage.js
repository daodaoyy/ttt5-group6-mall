/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import './EvaluatePage.less';
import '../common.less';
import EvaluateScore from './EvaluateScore';
import EvaluateContent from './EvaluateContent';
import orderApi from '@/api/order';
import creatHistory from 'history/createHashHistory'; // 返回上一页这段代码

class EvaluatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      evalueateList: []
    };
  }

  componentDidMount() {
    // 判断有无token 没有则跳转的登录页
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      const evaluateOid = localStorage.getItem('evaluateOid');
      const evaluateProData = localStorage.getItem('evaluateProducts');
      this.setState({
        oid: evaluateOid,
        productsData: JSON.parse(evaluateProData)
      });
    }
  }
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  getChildStarts(index, pid) {
    this.setState(state => {
      state.data.map(item => {
        if (item.pid === pid) {
          item.score = index;
        }
      });
    });
    this.setState({ score: index });
  }

  getChildContents(detal, pid) {
    const content = { pid, content: detal };
    this.state.data.push(content);
    this.setState({ contentValue: detal });
  }

  handleClickButton() {
    const mapChatList = a => {
      const result = Object.values(
        a.reduce((m, n) => {
          if (!m[n.pid]) {
            m[n.pid] = { pid: n.pid, list: [] };
          }
          m[n.pid].list.push(n);
          return m;
        }, {})
      );
      return result.map(item => item.list);
    };
    const evaluateArray = mapChatList(this.state.data);
    for (let i = 0; i < evaluateArray.length; i++) {
      const newObj = {};

      for (let j = 0; j < evaluateArray[i].length; j++) {
        Object.assign(newObj, evaluateArray[i][j]);
      }
      newObj.oid = this.state.oid;
      if (!newObj.content) {
        switch (newObj.score) {
          case 1:
            newObj.content = '默认一星差评';
            break;
          case 2:
            newObj.content = '默认两星差评';
            break;
          case 3:
            newObj.content = '默认三星中评';
            break;
          case 4:
            newObj.content = '默认四星好评';
            break;
          case 5:
            newObj.content = '默认五星好评';
            break;
          default:
        }
        orderApi.postEvaluate(newObj);
        localStorage.removeItem('evaluateOid');
        localStorage.removeItem('evaluateProducts');
        setTimeout(()=>{
          this.props.history.push('/orderList?type=4');
        }, 100);
      } else {
        orderApi.postEvaluate(newObj);
        localStorage.removeItem('evaluateOid');
        localStorage.removeItem('evaluateProducts');
        setTimeout(()=>{
          this.props.history.push('/orderList?type=4');
        }, 100);
      }
    }
  }

  render() {
    const { contentValue } = this.state;
    const { productsData } = this.state;
    const history = creatHistory(); // 返回上一页这段代码

    return (
      <DocumentTitle title="评价">
        <div className="evaluate">
          <div className="header-title">
            <span
              className="header-title-back"
              onClick={ () => history.goBack() }
            />
            <p className="header-title-name">评价</p>
            <Button
              type="primary"
              inline
              size="small"
              style={ { marginRight: '4px' } }
              onClick={ () => this.handleClickButton() }
            >
              发布
            </Button>
          </div>
          <ul>
            { productsData &&
              productsData.map(item => (
                <li key={ item.pid }>
                  <div
                    style={ {
                      marginTop: '1.05rem'
                    } }
                  >
                    <div>
                      <WhiteSpace size="lg" />
                      <EvaluateScore
                        item={ item }
                        parentGetChildStarts={ this.getChildStarts.bind(this) }
                      />
                      <WhiteSpace size="lg" />
                      <EvaluateContent
                        item={ item }
                        contentValue={ contentValue }
                        parentGetChildContents={ this.getChildContents.bind(
                          this
                        ) }
                      />
                    </div>
                  </div>
                </li>
              )) }
          </ul>
        </div>
      </DocumentTitle>
    );
  }
}

export default EvaluatePage;
