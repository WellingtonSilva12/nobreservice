import { VStack, HStack, Text, Box, useTheme } from 'native-base';
import {ReactNode} from 'react'
import {IconProps} from 'phosphor-react-native'

type Props =  {
  client: string
  title: string
  description?: string
  footer?: string
  icon: React.ElementType<IconProps>
  children?: ReactNode
}


export function CardDetails({
  client,
  title, 
  description, 
  footer = null, 
  icon: Icon, 
  children
}: Props) {
  
  const { colors  } = useTheme()
  
  return (
    <VStack bg='gray.600' p={4} mt={3} rounded="sm">
      <HStack alignItems="center" mb={2}>
        <Icon color={colors.primary[700]} />
        <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>
      
      {
        !!description && <Text color= "gray.100" fontSize = "md" mb={2}> {description} </Text>
      }
      
        {children}

      {
        !!footer && 
        <Box borderTopWidth={1} borderTopColor="gray.400">
          <Text mt={1} color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      }

    </VStack>
  );
}