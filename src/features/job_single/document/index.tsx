import {HStack, Radio, ScrollView, Text, useToast, VStack} from 'native-base'
import {BackBar} from '../../../components/BackBar'
import {MyButton} from '../../../components/uis/MyButton'
import {useForm} from '../../../hooks/form.hook'
import {useRouter} from "../../../hooks/router.hook";
import {FadeIn} from "../../../components/FadeIn";
import {useDialog} from "../../../hooks/dialog.hook";
import {MyDialog} from "../../../components/hooks/MyDialog";
import {SubTitleBar} from "../../../components/SubTitleBar";
import {DocumentInput} from "./DocumentRadioInput";
import {useRef} from "react";
import {FormTextAreaInput} from "../../../components/forms/FormTextAreaInput";
import {useMyJobAttachDoc} from "../../../loaders/my_job_attach_doc.loader";
import {useWatchErrorWithToast, useWatchSuccess} from "../../../hooks/watch.hook";

export interface IJobSingleDocumentParams {
  store_code: string
  job_no: string
}

export const JobSingleDocument = () => {
  const form = useForm<any>()
  const router = useRouter<IJobSingleDocumentParams>()
  const toast = useToast()
  const dialog = useDialog()
  const attach = useMyJobAttachDoc()

  const isReceiveDocCopyIdCard = useRef<string>()
  const isReceiveDocCopyHouseReg = useRef<string>()
  const isReceiveDocCompanyCertificate = useRef<string>()
  const isReceiveDocPor20 = useRef<string>()
  const isReceiveDocTradeReg = useRef<string>()
  const isReceiveDocConsentLetter = useRef<string>()
  const requireType = useRef<string>()

  const validate = (): boolean => {
    form.setError({})

    if (!isReceiveDocCopyIdCard.current) {
      form.setError({
        ...form.error,
        is_receive_doc_copy_id_card: 'กรุณาเลือกตัวเลือก'
      })
      return false
    }

    if (!isReceiveDocCopyHouseReg.current) {
      form.setError({
        ...form.error,
        is_receive_doc_copy_house_reg: 'กรุณาเลือกตัวเลือก'
      })
      return false
    }

    if (!isReceiveDocCompanyCertificate.current) {
      form.setError({
        ...form.error,
        is_receive_doc_company_certificate: 'กรุณาเลือกตัวเลือก'
      })
      return false
    }

    if (!isReceiveDocPor20.current) {
      form.setError({
        ...form.error,
        is_receive_doc_por_20: 'กรุณาเลือกตัวเลือก'
      })
      return false
    }

    if (!isReceiveDocTradeReg.current) {
      form.setError({
        ...form.error,
        is_receive_doc_trade_reg: 'กรุณาเลือกตัวเลือก'
      })
      return false
    }

    if (!isReceiveDocConsentLetter.current) {
      form.setError({
        ...form.error,
        is_receive_doc_consent_letter: 'กรุณาเลือกตัวเลือก'
      })
      return false
    }

    return true
  }

  const onSubmit = () => {
    if (validate()) {
      attach.run({
        store_code: router.params.store_code,
        job_no: router.params.job_no,
        is_receive_doc_copy_id_card: isReceiveDocCopyIdCard.current!,
        is_receive_doc_copy_house_reg: isReceiveDocCopyHouseReg.current!,
        is_receive_doc_company_certificate: isReceiveDocCompanyCertificate.current!,
        is_receive_doc_por_20: isReceiveDocPor20.current!,
        is_receive_doc_trade_reg: isReceiveDocTradeReg.current!,
        is_receive_doc_consent_letter: isReceiveDocConsentLetter.current!,
        require: requireType.current!,
      })
    }
  }

  useWatchSuccess(attach.status, () => {
    dialog.success({
      title: 'สำเร็จ',
      description: 'ทำการบันทึกเอกสารแนบสำเร็จ',
      onFinish: () => {

      }
    })
  })

  useWatchErrorWithToast(toast, attach.status)

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <MyDialog dialog={dialog}/>
      <BackBar title={'เอกสารแนบ'}/>
      <SubTitleBar title={'เอกสารสำหรับเปิดร้านค้าใหม่'}/>
      <ScrollView flex={1} p={5}>
        <FadeIn>
          <VStack space={4} mb={5}>
            <DocumentInput
              name={'is_receive_doc_copy_id_card'}
              label={'สำเนาบัตรประชาชน'}
              form={form}
              options={[
                {
                  label: 'ได้รับแล้ว',
                  value: '1',
                },
                {
                  label: 'ไม่ได้รับ',
                  value: '2',
                },
              ]}
              onChange={(v) => {
                isReceiveDocCopyIdCard.current = v
                form.setError({
                  ...form.error,
                  is_receive_doc_copy_id_card: undefined,
                })
              }}
            />
            <DocumentInput
              name={'is_receive_doc_copy_house_reg'}
              label={'สำเนาทะเบียนบ้าน'}
              form={form}
              options={[
                {
                  label: 'ได้รับแล้ว',
                  value: '1',
                },
                {
                  label: 'ไม่ได้รับ',
                  value: '2',
                },
              ]}
              onChange={(v) => {
                isReceiveDocCopyHouseReg.current = v
                form.setError({
                  ...form.error,
                  is_receive_doc_copy_house_reg: undefined,
                })
              }}
            />
            <DocumentInput
              name={'is_receive_doc_company_certificate'}
              label={'หนังสือรับรองบริษัท'}
              form={form}
              options={[
                {
                  label: 'ได้รับแล้ว',
                  value: '1',
                },
                {
                  label: 'ไม่ได้รับ',
                  value: '2',
                },
              ]}
              onChange={(v) => {
                isReceiveDocCompanyCertificate.current = v
                form.setError({
                  ...form.error,
                  is_receive_doc_company_certificate: undefined,
                })
              }}
            />
            <DocumentInput
              name={'is_receive_doc_por_20'}
              label={'เอกสาร ภพ.20'}
              form={form}
              options={[
                {
                  label: 'ได้รับแล้ว',
                  value: '1',
                },
                {
                  label: 'ไม่ได้รับ',
                  value: '2',
                },
              ]}
              onChange={(v) => {
                isReceiveDocPor20.current = v
                form.setError({
                  ...form.error,
                  is_receive_doc_por_20: undefined,
                })
              }}
            />
            <DocumentInput
              name={'is_receive_doc_trade_reg'}
              label={'ทะเบียนการค้า'}
              form={form}
              options={[
                {
                  label: 'ได้รับแล้ว',
                  value: '1',
                },
                {
                  label: 'ไม่ได้รับ',
                  value: '2',
                },
              ]}
              onChange={(v) => {
                isReceiveDocTradeReg.current = v
                form.setError({
                  ...form.error,
                  is_receive_doc_trade_reg: undefined,
                })
              }}
            />
            <DocumentInput
              name={'is_receive_doc_consent_letter'}
              label={'หนังสือยินยอม'}
              form={form}
              options={[
                {
                  label: 'ได้รับแล้ว',
                  value: '1',
                },
                {
                  label: 'ไม่ได้รับ',
                  value: '2',
                },
              ]}
              onChange={(v) => {
                isReceiveDocConsentLetter.current = v
                form.setError({
                  ...form.error,
                  is_receive_doc_consent_letter: undefined,
                })
              }}
            />
          </VStack>
          <VStack
            rounded={'md'}
            overflow={'hidden'}
            bg={'white'}
            shadow={2}
            mb={5}>
            <HStack bg={'danger.500'} py={3} px={2}>
              <Text fontFamily={'semi_bold'} color={'white'}>
                ความประสงค์*
              </Text>
            </HStack>
            <VStack
              space={2}
              py={4}
              px={3}
              bg={'danger.50'}>
              <Radio.Group
                name={'requireType'}
                colorScheme={'danger'}
                onChange={(v) => {
                  requireType.current = v
                }}
                space={4}>
                <Radio
                  value={'รับใบกำกับภาษี'}>
                  <Text fontFamily={'medium'}>
                    รับใบกำกับภาษี
                  </Text>
                </Radio>
                <Radio
                  value={'ไม่รับใบกำกับภาษี'}>
                  <Text fontFamily={'medium'}>
                    ไม่รับใบกำกับภาษี
                  </Text>
                </Radio>
                <Radio
                  value={'เปิดบัญชีคู่'}>
                  <Text fontFamily={'medium'}>
                    เปิดบัญชีคู่
                  </Text>
                </Radio>
              </Radio.Group>
            </VStack>
          </VStack>
          <HStack display={'flex'}>
            <Text fontFamily={'semi_bold'} mr={4}>
              หมายเหตุ
            </Text>
            <FormTextAreaInput
              flex={1}
              name={'note'}
              form={form}/>
          </HStack>
        </FadeIn>
      </ScrollView>
      <HStack space={6} px={5}>
        <MyButton
          flex={3}
          onPress={() => {
            router.goBack()
          }}
          colorScheme={'dark'}
          color={'black'}
          fontFamily={'medium'}
          title={'ยกเลิก'}/>
        <MyButton
          flex={5}
          isLoading={attach.status.isLoading}
          onPress={() => {
            onSubmit()
          }}
          colorScheme={'danger'}
          fontFamily={'medium'}
          title={'บันทึก'}/>
      </HStack>
    </VStack>
  )
}
