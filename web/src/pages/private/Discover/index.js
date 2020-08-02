import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import LeftPanel from '../../../components/LeftPanel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography, Tabs, Badge } from 'antd';
import {
  HeartFilled
} from '@ant-design/icons';
const { TabPane } = Tabs;
const { Paragraph, Text } = Typography;

const mock = {
  username: 'Sunflower95',
  age: 25,
  aboutMe: "Hey, not sure what i’m going to find on here, probably some creeps, but I like creative guys and always down to collaborate at my favourite nerdy pizza bar Diablos in Brooklyn.",
  lookingFor: "I’m looking for a snail mail pen pal so I have something to look forward to. I really don’t have any friends so this would be something fun to do. I’m an outdoorsman. I love hunting, fishing (especially fly fishing which I just got into), entomology, reading, music, painting, and anything nature. Covid has made everything a lot harder than it should have. Although I work at a pharmacy so I still work. Anyone interested just hit me up. Doesn’t matter who you are. Just looking forward to maybe getting to know someone. Thanks!",
  interests: [
    {name: 'Travelling', img: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80', likes: 1255},
    {name: 'Snowboarding', img: 'https://images.unsplash.com/photo-1576837839711-7db60e14a18f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', likes: 25},
    {name: 'Workout', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', likes: 12},
    {name: 'Gaming', img: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', likes: 1},
  ]
};
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
  galleryTabChange = key => {
    console.log(key);
  };

  render() {
    return (
      <div className="discover-page">
        <LeftPanel />
        <div className="user-stack">
          <div className="user-cover">
            <div className="cover-details">
              <h1>{mock.username}</h1>
              <h4 >{mock.age}</h4>
            </div>
          </div>
          <div className="information-section">
            <div className="text-wall">
              <div className="about-me">
                <h4>About Me</h4>
                <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>{mock.aboutMe}</Paragraph>
              </div>
              <div className="looking-for">
                <h4>Looking For</h4>
                <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>{mock.lookingFor}</Paragraph>
              </div>
            </div>
            <div className="user-gallery">
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
                  mock.interests.map((interest, i) => {
                    return(
                      <div key={i} className="content-container">
                        <img src={interest.img}></img>
                        <div className="details-container">
                          <Paragraph ellipsis>{interest.name}</Paragraph>
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
              <TabPane tab="Music" key="2">
                Music
              </TabPane>
              <TabPane tab="Movies" key="3">
                Movies
              </TabPane>
              <TabPane tab="TV Shows" key="4">
                TV Shows
              </TabPane>
            </Tabs>
            <div className="user-location">
              <h4>Location</h4>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoverPage;
