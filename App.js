/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import HotMovieList from './src/components/HotMovieList';
import RouterConfig from './src/router/RouterConfig';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <RouterConfig/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
