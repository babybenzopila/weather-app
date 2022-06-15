import { View } from 'react-native'

export default function Container({ children, style }) {
    return <View style={{ marginHorizontal: 22, ...style }}>{children}</View>
}
