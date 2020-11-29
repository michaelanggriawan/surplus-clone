import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from './context/globalAccess';

import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <RootStack />
      </Provider>
    </NavigationContainer>
  );
}
