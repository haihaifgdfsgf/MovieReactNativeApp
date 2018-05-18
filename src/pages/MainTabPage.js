import React, {Component} from 'react';

import {Image} from 'react-native';

//引入react-navigation依赖库
import {TabNavigator} from 'react-navigation';

//展示的页面
import HotMovieList from '../components/HotMovieList';
import WordOfMouthList from '../components/WordOfMouthList';
import NewsMovieList from '../components/NewsMovieList';

//Tab
const MyTab = TabNavigator({
        //每一个页面的配置
        Home: {
            screen: HotMovieList,
            navigationOptions: {
                tabBarLabel: '热映榜',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../res/images/hot_light.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}
                    />
                ),
            },
        },
        WordOfMouthList: {
            screen: WordOfMouthList,
            navigationOptions: {
                tabBarLabel: '口碑榜',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../res/images/koubei.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}/>
                ),
            }
        },
        NewsMovieList: {
            screen: NewsMovieList,
            navigationOptions: {
                tabBarLabel: '新片版',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../res/images/new_movie.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}/>
                ),
            }
        },
    },
    {
        //设置TabNavigator的位置
        tabBarPosition: 'bottom',
        //是否在更改标签时显示动画
        animationEnabled: true,
        //是否允许在标签之间进行滑动
        swipeEnabled: false,
        //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        backBehavior: "none",
        //设置Tab标签的属性

        tabBarOptions: {
            //Android属性
            upperCaseLabel: false,//是否使标签大写，默认为true
            //共有属性
            showIcon: true,//是否显示图标，默认关闭
            showLabel: true,//是否显示label，默认开启
            activeTintColor: 'red',//label和icon的前景色 活跃状态下（选中）
            inactiveTintColor: 'white',//label和icon的前景色 活跃状态下（未选中）
            style: { //TabNavigator 的背景颜色
                backgroundColor: '#FFBB00',
                height: 45,
            },
            indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
                height: 0,
                backgroundColor:'red'
            },
            labelStyle: {//文字的样式
                fontSize: 12,
                marginTop: -5,
                marginBottom: 5,
                minWidth:60
            },
            iconStyle: {//图标的样式
                marginBottom: 2,
                marginTop:-5,
            }
        },

    });
export default MyTab;