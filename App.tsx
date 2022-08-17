import React from "react";
import {Box, extendTheme, NativeBaseProvider, Spinner, StatusBar} from "native-base";
import {AppPage} from "./src/consts/page.const";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
  Prompt_200ExtraLight,
  Prompt_300Light,
  Prompt_400Regular,
  Prompt_600SemiBold,
  Prompt_700Bold,
  useFonts
} from "@expo-google-fonts/prompt";
import {LogBox} from "react-native";

const colors = {
  success: {
    50: '#bafff4',
    100: '#9fefdd',
    200: '#75dec4',
    300: '#58cebb',
    400: '#3DC9B3',
    500: '#24b2a1',
    600: '#13b29b',
    700: '#008f7a',
    800: '#006959',
    900: '#004637',
  }
}

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  fontConfig: {
    Prompt: {
      100: {
        normal: 'Prompt_200ExtraLight',
      },
      200: {
        normal: 'Prompt_300Light',
      },
      4040: {
        normal: 'Prompt_400Regular',
      },
      600: {
        normal: 'Prompt_600SemiBold',
      },
      700: {
        normal: 'Prompt_700Bold',
      },
    }
  },
  fonts: {
    heading: 'Prompt',
    body: 'Prompt',
    mono: 'Prompt',
  },
}

// extend the theme
export const theme = extendTheme({colors, config});
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {
  }
}

LogBox.ignoreAllLogs(true)

const Stack = createNativeStackNavigator();

const getRoutes = (): { key: string, component: any }[] => {
  let routes: { key: string, component: any }[] = []

  for (const [, v] of Object.entries(AppPage)) {
    routes = [
      ...routes,
      {
        key: v.key,
        component: v.component,
      }
    ]
  }

  return routes
}

export const Setup = () => {
  let [fontsLoaded] = useFonts({
    extra_light: Prompt_200ExtraLight,
    light: Prompt_300Light,
    medium: Prompt_400Regular,
    semi_bold: Prompt_600SemiBold,
    bold: Prompt_700Bold,
  })
  if (!fontsLoaded) {
    return (
      <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
        <Spinner/>
      </Box>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'}/>
      <Stack.Navigator initialRouteName={AppPage.Middleware.key}>
        {getRoutes().map((item) => {
          return <Stack.Screen
            key={item.key}
            name={item.key}
            component={item.component}
            options={{
              headerShown: false,
            }}/>
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Setup/>
    </NativeBaseProvider>
  )
}
