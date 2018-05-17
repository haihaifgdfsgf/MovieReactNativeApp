import React, {Component} from 'react';
import {View,Image,StyleSheet,Text} from 'react-native'

 class HotMovieItem extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.image_content}>
                    <Image style={styles.image} source={{uri: this.props.movie.images.large}}/>
                </View>
                <View style={styles.movie_content}>
                    <Text style={styles.title_style}>{this.props.movie.title}</Text>
                    <Text style={styles.movie_info}>上映时间：{this.props.movie.year}年</Text>
                    <Text style={styles.movie_info}>豆瓣评分：{this.props.movie.rating.average}</Text>
                    <Text style={styles.movie_info}>类型：{this.props.movie.genres.join('/')}</Text>
                    <Text style={styles.movie_info}>主演：{this.props.movie.casts.map(item => item.name).join('/')}</Text>
                    <Text style={styles.movie_info}>导演：{this.props.movie.directors.map(item => item.name).join('/')}</Text>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    item: {
        flex: 1,
        height: 180,
        flexDirection: "row",
        borderRadius: 10,
        borderColor: "#efeff4",
        borderWidth: 1,
    },
    title_style: {
        color: "#000000",
        fontWeight: '600',
        fontSize: 18
    },
    image_content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    movie_content: {
        flex: 2,
        justifyContent: "center"
    },
    movie_info: {
        color: "#666666",
        fontSize: 14,
        marginTop: 5,
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 15,
    },
});
export default HotMovieItem;