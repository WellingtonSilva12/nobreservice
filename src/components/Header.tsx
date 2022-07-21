import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
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
      {...rest}

    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}

      />
      <Heading color="gray.100" fontSize="lg" ml={-6} textAlign="center" flex={1}>
        {title}
      </Heading>

    </HStack>
  );
}