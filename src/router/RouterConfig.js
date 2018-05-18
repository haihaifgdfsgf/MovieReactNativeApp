import React from 'react';
import {StackNavigator} from 'react-navigation';
import MainTabPage from '../pages/MainTabPage';
const RouterConfig = StackNavigator({
    Home: {
        screen: MainTabPage,
        navigationOptions:{
            headerStyle: {height: 0,backgroundColor:'#FFBB00'},
            headerTitleStyle:{textAlign:'center',backgroundColor:'red',flex:1,fontSize:14},
            headerTitle:"热映榜",
        }
    },

});
export default RouterConfig;