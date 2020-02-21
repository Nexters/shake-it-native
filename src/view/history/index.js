import React, { useState } from 'react';
import { Alert, StyleSheet, ScrollView, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import realm from '../../data'
import NavigationService from '../../common/NavigationService';

const iconImage = {
    food: require('../../assets/icons/food.png'),
    smile: require('../../assets/icons/smile.png'),
    path: require('../../assets/icons/path.png'),
    money: require('../../assets/icons/money.png')
}

const HistoryDetail = (e) => {
    const [history, setHistory] = useState(e.navigation.state.params.data)
    const icons = ['food', 'path', 'money', 'smile']
    
    const iconImages = icons.map(icon => (
        <TouchableOpacity 
            onPress={() => {
                setHistory({...history, icon})
            }}
            style={[styles.iconWrapper, styles.icon, icon === history.icon ? styles[icon] : '']}>
            <Image 
                source={iconImage[icon]}
            />
        </TouchableOpacity>
    ));

    const options = history.options.map((option, idx) => (
        <View style={styles.optionBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.optionIndex, styles[`${history.icon}Text`]]}>{`0${idx+1}`}</Text>
                <TextInput style={styles.optionText}>{option}</TextInput>
            </View>
            <TouchableOpacity style={{right: 16}} onPress={() => setHistory({...history, options: history.options.filter(origin => origin !== option)})}>
                <Image
                    style={styles.cancel}
                    source={require('../../assets/img/cancel.png')}
                />
            </TouchableOpacity>
        </View>
    ))
    
    return (
        <View style={styles.background}>
            <View style={styles.historyHeader}>
                <TouchableOpacity onPress={() => NavigationService.back()}>
                    <Image
                        style={styles.headerImage}
                        source={require('../../assets/img/back.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('정말로 삭제하시겠습니까?', '삭제시 복구가 어렵습니다.', [
                    { text: '예', onPress: () => {
                        realm.write(() => {
                            realm.delete(history)
                        })
                        NavigationService.back()
                    }},
                    { text: '아니오'}
                ])}>
                    <Image 
                        style={styles.headerImage}
                        source={require('../../assets/img/delete.png')}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.iconBox}>
                    {iconImages}
                </View>
                <View style={styles.optionWrapper}>
                    <TextInput placeholder="선택지 주제를 입력해주세요" placeholderTextColor="#616161" style={styles.title}>{history.title}</TextInput>
                    <ScrollView contentContainerStyle={styles.optionsBox}>
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
        justifyContent: 'space-around'
    },
    historyHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 20
    },
    headerImage: {
        width: 28,
        height: 28, 
        resizeMode: 'cover'
    },
    iconBox: {
        paddingLeft: 40,
        paddingRight: 40,
        top: 20,
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
        borderBottomColor: '#212121',
        paddingBottom: 20,
        marginLeft: 26,
        marginRight: 26,
        marginBottom: 20
    },
    optionWrapper: {
        height: '77%',
        paddingBottom: 20
    },
    optionsBox: {
        marginLeft: 10,
        marginRight: 10
    },
    optionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15
    },
    cancel: { 
        width: 16,
        height: 16,
        resizeMode: 'cover'
    },
    optionIndex: {
        fontSize: 18,
        fontWeight: 'bold',
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
        bottom: 25,
        backgroundColor: '#111111',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnText: {
        backgroundColor: '#1b1b1b',
        padding: 15,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveText: {
        color: '#9a9a9a',
    },
    saveBtn: {
        width: 150,
        marginRight: 20
    },
    shakeText: {
        color: '#fff'
    },
    shakeBtn: {
        width: 150,
    }
}) 

export default HistoryDetail;