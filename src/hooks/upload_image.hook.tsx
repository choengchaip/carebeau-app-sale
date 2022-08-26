import {useRef, useState} from "react";

export interface IUseUploadImage {
  isShow: boolean
  type: string
  show: (options: IUploadImageOptions) => void
  onUpload: (file: any) => void
  onClose: () => void
}

export interface IUploadImageOptions {
  type?: string
  onUpload?: (file: any) => Promise<void>
}

export const useUploadImage = (): IUseUploadImage => {
  const [isShow, setIsShow] = useState(false)
  const [type, setType] = useState('')

  const _onUpload = useRef<(file: any) => Promise<void>>(async (a) => {
  })

  const show = (options: IUploadImageOptions) => {
    setIsShow(true)
    setType(options.type || 'default')

    if (options.onUpload) {
      _onUpload.current = options.onUpload
    }
  }

  const onUpload = async (file: any) => {
    await _onUpload.current(file)
    onClose()
  }

  const onClose = () => {
    setIsShow(false)
    setType('')
    _onUpload.current = async (a) => {
    }
  }

  return {
    isShow,
    type,
    show,
    onUpload,
    onClose,
  }
}