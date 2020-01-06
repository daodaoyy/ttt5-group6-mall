import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { getProductEvaluateList } from '@/api/product';
import creatHistory from 'history/createHashHistory';
const history = creatHistory();
import './allevaluate.less';

class EvaluateListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluateList: [],
    };
  }

  componentDidMount() {
    const evaluateProductId = this.props.match.params.id;
    getProductEvaluateList(evaluateProductId).then(res => {
      const evaluateList1 = res.data.data.map(item => {
        const arr = [];
        for (let i = 0; i < item.score; i++) {
          arr.push(1);
        }
        return {
          avatar: item.avatar,
          content: item.content,
          createTime: item.createTime,
          id: item.id,
          nickname: item.nickname,
          score: arr,
        };
      });
      this.setState({ evaluateList: evaluateList1 });
    });
  }

  render() {
    const states = this.state;
    const items = states.evaluateList.map(item => (
      <li
        className="everyEvaluate"
        key={ item.id }
      >
        <div className="first-evaluate-user">
          <img
            src={ item.avatar }
            alt="头像"
          />
          <span className="first-evaluate-username">{ item.nickname }</span>
          <span className="first-evaluate-startFive">
            {
              // eslint-disable-next-line arrow-body-style
              item.score.map((item1, index) => {
                return (
                  <span key={ index }>
                    { item1 >= item1.Star ? <span style={ { color: '#3cbc34', fontSize: '30px' } }>☆</span> : <span style={ { color: '#3cbc34', fontSize: '30px' } }>★</span> }
                  </span>
                );
              })
            }
          </span>
          <span className="evaluate-date">{ item.createTime }</span>
        </div>
        <div className="evaluate-content">
          <span>{ item.content }</span>
        </div>
      </li>
    ));
    return (
      <DocumentTitle title="评价">
        <div className="allevaluate">
          <div className="about-title">
            <span onClick={ () => history.go(-1) }
              className="about-title-back"
            />
            <p className="about-title-name">评价</p>
          </div>
          <ul className="first-evaluate">
            { items }
          </ul>
        </div>
      </DocumentTitle>
    );
  }
}

export default EvaluateListPage;
