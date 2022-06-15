import React from 'react'
import { Text, SafeAreaView, StyleSheet, ActivityIndicator, SectionList, View, Modal } from 'react-native'
import moment from 'moment'
import Container from '../components/common/Container'
import { useLoad } from '../request'
import { urls } from '../urls'
import WeatherDayItem from '../components/WeatherDayItem'
import CustomCalendar from '../components/common/CustomCalendar'

function getDate(date) {
    return moment(date.slice(0, 10)).format('dddd')
}

function getFilteredApi(map) {
    const groupedMap = map.reduce(
        (entryMap, e) => entryMap.set(getDate(e.dt_txt), [...entryMap.get(getDate(e.dt_txt)) || [], e]),
        new Map(),
    )

    return Array.from(groupedMap).map(([key, value]) => ({ title: key, data: value }))
}

export default function Home() {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [date, setDate] = React.useState('')

    const { response, loading } = useLoad({ url: urls.FORECAST, params: { q: 'san francisco,us' } })

    return (
        <SafeAreaView>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <CustomCalendar
                            setDate={(val) => setDate(moment(val).format('dddd'))}
                            closeModal={() => setModalVisible(false)} />
                    </View>
                </Modal>
            </View>

            <Text onPress={() => setModalVisible(true)}>CALENDAR {date}</Text>
            {date && (<Text onPress={() => setDate(null)}>CLOSE</Text>)}

            {date ? (
                <View>
                    {getFilteredApi(response.list).filter((q) => q.title === date).map((item) => (
                        <>
                            <Text style={styles.header}>{item.title}</Text>
                            {item.data.map((w) => <WeatherDayItem item={w} />)}
                        </>
                    ))}
                </View>
            ) : (
                <>
                    {response?.list && (
                        <>
                            <SectionList
                                sections={getFilteredApi(response.list)}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => <WeatherDayItem item={item} />}
                                renderSectionHeader={({ section: { title } }) => (
                                    <Text style={styles.header}>{title}</Text>
                                )}
                            />
                        </>
                    )}
                </>
            ) }

            <Container>
                {loading && <ActivityIndicator size="large" color="#000" />}

            </Container>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    weatherList: {
        height: 150,
        borderRadius: 10,
        backgroundColor: '#2770b6',
        marginTop: 100,
        padding: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    header: { fontWeight: '800', fontSize: 21, backgroundColor: '#fff' },
})
