import { View, Text, Image } from 'react-native'
import React from 'react'
import clsx from 'clsx'

interface MessageInterface {
    message: string,
    type:string
}

const Message: React.FC<MessageInterface> = ({message, type}) => {
  return (
    <View style={{zIndex:3}} className={clsx(type !== 'bot' ? 'items-end': '', )}>
        <View  className={clsx('w-4/5 rounded-lg p-5 flex-row  gap-2', type == 'bot'?'bg-violet-600':'bg-gray-100' )}>
            {   
                type === 'bot' && <Image
                className="w-10 h-10 "
                source={require("@/assets/images/securite.png")}
            />
            }
        <Text style={{flex:1}} className={clsx(type == 'bot'?'text-white':'', 'font-bold')}>{message.replaceAll('*', '')}</Text>
        </View>
    </View>
  )
}

export default Message