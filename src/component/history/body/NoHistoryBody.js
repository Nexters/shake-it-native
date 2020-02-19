import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const NoHistoryBody = () => {
    return (
        <>
        <View style={styles.noHistoryBody}>
            <View>
                <Text style={styles.title}>No History</Text>
                <Text style={styles.infoText}>선택지를 shake it하고 히스토리를 생성해보세요</Text>
            </View>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    noHistoryBody: {
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e6ffffff',
        textAlign: 'center',
        letterSpacing: 0.27,
        marginBottom: 10
    },
    infoText: {
        fontSize: 12,
        color: '#616161',
        textAlign: 'center'
    }
});

export default NoHistoryBody;