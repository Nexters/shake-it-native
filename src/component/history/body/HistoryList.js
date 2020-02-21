import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import HistoryCard from './HistoryCard';

const HistoryList = ({ histories }) => {
    function historyCards() {
        const historyCards = []
        const totalCount = histories.length

        for (let i = 0; i < totalCount - totalCount % 2 == 0 ? 0 : 1; i += 2) {
            historyCards.push(
                <View style={{flexDirection: 'row' }}>
                    <HistoryCard 
                        history={histories[i]} key={i}
                    />
                    <HistoryCard 
                        history={histories[i+1]} key={i+1}
                    />    
                </View>
            )
        }

        if (totalCount % 2 === 1) {
            historyCards.push(
                <View>
                    <HistoryCard 
                        history={histories[totalCount - 1]} key={totalCount - 1} 
                    />
                </View>
            )
        }
        
        return historyCards
    }


    return (
        <ScrollView>
            <View styles={styles.historyList}>
                { historyCards() }
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