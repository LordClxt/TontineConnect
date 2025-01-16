import { View } from 'react-native'
import React from 'react'
import Message from './Message'

// @ts-ignore
const MessageSection: React.FC<MessagesProps> = ({messages}) => {

  
  return (
    <View style={{zIndex:1}} className='mx-5 my-[8rem] gap-4 mt-5'>
      {
        // @ts-ignore
        messages.map((item)=>{
          return <Message  message={item.message} type={item.type} key={item.key} />
        })
      }
    </View>
  )
}

export default MessageSection