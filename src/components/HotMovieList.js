/**
 * 热映榜
 */
import React, {Component} from 'react';
import {View, Text, ToastAndroid, FlatList, TouchableHighlight, RefreshControl, ActivityIndicator} from 'react-native';
import styles from '../res/styles/HotMovieListStyle';
import HttpUrlConfig from '../util/HttpUrlConfig';
import HotMovieItem from './HotMovieItem';

class HotMovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hostMovies: [],
            refreshing: false,
            firstUpdata: true,

        }
        this.start = 0;
        this.total = 0;
        this.pageSize = 5;
        this.pageTotal = 0;
        this.updata = false;
        //因为第一次进入和第一次下拉刷新的时候也会执行onEndReached所以需要一个标志位，第一次上拉加载不加载数据
        this.isFirstUpLoading = true;
    }

    static navigationOptions = {
        headerStyle: {height: 0},
    }

    componentDidMount() {
        this.queryHotMovies(0);
    }

    queryHotMovies(type) {
        alert('waim:' + type);
        if (!this.updata) {
            this.updata = true;
            if (type === 0) {
                this.start = 0;
                this.total = 0;
                this.pageTotal = 0;
                this.setState({
                    refreshing: true,
                });
            }
            if (type === 0 || (type === 1 && this.start <= this.pageTotal && !this.isFirstUpLoading)) {
                alert('shuashua:' + this.start)
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
                            if (type === 0) {
                                this.setState({
                                    hostMovies: [],
                                });
                            }
                            let arr = this.state.hostMovies.concat(rs.subjects);
                            this.setState({
                                hostMovies: arr,
                                firstUpdata: false,
                                refreshing: false,
                            });
                        } else {
                            this.setState({
                                firstUpdata: false,
                            });
                            ToastAndroid.show('稍后再试', ToastAndroid.LONG)
                        }
                        this.updata = false;
                    })
                    .catch(e => {
                        this.updata = false;
                        this.setState({
                            firstUpdata: false,
                        });
                        console.log(e);
                    })
                    .done();
            } else {
                if (type === 1 && this.isFirstUpLoading) {
                    this.isFirstUpLoading = false;
                } else {
                    ToastAndroid.show('数据已全部加载', ToastAndroid.LONG)
                }
                this.updata = false;
            }
        }
    }

    itemClick(item) {
    }

    _renderFooter() {
        //正在下拉就不显示上啦
        if (this.state.refreshing) {
            return null;
        }
        if (this.start > this.pageTotal) {
            return (
                <View style={styles.listfooter}>
                    <Text style={styles.listfootertext}>{'我已加载完咯，请不要再拉我了'}</Text>
                </View>);
        } else {
            return (
                <View style={styles.listfooter}>
                    <ActivityIndicator
                        size={"large"}
                        color={'#6435c9'}
                    />
                </View>);
        }
    }


    render() {
        if (this.state.firstUpdata) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator
                        size={"large"}
                        color={'#6435c9'}
                    />
                </View>
            );
        }
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            onRefresh={this.queryHotMovies.bind(this, 0)}
                        />}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={this.queryHotMovies.bind(this, 1)}
                    onEndReachedThreshold={10}
                ></FlatList>
            </View>
        )
            ;
    }
}

export default HotMovieList;