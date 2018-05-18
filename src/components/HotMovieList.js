/**
 * 热映榜
 */
import React, {Component} from 'react';
import {View, Text, ToastAndroid, FlatList, TouchableHighlight, RefreshControl, ActivityIndicator} from 'react-native';
import styles from '../res/styles/HotMovieListStyle';
import HttpUrlConfig from '../util/HttpUrlConfig';
import HotMovieItem from './HotMovieItem';
import ToolBar from './ToolBar';

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
        this.currentPage = 0;
        this.pageSize = 5;
        this.pageTotal = 0;
        this.updata = false;
    }

    // static navigationOptions = {
    //     headerStyle: {height: 20,backgroundColor:'red'},
    //     title:'热映榜'
    // }

    componentDidMount() {
        this.queryHotMovies(0);
    }

    queryHotMovies(type) {
        console.log('waimian:' + type);
        console.log('waimianstart:' + this.start);
        if (!this.updata) {
            this.updata = true;
            if (type === 0) {
                this.start = 0;
                this.total = 0;
                this.pageTotal = 0;
                this.currentPage = 0;
                this.setState({
                    refreshing: true,
                });
            }
            if (this.currentPage <= this.pageTotal) {
                let start = this.currentPage * this.pageSize;
                let param = {start: start, count: this.pageSize};
                let url = HttpUrlConfig.getNormal(HttpUrlConfig.QUERY_HOT_MOVIE, param)
                fetch(url)
                    .then(response => response.text())
                    .then(responseStr => {
                        let rs = JSON.parse(responseStr);
                        let code = rs.code;
                        if (code !== 112) {
                            //计算总共有多少页
                            this.pageTotal = Math.ceil(parseFloat(rs.total) / this.pageSize);
                            this.start = rs.start;
                            this.total = rs.total;
                            this.currentPage++;
                            if (type === 0) {
                                this.setState({
                                    hostMovies: [],
                                });
                            }
                            // let arr = this.state.hostMovies.concat(rs.subjects);
                            let arr = this.state.hostMovies.slice().concat(rs.subjects)
                            console.log(rs.subjects);
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
                if (type === 1) {
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
        if (this.currentPage > this.pageTotal) {
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
                    <ToolBar  title={'热映榜'} router={'no'}/>
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
                    onEndReachedThreshold={0.1}
                ></FlatList>
            </View>
        )
            ;
    }
}

export default HotMovieList;