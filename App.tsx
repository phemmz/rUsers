import React from 'react';
import { Provider } from 'react-redux';

import store from './src/app/store';
import UserList from './src/features/users/UserList';

const App = () => {
  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  );
};

export default App;
