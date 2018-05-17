/**
 * 热映榜
 */
import React, {Component} from 'react';
import {View, Text, ToastAndroid, FlatList, TouchableHighlight, RefreshControl} from 'react-native';
import styles from '../res/styles/HotMovieListStyle';
import HttpUrlConfig from '../util/HttpUrlConfig';
import HotMovieItem from './HotMovieItem';

class HotMovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostMovies: [],
            refreshing: false,
        }
        this.start = 0;
        this.total = 0;
        this.pageSize = 5;
        this.pageTotal = 0;
    }

    static navigationOptions = {
        headerStyle: {height: 0},
    }

    componentDidMount() {
        this.queryHotMovies();
    }

    queryHotMovies() {
        if (this.start <= this.pageTotal) {
            let param = {start: this.start, count: this.pageSize};
            let url = HttpUrlConfig.getNormal(HttpUrlConfig.QUERY_HOT_MOVIE, param)
            fetch(url)
                .then(response => response.text())
                .then(responseStr => {
                    let rs = JSON.parse(responseStr);
                    let code = rs.code;
                    if (code !== 112) {
                        //计算总共有多少页
                        this.pageTotal = Math.ceil(parseFloat(rs.total) / this.pageSize);
                        this.start = rs.start++;
                        this.total = rs.total;
                        let arr = this.state.hostMovies.concat(rs.subjects);
                        this.setState({
                            hostMovies: arr,
                        });
                    } else {
                        ToastAndroid.show('稍后再试', ToastAndroid.LONG)
                    }
                })
                .catch(e => {
                    console.log(e);
                })
                .done();
        } else {
            ToastAndroid.show('数据已全部加载', ToastAndroid.LONG)
        }
    }

    itemClick(item) {
    }

    render() {
        return (
            <View sytle={styles.container}>
                <FlatList
                    data={this.state.hostMovies}
                    renderItem={({item}) => {
                        return (
                            <TouchableHighlight style={styles.lightitem}
                                                underlayColor={'#ddd'}
                                                onPress={this.itemClick.bind(this, item)}>
                                <HotMovieItem movie={item}/></TouchableHighlight>
                        );
                    }}
                    keyExtractor={item => item.id}
                ></FlatList>
            </View>
        );
    }
}

export default HotMovieList;