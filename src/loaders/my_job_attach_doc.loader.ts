import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";

export const useMyJobAttachDoc = () => {
  return useLoader<any, {
    store_code: string
    job_no: string
    is_receive_doc_copy_id_card: string
    is_receive_doc_copy_house_reg: string
    is_receive_doc_company_certificate: string
    is_receive_doc_por_20: string
    is_receive_doc_trade_reg: string
    is_receive_doc_consent_letter: string
    require: string
  }>({
    method: 'post',
    getURL: () => Core.DefaultAPI('/api/sale/update-store-attach-doc-job'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}