import React from 'react';
import {StackNavigator} from 'react-navigation';
import MainTabPage from '../pages/MainTabPage';
const RouterConfig = StackNavigator({
    Home: {
        screen: MainTabPage,
        navigationOptions:{
            headerStyle: {height: 0},
        }
    },

});
export default RouterConfig;