import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';

class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightW: 0,
            lightH: 0,
        };
    }

    static defaultProps = {
        title: '标题',
        router: 'no'
    }

    componentWillMount() {
        if (this.props.router === 'no') {
            this.setState({
                lightW: 0,
                lightH: 0,
            });
        } else {
            this.setState({
                lightW: 40,
                lightH: 40,
            });
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <TouchableHighlight onPress={this.props.click && this.props.click.bind(this)} underlayColor={'#FFDDAA'}
                                    style={[styles.arrowlight, {height: this.state.lightH, width: this.state.lightW}]}>
                    {/*<View style={styles.arrow}/>*/}
                    <Image source={require('../res/images/back.png')} style={styles.arrow}></Image>
                </TouchableHighlight>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 60,
        backgroundColor: '#FFBB00',
        elevation: 10,
    },

    title: {
        position: 'absolute',
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center',
        bottom: 5
    },
    arrow: {
        position: 'absolute',
        width: 24,
        height: 24,
        // borderWidth: 2,
        // borderBottomColor: '#fff',
        // borderLeftColor: '#fff',
        // borderRightColor: '#FFBB00',
        // borderTopColor: '#FFBB00',
        left: 20,
        marginLeft: -12,
        marginTop: -12,
        top: 20,
        // transform: [{rotate: '45deg'}],
    },
    arrowlight: {
        overflow: 'hidden',
        display: 'none',
        borderRadius: 20,
        position: 'absolute',
        backgroundColor: '#FFBB00',
        left: 10,
        bottom: 2,
    },
});
export default ToolBar;