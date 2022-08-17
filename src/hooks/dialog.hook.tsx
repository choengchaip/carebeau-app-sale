import {useRef, useState} from "react";

export interface IUseDialog {
  isShow: boolean
  type: string
  title: string
  description: string
  success: (options: IDialogOptions) => void
  confirm: (options: IDialogOptions) => void
  error: (options: IDialogOptions) => void
  onClose: () => void
}

export interface IDialogOptions {
  duration?: number
  title: string
  description: string
  onFinish?: () => void
}

export const useDialog = (): IUseDialog => {
  const [isShow, setIsShow] = useState(false)
  const [type, setType] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const onFinish = useRef<() => void>(() => {
  })

  const success = (options: IDialogOptions) => {
    setIsShow(true)
    setType('success')

    setTitle(options.title)
    setDescription(options.description)
    if (options.onFinish) {
      onFinish.current = options.onFinish
    }
  }

  const confirm = (options: IDialogOptions) => {
    setIsShow(true)
    setType('confirm')
    setTitle(options.title)
    setDescription(options.description)
  }

  const error = (options: IDialogOptions) => {
    setIsShow(true)
    setType('error')
    setTitle(options.title)
    setDescription(options.description)
  }

  const onClose = () => {
    onFinish.current()
    setIsShow(false)
    setType('')
    setTitle('')
    setDescription('')
  }

  return {
    isShow,
    type,
    title,
    description,
    success,
    confirm,
    error,
    onClose,
  }
}