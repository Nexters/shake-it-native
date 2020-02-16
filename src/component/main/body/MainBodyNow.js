import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {useTodoState} from "../../../context/Context";
import ActionButton from 'react-native-action-button';
import NavigationService from "../../../common/NavigationService";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

const MainBodyNow: () => React$Node = () => {
  const state = useTodoState();

  const defaultDataSet = [
    {text: '', focus: null}
  ];
  const [dataSetState, setDataSetState] = useState(defaultDataSet);

  const [dataBufferState, setDataBufferState] = useState(
    {
      hasData: false,
      dataSet: []
    }
  );

  const onPressAllDelete = () => {
    setDataBufferState({
      hasData: true,
      dataSet: dataSetState
    });
    setDataSetState(defaultDataSet);
  };

  const onPressRestore = () => {
    setDataSetState(dataBufferState.dataSet);
    setDataBufferState({
      ...dataBufferState,
      hasData: false
    });
  };

  const AllDeleteView = () => {
    if (dataSetState.length > 1) {
      return <View style={styles.allDeleteView}>
        <View style={styles.allDeleteViewTextView}>
          <View style={styles.allDeleteViewTextRow}>
            <Text style={styles.allDeleteViewText}>
              선택지를 모두 삭제하시겠습니까?
            </Text>
            <TouchableHighlight onPress={() => {
              onPressAllDelete()
            }}>
              <Text style={styles.allDeleteViewButton}>
                삭제하기
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    } else if (dataBufferState.hasData === true) {
      return <View style={styles.allDeleteView}>
        <View style={styles.allDeleteViewTextView}>
          <View style={styles.allDeleteViewTextRow}>
            <Text style={styles.allDeleteViewText}>
              삭제한 선택지를 되돌리겠습니까?
            </Text>
            <TouchableHighlight onPress={() => {
              onPressRestore()
            }}>
              <Text style={styles.allDeleteViewButton}>
                실행취소
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    } else {
      return <View style={{height: 40}}/>
    }
  };

  const onChangeText = (idx, text) => {
    dataSetState[idx].text = text;
    setDataSetState(dataSetState);

    if (idx + 1 === dataSetState.length && text.length > 0) {
      let dataSetStateCopy = [...dataSetState];
      dataSetStateCopy.push(defaultDataSet);
      setDataSetState(dataSetStateCopy);
    }
  };

  const onDeletePress = (idx) => {
    if (dataSetState.length > 1 && idx !== dataSetState.length - 1) {
      let dataSetStateCopy = [...dataSetState];
      dataSetStateCopy.splice(idx, 1);
      for (let i = 0; i < dataSetStateCopy.length; i++) {
        dataSetStateCopy[i].num = i + 1;
      }
      setDataSetState(dataSetStateCopy);
    }
  };

  const FloatingButton = () => {
    if (dataSetState.length > 1) {
      return <ActionButton
        renderIcon={() => (<Image source={require("../../../assets/img/floating_button_on.png")}
                                  style={{width: 58, height: 56}}/>)}
        onPress={() => {
          NavigationService.navigate('ChoiceScreen', {
            screen: 'ChoiceScreen',
            info: 'information',
            data: dataSetState.slice(0, dataSetState.length - 1)
          })
        }}
      />
    } else {
      return <ActionButton
        renderIcon={() => (<Image source={require("../../../assets/img/floating_button_off.png")}
                                  style={{width: 58, height: 56}}/>)}
      />
    }
  };

  return (
    <>
      <AllDeleteView/>

      <KeyboardAwareScrollView>
        {dataSetState.map((item, idx) => {
          return <View style={styles.content} key={idx}>
            <Text style={styles.rowNum}>
              {(idx + 1).toString().padStart(2, '0')}
            </Text>

            <View style={styles.rowTextView}>
              <TextInput
                style={styles.rowText}
                placeholder="선택지를 입력해주세요"
                placeholderTextColor="#616161"
                onChangeText={text => onChangeText(idx, text)}

                returnKeyType={"next"}
                onSubmitEditing={() => {
                  dataSetState[idx + 1].focus.focus();
                }}
                ref={(input) => {
                  dataSetState[idx].focus = input;
                }}
              >
                {item.text}
              </TextInput>

              <View>
                <TouchableHighlight onPress={() => {
                  onDeletePress(idx);
                }}>
                  <Image
                    style={styles.xbox}
                    source={require('../../../assets/img/xbox.png')}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        })}
      </KeyboardAwareScrollView>

      <FloatingButton/>
    </>
  )
};

const styles = StyleSheet.create({
  allDeleteView: {
    width: '100%',
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40
  },
  allDeleteViewTextView: {
    width: '88%',
    backgroundColor: '#1b1b1b',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  allDeleteViewTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  allDeleteViewText: {
    color: '#ffffff',
    marginLeft: 18
  },
  allDeleteViewButton: {
    color: 'rgb(119,119,119)',
    marginRight: 18
  },
  content: {
    marginLeft: 26,
    flexDirection: 'column'
  },
  rowTextView: {
    marginBottom: 36,
    padding: 0,
    flexDirection: 'row',
    height: 29,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowNum: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: '#5f5fed',
    fontSize: 14,
    height: 16,
    margin: 0,
    padding: 0
  },
  rowText: {
    fontSize: 20,
    color: '#ffffff',
    margin: 0,
    padding: 0,
  },
  xbox: {
    width: 16,
    height: 16,
    margin: 0,
    padding: 0,
    marginRight: 26
  }
});

export default MainBodyNow;
