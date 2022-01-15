import * as React from 'react';
import logo from './logo.svg';
import FeatherMenu from './assets/svg/FeatherMenu';
import FeatherBell from './assets/svg/FeatherBell';
import FeatherHome from './assets/svg/FeatherHome';
import { Flex } from './components/Structure';
import Browse from './views/Browse';
import styled from 'styled-components';
import FeatherCompass from './assets/svg/FeatherCompass';
import EosIconsSubscriptionsCreatedOutlined from './assets/svg/EosIconsSubscriptionsCreatedOutlined';
import MdiPlaylistPlay from './assets/svg/MdiPlaylistPlay';

const Search = (): JSX.Element => {
  return (
    <Flex>
      <input type="text" placeholder="Search..." />
      <div>
        <button>Search</button>
      </div>
    </Flex>
  );
};


const Aside = styled.aside`
  text-align: center;
`;

const IconLabel = styled.div`
  & > *:first-child {
    margin: auto;
  }

`

const Profile = (): JSX.Element => {
  return (
    <span>
      <img src={logo} alt="logo" width="50" height="50" />
    </span>
  );
};

const App = (): JSX.Element => {
  return (
    <div className="App" >
      <Flex as="nav" justify='space-between'>
        <Flex as="section">
          <FeatherMenu />
          <img src={logo} className="App-logo" alt="logo" width="50" height="50" />
          <h1>FramaMotion</h1>
        </Flex>
        <section>
          <Search />
        </section>
        <Flex as="section">
          <span>Upload</span>
          <FeatherBell />
          <Profile />
        </Flex>
      </Flex>

      <Flex>
        <Aside>
          <IconLabel>
            <FeatherHome />
            <h4>Home</h4>
          </IconLabel>
          <IconLabel>
            <FeatherCompass />
            <h4>Explore</h4>
          </IconLabel>
          <IconLabel>
            <EosIconsSubscriptionsCreatedOutlined />
            <h4>Subscription</h4>
          </IconLabel>
          <IconLabel>
            <MdiPlaylistPlay />
            <h4>Playlist</h4>
          </IconLabel>

        </Aside>
        <main>
          <Browse />

        </main>
      </Flex>
    </div>
  );
}

export default App;
