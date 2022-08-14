import {IProps} from "../../cores/types.core";
import {Box, HStack, Text} from "native-base";
import {useState} from "react";
import {TabView} from 'react-native-tab-view';

export const Job = (props: IProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'first',
      title: 'Tab 1'
    },
    {
      key: 'second',
      title: 'Tab 2'
    },
    {
      key: 'third',
      title: 'Tab 3'
    },
    {
      key: 'fourth',
      title: 'Tab 4'
    },
  ])

  return (
    <Box flex={1} bg={'muted.100'} safeArea>
      <Box>
        <Text fontFamily={'medium'} fontSize={20}>
          My Jobs
        </Text>
      </Box>
      <HStack>

      </HStack>
    </Box>
  )
}