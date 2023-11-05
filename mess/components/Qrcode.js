import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrCode = () => {
  const text = "21ECE1040";
//   const [text, setText] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');

  const generateQRCode = () => {
    setQRCodeData(text);
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter text for QR code"
        value={text}
        onChangeText={(value) => setText(value)}
      /> */}
      <Text></Text>
      <Button title="Generate QR Code" onPress={generateQRCode} />
      {qrCodeData ? (
        <QRCode
          value={qrCodeData}
          size={200}
          color="black"
          backgroundColor="white"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default QrCode;