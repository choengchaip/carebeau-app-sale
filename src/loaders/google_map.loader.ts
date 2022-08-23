import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import {IJob} from "../models/job.model";
import {useMe} from "./auths/me.loader";
import {IGoogle} from "../models/google.model";

export const useGoogleMap = () => {
  return useLoader<IGoogle, {latlng:string}>({
    method: 'post',
    getURL: (data) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latlng}&key=AIzaSyD8XxpIyH57aQ4o3lc-c9FIiHXUEXr_ky0&language=th`,
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}