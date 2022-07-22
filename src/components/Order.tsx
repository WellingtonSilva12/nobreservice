import { Box, Circle, HStack, Pressable, Text, useTheme, VStack, IPressableProps } from 'native-base'

import { Clock, CheckCircle, ArrowClockwise } from 'phosphor-react-native'


export type OrderProps = {
  id: string
  client: string
  title: string
  description: string
  when: string
  status: 'open' | 'closed'
}

type Props = IPressableProps & {
  data: OrderProps
}

export function Order({ data, ...rest }: Props) {
  const { colors } = useTheme()

  const statusColor =
    data.status === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />
        <VStack flex={1} my={5} ml={8}>
          <HStack alignItems="center">
            <Text fontWeight="bold" color="white" fontSize="md" > {data.client}</Text>
          </HStack>
          <HStack alignItems="center">
            <Text fontWeight="600" color="gray.200" fontSize="md" > {data.title}</Text>
          </HStack>
          <HStack alignItems="center">
            <Clock size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>
        <Circle bg="gray.500" h={12} w={12} mx={4}>
          {
            data.status === 'closed'
              ? <CheckCircle size={30} color={statusColor} />
              : <ArrowClockwise size={28} color={statusColor} />
          }
        </Circle>
      </HStack>
    </Pressable>
  )
}
