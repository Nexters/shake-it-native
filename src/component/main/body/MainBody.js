import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTodoState} from "../../../context/Context";
import MainHeader from "../header/MainHeader";
import MainBodyNow from "./MainBodyNow";
import MainBodyHistory from "./MainBodyHistory";

const MainBody: () => React$Node = () => {
  const state = useTodoState();

  const MainBody = () => {
    if (state.mode === 'now') {
      return <MainBodyNow/>
    } else if (state.mode === 'history') {
      return <MainBodyHistory/>
    }
  };

  return (
    <>
      <View style={styles.background}>
        <MainHeader/>
        <MainBody/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111111'
  },
});

export default MainBody;
