import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { recommendation, user } from '../../../modules/entities';
import { getRecommendations } from '../../../modules/recommendations/get';
import { setDeckCount } from '../../../modules/recommendations/deck';
import LeftPanel from '../../../components/LeftPanel';
import WorldMap from '../../../helpers/WorldMap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography, Tabs, Badge } from 'antd';
import { GiSnail, GiPathDistance } from 'react-icons/gi';
import { FaGlobeAfrica } from 'react-icons/fa';

import {
  HeartFilled,
  ExperimentFilled
} from '@ant-design/icons';
const { TabPane } = Tabs;
const { Paragraph } = Typography;


const responsive = {
  superLargeDesktop: {    
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 30
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class DiscoverPage extends React.Component {
  componentDidMount = () => {
      const { getRecommendations } = this.props;
      getRecommendations();
  };

  galleryTabChange = key => {
    console.log(key);
  };

  render() {
    const { recommendationDeck, deckCount } = this.props;
    const recommendedPenpal = recommendationDeck[deckCount] ? recommendationDeck[deckCount].user : null;
    console.log('recommendedPenpal', recommendedPenpal);
    return (
      <div className="discover-page">
        <LeftPanel />
        {recommendedPenpal && recommendedPenpal.country ?
        <div className="user-stack">
          <div className="user-cover">
          <WorldMap
            countryOfEmphasis={recommendedPenpal.country.name}
            longitude={recommendedPenpal.country.longitude}
            latitude={recommendedPenpal.country.latitude}
            zoom={2}
            style={{ width: "100%", height: "auto", transform: 'translate(0, calc(-50% + 120px))' }} />
            <div className="cover-overlay" />
              <div className="cover-details">
                <h1>{recommendedPenpal.username}</h1>
                <h4 >{recommendedPenpal.age}</h4>
              </div>
          </div>
          <div className="information-section">
            <div className="text-wall">
              <div className="about-me">
                <h4>About Me</h4>
                <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>{recommendedPenpal.about}</Paragraph>
              </div>
              <div className="looking-for">
                <h4>Looking For</h4>
                <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>{recommendedPenpal.looking_for}</Paragraph>
              </div>
            </div>
            <div className="user-gallery">
              <div className="user-info-cards">
                <h4>Location</h4>
                <div className="card-container">
                  <div className="card">
                    <div className ="icon-container snail">
                      <GiSnail className="icon" />
                    </div>
                  </div>
                  <div className="card">
                    <div className ="icon-container world">
                      <FaGlobeAfrica className="icon" />
                    </div>
                  </div>
                  <div className="card">
                    <div className ="icon-container distance">
                      <GiPathDistance className="icon" />
                    </div>
                  </div>
                </div>
              </div>
              <Tabs defaultActiveKey="1" onChange={this.galleryTabChange} className="user-interest-tabs">
                <TabPane tab="Interests" key="1">
                  <Carousel
                  responsive={responsive}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  itemClass="carousel-item"
                  slidesToSlide={1}
                  >
                    {
                      recommendedPenpal.interests.map((interest, i) => {
                        return(
                          <div key={i} className="content-container">
                            <img alt={interest.activity} src={interest.img}></img>
                            <div className="details-container">
                              <Paragraph ellipsis>{interest.activity}</Paragraph>
                              <div className="stat-container">
                                <HeartFilled className="stat-icon" />
                                <Badge count={interest.likes} overflowCount={999} className="stat-badge" />
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </Carousel>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        : null }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    currentUser: denormalize(store.auth.currentUser.id, user, store.entities),
    deckCount: store.recommendations.deck.count,
    recommendationDeck: denormalize(store.recommendations.get.recommendations, [recommendation], store.entities),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendations: () => dispatch(getRecommendations()),
    setDeckCount: (count) => dispatch(setDeckCount(count))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
