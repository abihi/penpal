import React, { Component } from 'react';
import './interestDiscovery.scss';
import {connect} from 'react-redux';
import {denormalize} from 'normalizr';
import {interest, user} from '../../modules/entities';
import {getAllInterests} from '../../modules/interests/get';
import { AiFillHeart } from 'react-icons/ai';
import {Steps, Modal, Carousel, Avatar, Button, Typography} from 'antd';
const {Text} = Typography;


class InterestDiscovery extends Component {
  componentDidMount = () => {
      const {getAllInterests} = this.props;
      getAllInterests();
  };

  render() {
    return (
      <div className="interest-discovery">
        <div className="neumorphic-card-grid">
        {
          this.props.interests.map(interest => {
            return (
              <div className="card-container">
                <div className="neumorphic-card" key={interest.id}>
                  <img src={interest.img} className="neumorphic-card-image" />
                </div>
                <div className="card-details">
                  <Text className="card-title">{interest.activity}</Text>
                  <div className="icon-container">
                  <AiFillHeart className="like-icon" />
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    currentUser: denormalize(store.auth.currentUser, user, store.entities),
    interests: denormalize(store.interests.get.interests, [interest], store.entities),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllInterests: () => dispatch(getAllInterests()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestDiscovery);
