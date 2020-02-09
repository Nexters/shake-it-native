import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {useTodoDispatch, useTodoState} from "../../../context/Context";

const MainHeader: () => React$Node = () => {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  const ImageNow = () => {
    if (state.mode === 'now') {
      return <Image
        style={styles.now}
        source={require('../../../assets/now_pick.png')}
      />
    }
    if (state.mode !== 'now') {
      return <TouchableHighlight onPress={() => {
        dispatch({type: 'now'})
      }}>
        <Image
          style={styles.now}
          source={require('../../../assets/now_unpick.png')}
        />
      </TouchableHighlight>
    }
  };

  const ImageHistory = () => {
    if (state.mode === 'history') {
      return <Image
        style={styles.history}
        source={require('../../../assets/history_pick.png')}
      />
    }
    if (state.mode !== 'history') {
      return <TouchableHighlight onPress={() => {
        dispatch({type: 'history'})
      }}>
        <Image
          style={styles.history}
          source={require('../../../assets/history_unpick.png')}
        />
      </TouchableHighlight>
    }
  };

  return (
    <>
      <View className='align-content-center align-items-center' style={styles.context}>
        <ImageNow/>
        <ImageHistory/>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  context: {
    width: '100%',
    height: 42,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  now: {
    width: 34,
    height: 17
  },
  history: {
    width: 54,
    height: 16,
    marginLeft: 19
  }
});

export default MainHeader;
