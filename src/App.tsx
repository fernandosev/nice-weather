import "react-native-gesture-handler";
import React, { useEffect, useMemo } from "react";
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  StatusBar,
} from "react-native";

// Libs
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setCustomText } from "react-native-global-props";
import { request, PERMISSIONS } from "react-native-permissions";

// Routes
import Routes from "./routes";

// Store
import { useAppDispatch } from "./store/hooks";

// Images

// Styles
import { colors, metrics } from "~/styles";
import { setIsPermissionGranted } from "./store/modules/location/slice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const requestLocationPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        dispatch(setIsPermissionGranted({ granted: true }));
      } else {
        dispatch(setIsPermissionGranted({ granted: false }));
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestLocationPermissionIOS = async () => {
    await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        if (result === "granted")
          dispatch(setIsPermissionGranted({ granted: true }));
        else dispatch(setIsPermissionGranted({ granted: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const customTextProps = useMemo(
    () => ({
      style: {
        color: colors.primaryText,
        fontSize: metrics.fontSizeMedium,
      },
    }),
    []
  );

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    setCustomText(customTextProps);
  }, [customTextProps]);

  useEffect(() => {
    if (Platform.OS === "android") requestLocationPermissionAndroid();
    else requestLocationPermissionIOS();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Routes />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default App;
