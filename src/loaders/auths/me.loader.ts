import {useLoader} from "../../hooks/loader.hook";
import {Core} from "../../cores/core.core";

export const useMe = () => {
  const loader = useLoader({
    key: 'me',
    method: 'get',
    getURL: () => Core.DefaultAPI('/me'),
  })

  return {
    ...loader,
  }
}