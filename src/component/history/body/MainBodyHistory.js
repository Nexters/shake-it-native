import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';

import NoHistoryBody from './NoHistoryBody';
import HistoryList from './HistoryList'

import realm, { schemaTypes } from '../../../data';

const MainBodyHistory = () => {
  const [ histories, setHistories ] = useState([]);

  async function fetchHistories() {
    await setHistories(realm.objects(schemaTypes.history));
  }

  useEffect(() => fetchHistories(), []);

  return (
    <>
      <View style={styles.historyMainView}>
        { 
          histories.length === 0 ? 
          <NoHistoryBody /> :
          <HistoryList histories={histories} /> 
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  historyMainView: {
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 60
  }
});

export default MainBodyHistory;
