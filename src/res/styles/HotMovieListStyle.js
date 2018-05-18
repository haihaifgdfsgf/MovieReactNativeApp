import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: "#ffffff"
    },
    lightitem: {
        marginHorizontal: 15,
        marginVertical: 15,
        borderRadius: 10,
        elevation: 10,
        overflow: 'hidden',
        backgroundColor: '#FFBB00'
    },
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listfooter: {
        marginBottom:60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listfootertext:{
      fontSize:12,
      color:'#666',
    }
});
export default styles;