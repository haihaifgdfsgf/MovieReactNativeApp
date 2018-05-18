import React ,{Component} from 'react';
import {View,Text} from 'react-native';
import styles from '../res/styles/NewsMovieListStyle';
import ToolBar from './ToolBar';
class NewsMovieList extends Component{
    constructor(props){
        super(props);
    }
    render(){
      return(
          <View style={styles.container}>
              <ToolBar  title={'新片榜'} router={'no'}/>
              <Text style={styles.text}>{'我是新片榜'}</Text>
          </View>
      );
    };
}
export default NewsMovieList;