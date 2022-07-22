import { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import { VStack, Text, HStack, useTheme, ScrollView, Box } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTO/OrderFirestoreDTO';
import { CheckCircle, ArrowClockwise, DesktopTower, ClipboardText } from 'phosphor-react-native';

import { dateFormat } from '../utils/firestoreDateFormat';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  client: string;
  description: string
  solution: string
  closed: string
}

export function Details() {
  const [solution, setSolution] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const navigation = useNavigation();
  const route = useRoute()
  const { colors } = useTheme()

  const {orderId} = route.params as RouteParams

  function handleOrderClose(){
    

      firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      }).then(()=>{
        Alert.alert('Serviço','Finalizado com sucesso')
        navigation.goBack()
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Serviço','Não foi possivel encerrar a solicitação')
      })
    
  }

  useEffect(() => {
    firestore().collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
      .get().then((doc) => {
        const {client, title, description, status, create_at, closed_at, solution } = doc.data()

        const closed = closed_at ? dateFormat(closed_at) : null
        
        setOrder({
          id: orderId,
          client,
          title,
          description,
          status,
          solution,
          when: dateFormat(create_at),
          closed
        })
        setIsLoading(false)

      })
  },[])

  if (isLoading){
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Ordem de Serviço"/>
      <HStack bg="gray.600" justifyContent='center' p={2} alignItems="center">
        {
          order.status === 'closed' 
          ? <CheckCircle size={22} color={colors.green[300]} />
          : <ArrowClockwise size={20} color={colors.secondary[700]} />
        }
          <Text fontSize="md"
            color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
            ml={2}
            textTransform="uppercase"
          >
            {order.status === 'closed'? 'finalizado' : 'em andamento'}
          </Text>
        </HStack>
        <ScrollView mx={4}
        showsVerticalScrollIndicator={false}>
          <CardDetails
            client={order.client}
            title='Serviço'
            description={order.title}
            icon={DesktopTower}
          />

          <CardDetails
            client={order.client}
            title="descrição do serviço"
            description={order.description}
            icon={ClipboardText}
            footer={`Iniciado em ${order.when}`}
          />

          <CardDetails
          client={order.client}
          title='Finalização'
          icon={CheckCircle}
          footer={order.closed && `Finalizado em ${order.closed}`}>
            <Input
              placeholder='Observações sobre o serviço'
              onChangeText={setSolution}
              textAlignVertical='top'
              multiline
              h={24}
              borderWidth={1}
              borderColor="gray.400"
              bg="gray.600"
              value={order.solution}
            />

          </CardDetails>
        </ScrollView>
        {
          order.status === 'open' && 
          <Button
            title='Encerrar Serviço'
            m={2}
            onPress={handleOrderClose}
          />
        }
    </VStack>
  );
}