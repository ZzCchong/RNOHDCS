import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission} from 'react-native-vision-camera';
import {TestSuite, TestCase, Tester} from '@rnoh/testerino';

export function getAvailableCameraDevicesTest() {
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);
  const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef<Camera>(null);

  if (!device) {
    return <Text>No Devices</Text>;
  }

  if (!hasPermission) {
    requestPermission();
  }


  const [availableCameraDevices, setAvailableCameraDevices] =
    useState<string>('');

  const getAvailableCameraDevices = async () => {
    const res = await Camera.getAvailableCameraDevices();
    res && setAvailableCameraDevices(JSON.stringify(res));
    console.log('====================================');
    console.log('res', JSON.stringify(res));
    console.log('====================================');
  };

  return (
    <Tester>
      <TestSuite name="getAvailableCameraDevices">
        <TestCase itShould={`获取手机上可用相机设备`}>
          <Camera
            style={style.cameraPreview}
            ref={camera}
            device={device}
            isActive
            preview
            photo
            format={format}
            enableLocation
          />
          <View>
            <Text>availableCameraDevices{availableCameraDevices}</Text>
            <Button
              title="getAvailableCameraDevices"
              onPress={getAvailableCameraDevices}
            />
          </View>
        </TestCase>
      </TestSuite>
    </Tester>
  );
}

const style = StyleSheet.create({
  cameraPreview: {width: 300, height: 200},
  actionBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 10,
    gap: 5,
    position: 'absolute',
    top: 300,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
});