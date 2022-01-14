import * as React from 'react';
import logo from './logo.svg';
import FeatherMenu from './assets/svg/FeatherMenu';
import FeatherBell from './assets/svg/FeatherBell';
import { Flex } from './components/Structure';

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

const Profile = (): JSX.Element => {
  return (
    <span>
      <img src={logo} alt="logo" width="60" height="60" />
    </span>
  );
};

const App = (): JSX.Element => {
  return (
    <div className="App" >
      <Flex as="nav" justify='space-between'>
        <Flex as="section">
          <FeatherMenu />
          <img src={logo} className="App-logo" alt="logo" width="60" height="60" />
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
    </div>
  );
}

export default App;
