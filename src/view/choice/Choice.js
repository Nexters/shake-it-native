import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {accelerometer, SensorTypes, setUpdateIntervalForType} from "react-native-sensors";
import {filter, map} from "rxjs/operators";
import {shuffle} from "../../util/ArrayUtil";

const Choice: () => React$Node = (e) => {

  const [dataSetState, setDataSetState] = useState(shuffle(e.navigation.state.params.data));
  const [sensorState, setSensorState] = useState(0);

  setUpdateIntervalForType(SensorTypes.accelerometer, 100); // defaults to 100ms

  const subscription = accelerometer
    .pipe(map(({x, y, z}) => x + y + z), filter(speed => speed > 20))
    .subscribe(
      speed => {
        setSensorState(speed)
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
        <Text style={{color: "#ffffff"}}>
          {sensorState}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerStopButton}>
          <Image
            style={{width: 13, height: 13}}
            source={require('../../assets/stop_button.png')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111111',
    width: '100%',
    height: '10%'
  },
  body: {
    backgroundColor: '#111111',
    width: '100%',
    height: '65%'
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
