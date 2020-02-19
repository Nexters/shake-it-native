import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import HistoryCard from './HistoryCard';

const HistoryList = ({ histories }) => {
    const historyCards = histories.map((history, idx) => (
        <HistoryCard 
            history={history} key={idx}
        />
    ));

    return (
        <ScrollView>
            <View styles={styles.historyList}>
                { historyCards }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    historyList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
});

export default HistoryList;