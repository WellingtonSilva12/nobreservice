import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { ArrowLeft, CaretLeft } from 'phosphor-react-native';
import React from 'react';

type Props = StyledProps & {
  title: string;
}

export function Header({title, ...rest}: Props) {
  const { colors} = useTheme()
  const navigation = useNavigation()

  function handleGoBack(){
    navigation.goBack()
  }



  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      px={2}
      {...rest}

    >
      <IconButton
        icon={<ArrowLeft color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}
        px={6}

      />
      <Heading color="gray.100" fontSize="md" ml={-20} textAlign="center" flex={1} textTransform="uppercase">
        {title}
      </Heading>

    </HStack>
  );
}