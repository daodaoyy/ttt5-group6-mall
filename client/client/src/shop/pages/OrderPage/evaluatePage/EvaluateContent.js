import React, { Component } from 'react';
// import { Button, WhiteSpace } from 'antd-mobile';
import { WhiteSpace } from 'antd-mobile';

class EvaluateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.parentGetChildContents('', this.props.item.pid);
  }

  handleContents(e, pid) {
    const { value } = e.target;
    this.setState({ evaluateContent: value });
    this.props.parentGetChildContents(value, pid);
  }

  render() {
    return (
      <div>
        <div className="evaluate-content">
          <textarea
            onChange={ e => {
              this.handleContents(e, this.props.item.pid);
            } }
            placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧"
          />
        </div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default EvaluateContent;
