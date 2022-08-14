import React from "react";
import {Box, extendTheme, NativeBaseProvider, Spinner} from "native-base";
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

// Define the config
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
export const theme = extendTheme({config});
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {
  }
}

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
