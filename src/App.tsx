import * as React from 'react';
import logo from './logo.svg';
import FeatherMenu from './assets/svg/FeatherMenu';
import FeatherBell from './assets/svg/FeatherBell';

const Search = (): JSX.Element => {
  return (
    <div>
      <input type="text" placeholder="Search..." />
      <div>
        <button>Search</button>
      </div>
    </div>
  );
};

const Profile = (): JSX.Element => {
  return (
    <div>
      <img src={logo} alt="logo" width="60" height="60" />
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div className="App">
      <nav>
        <section>
          <FeatherMenu />
          <img src={logo} className="App-logo" alt="logo" width="60" height="60" />
          <h1>FramaMotion</h1>
        </section>
        <section>
          <Search />
        </section>
        <section>
          <span>Upload</span>
          <FeatherBell />
          <Profile />
        </section>
      </nav>
    </div>
  );
}

export default App;
