import {IProps} from "../../../cores/types.core";
import {Badge, HStack, Pressable, ScrollView, Text} from "native-base";
import {useState} from "react";
import {IJobItem} from "../../../models/job.model";
import {useMount} from "../../../hooks/core.hook";

export const Filter = (props: { items: IJobItem[] } & IProps) => {
  const [state, setState] = useState(0)
  const [count, setCount] = useState<{ [key: string]: number }>({})

  useMount(() => {
    setCount({})
    props.items.forEach((item: IJobItem) => {
      switch (item.job_type) {
        case 'เปิดร้านค้าใหม่':
          setCount((old) => ({
            ...old,
            'เปิดร้านค้าใหม่': (old['เปิดร้านค้าใหม่'] || 0) + 1,
          }))
          break
        case 'รับคืนสินค้า':
          setCount((old) => ({
            ...old,
            'รับคืนสินค้า': (old['รับคืนสินค้า'] || 0) + 1,
          }))
          break
        case 'รับคืนฝาแสตมป์':
          setCount((old) => ({
            ...old,
            'รับคืนฝาแสตมป์': (old['รับคืนฝาแสตมป์'] || 0) + 1,
          }))
          break
        case 'แจ้งรับคืน':
          setCount((old) => ({
            ...old,
            'แจ้งรับคืน': (old['แจ้งรับคืน'] || 0) + 1,
          }))
          break
      }
    })
  })

  return (
    <ScrollView py={7} horizontal={true}>
      <HStack space={'md'}>
        <Pressable onPress={() => setState(0)}>
          <Badge bg={state === 0 ? 'danger.500' : 'white'} rounded={'lg'} borderColor={'danger.500'}>
            <Text fontFamily={'medium'} color={state === 0 ? 'white' : 'danger.500'}>
              ทั้งหมด ({props.items.length || 0})
            </Text>
          </Badge>
        </Pressable>
        <Pressable onPress={() => setState(1)}>
          <Badge bg={state === 1 ? 'danger.500' : 'white'} rounded={'lg'} borderColor={'danger.500'}>
            <Text fontFamily={'medium'} color={state === 1 ? 'white' : 'danger.500'}>
              เปิดร้านค้าใหม่ ({count['เปิดร้านค้าใหม่'] || 0})
            </Text>
          </Badge>
        </Pressable>
        <Pressable onPress={() => setState(2)}>
          <Badge bg={state === 2 ? 'danger.500' : 'white'} rounded={'lg'} borderColor={'danger.500'}>
            <Text fontFamily={'medium'} color={state === 2 ? 'white' : 'danger.500'}>
              รับคืนสินค้า ({count['รับคืนสินค้า'] || 0})
            </Text>
          </Badge>
        </Pressable>
        <Pressable onPress={() => setState(3)}>
          <Badge bg={state === 3 ? 'danger.500' : 'white'} rounded={'lg'} borderColor={'danger.500'}>
            <Text fontFamily={'medium'} color={state === 3 ? 'white' : 'danger.500'}>
              รับคืนฝาแสตมป์ ({count['รับคืนฝาแสตมป์'] || 0})
            </Text>
          </Badge>
        </Pressable>
        <Pressable onPress={() => setState(4)}>
          <Badge bg={state === 4 ? 'danger.500' : 'white'} rounded={'lg'} borderColor={'danger.500'}>
            <Text fontFamily={'medium'} color={state === 4 ? 'white' : 'danger.500'}>
              แจ้งรับคืน ({count['แจ้งรับคืน'] || 0})
            </Text>
          </Badge>
        </Pressable>
      </HStack>
    </ScrollView>
  )
}