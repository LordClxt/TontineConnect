import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TransactionItem from './TransactionItem'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingOverlay from './LoadingOverlay'
import store from '@/store'

const TransactionItems = ({limit, isEpargne}: {limit?:number, isEpargne?:boolean}) => {

  const token = store((state) => state.token);

  const {data, isLoading, isSuccess} = useQuery({
    queryKey:['transactions'],
    queryFn:()=>axios.get('http://192.168.1.4:8000/blockchain/transactions/user', {
      headers:{
        'Authorization': `bearer ${token}`
      }
    }).then(res=>res.data)
  })

  const [transactions, setTransactions] = useState([])
  useEffect(()=>{
    if(isSuccess && isEpargne){
      setTransactions(data.filter((transaction:{nom:string})=>transaction.nom.includes('epargne')))
    }
    else{
      setTransactions(data)
    }
  }, [isSuccess, data])
  if(isLoading){
    return <LoadingOverlay />
  }
  
  return (
    <View className="mx-7">
          {
            isLoading ? <LoadingOverlay />:
            <View className=" gap-2">
              {
                // @ts-ignore
                transactions.reverse().slice(0, limit?limit:data.length)?.map((transaction: {nom:string, date:string, montant:string})=>{
                  return (
                    <TransactionItem date={transaction.date} nom={transaction.nom} montant={transaction.montant} />
                  )
                })
              }
            </View>
          }
      </View>
  )
}
export default TransactionItems