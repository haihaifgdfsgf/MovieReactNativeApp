import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: "#ffffff"
    },
    lightitem: {
        marginHorizontal:15,
        marginVertical:15,
        borderRadius:10,
        elevation:10,
        overflow:'hidden',
        backgroundColor:'#FFBB00'
    }
});
export default styles;