import { WebView } from "react-native-webview";
import {
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  View,
  Image,
  Button,
  BackHandler,
  ToastAndroid,
  Alert,
  Text,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "./assets/logo.png";

export default function App() {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [error, setError] = useState(false);

  let lastBackPressed = useRef(0);

  // 3 sekundowy timeout na splash screen przy starcie aplikacji
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleBackPress = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true;
      } else {
        const now = Date.now();
        if (now - lastBackPressed.current < 2000) {
          BackHandler.exitApp();
        } else {
          lastBackPressed.current = now;
          ToastAndroid.show("Naciśnij ponownie, aby wyjść", ToastAndroid.SHORT);
        }
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert("Brak internetu", "Sprawdź swoje połączenie.");
        setError(true);
        setShowSplash(false); // splash ukrywamy przy błędzie
      } else {
        setError(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const onReload = () => {
    setError(false);
    setShowSplash(true);
    webViewRef.current?.reload();
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <ActivityIndicator
          size="large"
          color="#000000"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Wystąpił błąd podczas ładowania strony.
        </Text>
        <Button title="Spróbuj ponownie" onPress={onReload} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
        translucent={false}
      />
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: "https://cenol.pl" }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        geolocationEnabled
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        onError={() => {
          setError(true);
          setShowSplash(false);
          setIsLoading(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
