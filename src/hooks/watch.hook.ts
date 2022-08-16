import {IStatus} from "./types.hook";
import {useEffect} from "react";

export const useWatchSuccess = (status: IStatus, cb: () => void) => {
  return useEffect(() => {
    if (status.isSuccess && !status.isLoading) {
      cb()
    }
  }, [status.isSuccess && !status.isLoading])
}

export const useWatchError = (status: IStatus, cb: () => void) => {
  return useEffect(() => {
    if (status.isError && !status.isLoading) {
      cb()
    }
  }, [status.isError && status.isLoading])
}

export const useWatchErrorWithToast = (toast: any, status: IStatus, cb: () => void = () => {}) => {
  return useEffect(() => {
    if (status.isError && !status.isLoading) {
      toast.show({
        title: 'ล้มเหลว',
        description: JSON.stringify(status.errorMessage) || 'กรุณาลองใหม่อีกครั้งภายหลัง',
        onCloseComplete: () => {
          cb()
        },
      })
    }
  }, [status.isError && status.isLoading])
}