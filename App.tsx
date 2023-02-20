import React, { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme
} from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * alguns links para consulta
 * 0. https://reactnative.dev/docs/0.61/webview
 * 1. https://github.com/react-native-webview/react-native-webview
 * 2. https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md
 * 3. https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#scrollenabled
 * 4. https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md
 */



function App(): JSX.Element {
  let myWebView: any;

  const html = `
    <html>
      <body>

        <script>
          // window.ReactNativeWebView.postMessage("Hello") testando alert

          function sendMessagemReactNative(){
            window.ReactNativeWebView.postMessage("Messagem do webview")
          }

          (function(){
            const body = document.getElementsByTagName('BODY')[0];
            
            document.addEventListener('message', function(msg){
              let color = msg.data
              body.style.backgroundColor = color
            })

          })()
        </script>
        <h1>Ola webview</h1>
        <button onclick="sendMessagemReactNative()" style="width: 100%; height: 350px;"> 
          <h1 style="font-size: 50px;">Mandar mensagem pro react native </h1>
        </button>
      </body>
    </html>
  `

  const [color, setColor] = useState('green')

  const changeBgWebViewHtml = () => {
    myWebView.postMessage(color)
  }

  return (
    <>
      <StatusBar/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 30 }}>Prototipo comunicação webview</Text>
          <TextInput style={{ height: 80 }} placeholder='Escreva uma cor para o webview' onChangeText={setColor} />
          <Button onPress={changeBgWebViewHtml} title="set uma cor no webview" />
          <WebView
            ref={el => myWebView = el}
            originWhitelist={['*']}
            startInLoadingState={true}
            source={{ html }}
            onLoadEnd={() => myWebView.postMessage('red')}
            // source={{ uri: 'https://mictests.com/' }} teste microfone webview
            onMessage={(event) => {
              let data = event.nativeEvent.data
              Alert.alert(data, "Hello world")
              ToastAndroid.show(data, ToastAndroid.SHORT)
            }}
            style={{ height: 200 }}
            scrollEnabled={false}
          />
      </ScrollView>
    </>
  );
}

export default App;
