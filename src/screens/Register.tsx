import { useState } from 'react';
import { VStack, Text } from 'native-base';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';


import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleNewOrderRegister(){
    if (!title || !client){
    Alert.alert("Registrar", "Preencha todos os campos.")
    }
    setIsLoading(true)

    firestore()
    .collection('orders').add({
      client,
      title,
      description,
      status: 'open',
      create_at: firestore.FieldValue.serverTimestamp()
    })
    .then(()=> {
      Alert.alert('Ordem de Serviço', 'Ordem cadastrada com sucesso.')
      navigation.goBack()
    })
    .catch((error) =>{
      console.log(error)
      setIsLoading(false)
      return Alert.alert('Ordem de Serviço', 'Não foi possivel cadastrar ordem.')
    })

  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      < Header title='Ordem de Serviço'/>

      <Input 
        placeholder='Nome do Cliente'
        onChangeText={setClient}
        />
      <Input 
        placeholder='Nome do Serviço'
        onChangeText={setTitle}
        mt={3}
      />

      <Input
        placeholder='Descrição do serviço'
        flex={1}
        mt={3}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />
      <Button title='Cadastrar OS' mt={2} isLoading={isLoading}
      onPress={handleNewOrderRegister}/>

    </VStack>
  );
}