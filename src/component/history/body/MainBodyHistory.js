import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import NoHistoryBody from '../../history/body/NoHistoryBody'

const MainBodyHistory: () => React$Node = () => {
  return (
    <>
      <View style={styles.historyMainView}>
        <NoHistoryBody />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  historyMainView: {
    marginLeft: '10%',
    marginRight: '10%'
  }
});

export default MainBodyHistory;
