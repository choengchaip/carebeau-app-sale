import {useNavigation, useRoute} from "@react-navigation/core";

export const useRouter = <T = any>() => {
  const navigator = useNavigation()
  const route = useRoute()

  return {
    ...navigator,
    ...route,
    push: (name: string, props: any = {}) => {
      // @ts-ignore
      navigator.push(name, props)
    },
    params: route.params as unknown as T,
  }
}