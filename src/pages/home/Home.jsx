import React from 'react';
import {Bids, Header, Story, Main} from '../../components'


const Home = () => {

  return <div>
   <Header />
   <Main />
   <Bids title="Available NFT" more="true" />
   <Story />
  
  </div>;
};

export default Home;
