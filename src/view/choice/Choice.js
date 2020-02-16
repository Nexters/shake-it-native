import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {accelerometer, SensorTypes, setUpdateIntervalForType} from "react-native-sensors";
import {filter, map} from "rxjs/operators";
import {shuffle} from "../../util/ArrayUtil";
import LottieView from 'lottie-react-native';
import {Mutex} from 'async-mutex';

const mutex = new Mutex();

const Choice: () => React$Node = (e) => {
  const [dataSetState, setDataSetState] = useState([]);
  const [textAnimatedState, setTextAnimatedState] = useState(false);
  const [textBackgroundState, setTextBackgroundState] = useState(false);
  const [lottieAnimation, setLottieAnimation] = useState();
  const [resultDataSetState, setResultDataSetState] = useState([]);

  useEffect(() => {
    setDataSetState(shuffle(e.navigation.state.params.data));
    return subscribe.unsubscribe();
  }, []);

  const [transitions] = useState({
      randomNumber: 0,
      data: [
        require('../../assets/lottie/transition_1.json'),
        require('../../assets/lottie/transition_2.json'),
        require('../../assets/lottie/transition_3.json'),
        require('../../assets/lottie/transition_4.json')
      ]
    }
  );

  const recreateTransitionRandomNumber = () => {
    transitions.randomNumber = Math.floor(Math.random() * transitions.data.length);
  };

  const AnimateText = () => {
    if (textAnimatedState) {
      return <Text
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          textAlign: 'center',
          fontSize: 40,
          color: "#ffffff",
          marginTop: 300,
        }}>
        {dataSetState[dataSetState.length - 1].text}
      </Text>
    } else {
      return <></>
    }
  };

  const activeChoice = (release) => {
    // 텍스트 n초 딜레이뒤 떳다 사라지는 애니메이션
    setTimeout(() => {
      setTextAnimatedState(true);
      setTimeout(() => {
        setTextAnimatedState(false);
      }, 1000);
    }, 1400);

    // 배경 애니메이션 로티
    setTimeout(() => {
      setTextBackgroundState(true);
      lottieAnimation.play();
      setTimeout(() => {
        resultDataSetState.push(dataSetState.pop().text)
        setResultDataSetState(resultDataSetState);

        lottieAnimation.reset();
        release();
        setTimeout(() => {
          setTextBackgroundState(false);
        }, 1200);
      }, 1800);
    }, 0);
  };

  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
  const subscribe = accelerometer
    .pipe(map(({x, y, z}) => x + y + z), filter(speed => speed > 20))
    .subscribe(
      speed => {
        if (!mutex.isLocked() && !textAnimatedState && !textBackgroundState && lottieAnimation !== undefined && dataSetState.length > 0) {
          mutex
            .acquire()
            .then(function (release) {
              // transition 랜덤하게 설정
              recreateTransitionRandomNumber();
              //  애니메이션 실행
              setTimeout(() => {
                activeChoice(release);
              }, 50);
            });
        }
      },
      error => {
        console.log("The sensor is not available");
      }
    );

  return (
    <>
      <View style={styles.body}>
        <LottieView style={{width: '100%', height: '100%', position: 'absolute'}}
                    resizeMode={'cover'}
                    source={transitions.data[transitions.randomNumber]}
                    ref={animation => {
                      setLottieAnimation(animation);
                    }}
                    loop={false}
        />
        <AnimateText/>
      </View>
      <ScrollView style={styles.header} horizontal contentContainerStyle={{alignItems: 'center', paddingRight: 20}}>
        {resultDataSetState.map((item, idx) => {
          return <View style={styles.headerItemView} key={idx}>
            <Text style={{color: '#ffffff'}}>{idx + 1}</Text>
            <Text style={{color: '#bbbbbb', marginLeft: 5}}>{item}</Text>
          </View>
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    position: 'absolute'
  },
  headerItemView: {
    height: 33,
    backgroundColor: 'rgba(255,255,255, 0.07)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.3)',
    marginLeft: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    backgroundColor: '#111111',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    position: 'absolute'
  },
  footer: {
    backgroundColor: '#111111',
    width: '100%',
    height: '25%',
    alignItems: 'center'
  },
  footerStopButton: {
    backgroundColor: '#5f5fed',
    width: 64,
    height: 64,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Choice;
