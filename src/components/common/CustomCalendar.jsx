import { Text, StyleSheet } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'

LocaleConfig.locales.fr = {
    monthNames: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май',
        'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ],
    monthNamesShort: [
        'Янв', 'Фев', 'Март', 'Апр', 'Май',
        'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек',
    ],
    dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четрверг', 'Пятница', 'Суббота', 'Воскресенье'],
    dayNamesShort: ['Вос', 'Пон', 'Вт', 'Ср', 'Чет', 'Пят', 'Суб'],
}
LocaleConfig.defaultLocale = 'fr'

export default function CustomCalendar({ setDate, closeModal }) {
    const today = new Date()
    let day = today.getDate()
    if (day < 10) {
        day = `0${day}`
    }

    let month = today.getMonth()
    if (month < 10) {
        month = `0${month + 1}`
    }

    return (
        <Calendar
            style={styles.calendarWrapper}
            current={`${today.getFullYear()}-${month}-${day}`}
            minDate={`${today.getFullYear()}-${month}-${day}`}
            maxDate={`${today.getFullYear()}-${month}-${today.getDate() + 5}`}
            monthFormat="yyyy MM"
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            firstDay={1}
            onDayPress={(value) => {
                setDate(value.dateString)
                closeModal()
            }}
            renderHeader={(date) => (
                <Text style={styles.calendarText}>
                    {LocaleConfig.locales.fr.monthNames[date.getMonth()]} {date.getFullYear()}
                </Text>
            )}
            enableSwipeMonths />
    )
}

const styles = StyleSheet.create({
    calendarWrapper: {
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 10,
    },
    calendarText: { paddingHorizontal: 50 },
})
