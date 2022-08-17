import {Dispatch, SetStateAction, useState} from "react";

export interface IUseForm<T = any> {
  form: T | undefined
  error: any
  setForm: Dispatch<SetStateAction<T | undefined>>
  setError: Dispatch<SetStateAction<any>>
  isValid: () => boolean
  validate?: () => boolean
}

export const useForm = <T = any>(): IUseForm<T> => {
  const [form, setForm] = useState<T | any>()
  const [error, setError] = useState<any>({})

  return {
    form,
    error,
    setForm,
    setError,
    isValid: () => error && Object.keys(error).length === 0 && Object.getPrototypeOf(error) === Object.prototype,
  }
}