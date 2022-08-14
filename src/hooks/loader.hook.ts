import {useState} from "react";
import {ILoaderOptions, IStatus} from "./types";

export const useLoader = <A = any, B = any>(options: ILoaderOptions<A, B>) => {
  const [data, setData] = useState<A | null>(null)
  const [status, setStatus] = useState<IStatus>({
    isError: false,
    isLoading: false,
    errorMessage: '',
  })

  const run = async (payload: B) => {
    setStatus({
      ...status,
      isLoading: true,
    })

    try {
      const response = await fetch(options.getURL(payload), {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      console.log(await response.json())

      if (response.status >= 400) {
        throw (await response.json())
      }

      setData(await response.json())
    } catch (e) {
      setStatus({
        ...status,
        isError: true,
        errorMessage: e.toString(),
      })
    }

    setStatus({
      ...status,
      isLoading: false,
    })
  }

  return {
    data,
    run,
    status,
  }
}