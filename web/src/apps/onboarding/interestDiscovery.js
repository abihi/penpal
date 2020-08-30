import React, { Component } from 'react';
import './interestDiscovery.scss';
import {connect} from 'react-redux';
import {denormalize} from 'normalizr';
import {interest, user} from '../../modules/entities';
import {
  getAllInterests,
  filterSearchkey,
  filterClasses,
  filterTypes,
  setInterestFilterSearchkey,
  setInterestFilterClass,
  setInterestFilterType
} from '../../modules/interests/get';
import { AiFillHeart } from 'react-icons/ai';
import {Steps, Modal, Carousel, Avatar, Button, Typography} from 'antd';
const {Text} = Typography;


class InterestDiscovery extends Component {
  componentDidMount = () => {
      const {getAllInterests} = this.props;
      getAllInterests();
  };

  handleFilterSearchkeyChange = e => {
    const {setFilterSearchkey} = this.props;
    setFilterSearchkey(e.target.value);
  };

  handleFilterClassChange = e => {
    const {setFilterClass} = this.props;
    setFilterClass(e.target.value);
  };

  handleFilterTypeChange = e => {
    const {setFilterType} = this.props;
    setFilterType(e.target.value);
  };

  render() {
    return (
      <div className="interest-discovery">
        <div className="filter-panel">
        <p>Classes of interest</p>
        {
          Object.entries(filterClasses).map((item, i) => {
            const key = item[0];
            const val = item[1];
            return(
              <div key={i} className="neumorphic-checkbox-container">
                <input type="radio" checked={this.props.filterClass === val} value={val} className="neumorphic-checkbox-input" onChange={this.handleFilterClassChange} />
                <label className="neumorphic-checkbox-label">{val}</label>
              </div>
            );
          })
        }
        <p>Type of interest</p>
        {
          Object.entries(filterTypes).map((item, i) => {
            const key = item[0];
            const val = item[1];
            return(
              <div key={i} className="neumorphic-checkbox-container">
                <input type="radio" checked={this.props.filterType === val} value={val} className="neumorphic-checkbox-input" onChange={this.handleFilterTypeChange} />
                <label className="neumorphic-checkbox-label">{val}</label>
              </div>
            );
          })
        }
        </div>
        <div className="content-container">
        <h1>What are your interests?</h1>
        <h2>Like three (or more) interests for others to see</h2>
        <input
          type="text"
          placeholder="Search for your interests"
          className="interest-filter-input clean-text-input"
          onChange={this.handleFilterSearchkeyChange} />
          <div className="neumorphic-card-grid">
          {
            this.props.filteredInterests.map(interest => {
              return (
                <div key={interest.id} className="card-container">
                  <div className="neumorphic-card" key={interest.id}>
                    <img src={interest.img} className="neumorphic-card-image" />
                    {
                      this.props.currentUser && this.props.currentUser.interests && this.props.currentUser.interests.find(userInterest => userInterest.id === interest.id)
                      ? <div className="liked-overlay"><AiFillHeart className="like-icon" /></div> : null
                    }
                  </div>
                  <div className="card-details">
                    <Text ellipsis={true} className="card-title">{interest.activity}</Text>
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
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    currentUser: denormalize(store.auth.currentUser, user, store.entities),
    filteredInterests: denormalize(store.interests.get.filtered, [interest], store.entities),
    interests: denormalize(store.interests.get.interests, [interest], store.entities),
    filterType: store.interests.get.filterType,
    filterClass: store.interests.get.filterClass,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllInterests: () => dispatch(getAllInterests()),
    setFilterSearchkey :(searchkey) => dispatch(setInterestFilterSearchkey(searchkey)),
    setFilterClass: (filterClass) => dispatch(setInterestFilterClass(filterClass)),
    setFilterType: (filterType) => dispatch(setInterestFilterType(filterType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestDiscovery);
