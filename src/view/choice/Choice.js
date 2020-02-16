import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {accelerometer, SensorTypes, setUpdateIntervalForType} from "react-native-sensors";
import {filter, map} from "rxjs/operators";
import {shuffle} from "../../util/ArrayUtil";
import LottieView from 'lottie-react-native';
import {Mutex} from 'async-mutex';

const mutex = new Mutex();

const Choice: () => React$Node = (e) => {

    const [dataSetState, setDataSetState] = useState(shuffle(e.navigation.state.params.data));
    const [sensorState, setSensorState] = useState(0);
    const [textAnimatedState, setTextAnimatedState] = useState(false);
    const [textBackgroundState, setTextBackgroundState] = useState(false);
    const [lottieAnimation, setLottieAnimation] = useState();

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
            marginTop: 40,
          }}>
          {dataSetState.pop().text}
        </Text>
      } else {
        return <></>
      }
    };

    const activeChoice = (release) => {
      if (!textAnimatedState && !textBackgroundState && lottieAnimation !== undefined && dataSetState.length > 0) {
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
            if (lottieAnimation !== undefined) {
              lottieAnimation.reset();
            }
            release();
            setTimeout(() => {
              setTextBackgroundState(false);
            }, 1000);
          }, 3500);
        }, 0);
      } else {
        release();
      }
    };

    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    accelerometer
      .pipe(map(({x, y, z}) => x + y + z), filter(speed => speed > 20))
      .subscribe(
        speed => {
          if (!mutex.isLocked() && lottieAnimation !== undefined) {
            mutex
              .acquire()
              .then(function (release) {
                activeChoice(release);
              });
          }
          // setSensorState(speed);
        },
        error => {
          console.log("The sensor is not available");
        }
      );

    return (
      <>
        <View style={styles.header}>
          {dataSetState.map((item, idx) => {
            return <Text key={idx} style={{color: "#ffffff"}}>{item.text}</Text>
          })}
        </View>
        <View style={styles.body}>
          <LottieView style={{width: '100%', height: '100%', position: 'absolute'}}
                      resizeMode={'cover'}
                      source={require('../../assets/lottie/transition.json')}
                      ref={animation => {
                        setLottieAnimation(animation);
                      }}
                      loop={false}
          />
          <AnimateText/>
          {/*
        <LottieView style={{width: '100%', height: '100%', position: 'absolute'}}
                    resizeMode={'cover'}
                    source={textMotion()}
                    autoPlay
                    loop/>
                    */}
        </View>
      </>
    );
  }
;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111111',
    width: '100%',
    height: '10%'
  },
  body: {
    backgroundColor: '#111111',
    width: '100%',
    height: '90%',
    alignItems: 'center',
    margin: 0,
    padding: 0
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
