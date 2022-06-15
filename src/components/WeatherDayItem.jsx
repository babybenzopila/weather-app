import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

function getTemp(temp) {
    return `${Math.floor(+temp - 273)} C`
}

export default function WeatherDayItem({ item }) {
    return (
        <View style={styles.item}>
            <Text>
                {moment(item.dt_txt).format('kk:mm')}
            </Text>

            <Text>
                humidity: {item.main.humidity}
            </Text>

            <Text>TEMPERATURE {getTemp(item.main.temp)}</Text>

            <Text>
                Temp min: {getTemp(item.main.temp_min)}
            </Text>

            <Text>
                Temp max: {getTemp(item.main.temp_max)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: { marginBottom: 16 },
})
