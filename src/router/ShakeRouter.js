import React from 'react';
import Navigation from '../navigation';
import {NavigationService} from '../common';

const ShakeRouter: () => React$Node = () => {
  return (
    <Navigation
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  )
};

export default ShakeRouter;
