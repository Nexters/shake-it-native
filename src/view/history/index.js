import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';

const iconImage = {
    food: require('../../assets/icons/food.png'),
    smile: require('../../assets/icons/smile.png'),
    path: require('../../assets/icons/path.png'),
    money: require('../../assets/icons/money.png')
}

const HistoryDetail = (e) => {
    const history = e.navigation.state.params.data;
    const icons = ['food', 'path', 'money', 'smile']
    
    const iconImages = icons.map(icon => (
        <View style={[styles.iconWrapper, styles.icon, icon === history.icon ? styles[icon] : '']}>
            <Image 
                source={iconImage[icon]}
            />
        </View>
    ));

    const options = history.options.map((option, idx) => (
        <View style={styles.optionBox}>
            <Text style={[styles.optionIndex, styles[`${history.icon}Text`]]}>{`0${idx+1}`}</Text>
            <Text style={styles.optionText}>{option}</Text>
        </View>
    ))
    
    return (
        <View style={styles.background}>
            <View style={styles.historyHeader}>
                <Text style={{ color: '#fff'}}>&lt;</Text>
                <Text style={{ color: '#fff'}}>휴지통</Text>
            </View>
            <View>
                <View style={styles.iconBox}>
                    {iconImages}
                </View>
                <View style={styles.optionsBox}>
                    <Text style={styles.title}>{history.title}</Text>
                    <ScrollView style={styles.optionsBox}>
                        {options}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.btnBox}>
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={[styles.btnText, styles.saveText]}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shakeBtn}>
                    <Text style={[styles.btnText, styles.shakeText, styles[history.icon]]}>Shake it</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#111111',
    },
    historyHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 20
    },
    iconBox: {
        paddingLeft: 40,
        paddingRight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 10,
        marginLeft: 'auto',
        width: 55,
        height: 55,
        borderRadius: 27
    },
    icon: {
        backgroundColor: '#1b1b1b',
        borderRadius: 27
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
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#cecece',
        paddingBottom: 20,
        marginLeft: 26,
        marginRight: 26,
        marginBottom: 20
    },
    optionsBox: {
        marginLeft: 10,
        marginRight: 10

    },
    optionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    optionIndex: {
        fontSize: 20,
        marginRight: 10,
    },
    optionText: {
        fontSize: 24,
        color: '#fff'
    },
    foodText: {
        color: '#14a37b'
    },
    moneyText: {
        color: '#0279d4'
    },
    smileText: {
        color: '#5f5fed'
    },
    pathText: {
        color: '#8556e3'
    },
    btnBox: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnText: {
        backgroundColor: '#1b1b1b',
        padding: 20,
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    saveText: {
        color: '#9a9a9a',
    },
    saveBtn: {
        width: '40%',
        marginRight: 20
    },
    shakeText: {
        color: '#fff'
    },
    shakeBtn: {
        width: '40%',
    }
}) 

export default HistoryDetail;