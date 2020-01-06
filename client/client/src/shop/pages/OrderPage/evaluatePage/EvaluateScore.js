import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './EvaluateScore.less';

// 通过路由id获取商品信息，来评论，待做

class EvaluateScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [ 1, 2, 3, 4, 5 ],
      startIndex: 5,
    };
  }

  componentDidMount() {
    this.handleStarts(this.state.startIndex, this.props.item.pid);
  }

  handleStarts(index, pid) {
    this.setState({ startIndex: index });
    this.props.parentGetChildStarts(index, pid);
  }

  render() {
    const proInfo = this.props.item;
    const { startIndex, arr } = this.state;
    return (
      <div className="evaluate">
        <div className="evaluate-title">
          <img
            src={ proInfo.cover[0] }
            width="60"
            height="60"
            alt="商品图片"
          />
        </div>
        <span className="first-evaluate-startFive">
          { arr.map(item => (
            <span
              className="startFive"
              key={ item }
            >
              <span
                onClick={ () => { this.handleStarts(item, proInfo.pid); } }
                style={ { color: '#FFAC2D', fontSize: '30px' } }
              >
                { startIndex >= item ? '★' : '☆' }
              </span>
            </span>
          )) }
        </span>
      </div>
    );
  }
}

EvaluateScore.propTypes = {
  handleStarts: PropTypes.func,
  startIndex: PropTypes.number,
  arr: PropTypes.array,
};

export default EvaluateScore;
