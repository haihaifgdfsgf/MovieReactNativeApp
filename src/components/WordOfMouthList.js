/**
 *
 * 口碑榜
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../res/styles/WordOfMouthListStyle';

class WordOfMouthList extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        headerStyle: {height: 0},
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{'我是口碑榜'}</Text>
            </View>
        );
    }
}

export default WordOfMouthList;