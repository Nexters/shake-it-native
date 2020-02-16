import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const iconImage = {
    food: require('../../../assets/icons/food.png'),
    smile: require('../../../assets/icons/smile.png'),
    path: require('../../../assets/icons/path.png'),
    money: require('../../../assets/icons/money.png')
}

export default ({ history }) => {
    const historyImageUrl = iconImage[history.icon]
    
    return (
        <>
            <View style={styles.historyCard}>
                <View style={[styles.iconBox, styles[history.icon]]}>
                    <Image 
                        source={historyImageUrl}
                    />
                </View>
                <Text style={styles.title}>
                    { history.title }
                </Text>
                <Text style={styles.selectBox}>
                    { history.options.join(', ')}
                </Text>
                <View style={styles.btnBox}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Shake it</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    historyCard: {
        backgroundColor: '#151515',
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 8,
        marginRight: 4,
    },
    iconBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 10,
        marginLeft: 'auto',
        width: 46,
        height: 46,
        borderRadius: 23
    },
    food: {
        backgroundColor: '#14a37b'
    },
    money: {
        backgroundColor: '#0279d4'
    },
    smile: {
        backgroundColor: '#5f5fed'
    },
    path: {
        backgroundColor: '#8556e3'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10
    },
    selectBox: {
        textAlign: 'center',
        color: '#808080',
        height: 60,
        overflow: 'hidden',
        marginBottom: 20
    },
    btnBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        width: 67,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#353535',
        padding: 5
    },
    btnText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});