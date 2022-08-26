export interface IStoreImageItem {
  store_image_id: number
  image_path: string
}

export interface IStoreImage {
  message: string,
  status_code: number,
  data: {
    store_image: {
      front_img: IStoreImageItem[]
      inside_img: IStoreImageItem[]
    }
  }
}