import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getActivity } from '@/api/product';
import './home.less';

class ActivityEntry extends Component {
  constructor() {
    super();
    this.state = {
      cover: '',
      id: 0,
      ifActivity: false,
    };
  }

  componentDidMount() {
    getActivity().then(res => {
      if (res.data.data.length) { // 有活动
        this.setState({
          cover: res.data.data[0].cover,
          id: res.data.data[0].id,
          ifActivity: true,
        });
      } else { // 无活动
        this.setState({
          ifActivity: false,
        });
      }
    });
  }

  render() {
    const states = this.state;
    const activityId = `/activity/${states.id}`;
    if (states.ifActivity) {
      return (
        <div className="activityEnty">
          <NavLink to={ activityId }>
            <div className="entry">
              <img
                src={ states.cover }
                alt="活动入口"
              />
            </div>
          </NavLink>
        </div>
      );
    }
    return (
      <div className="noActivity" />
    );
  }
}

export default ActivityEntry;
