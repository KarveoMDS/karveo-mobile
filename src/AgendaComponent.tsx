import {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Alert} from 'react-native';
import {
  Agenda,
  type AgendaEntry,
  type AgendaSchedule,
  type DateData,
} from 'react-native-calendars';

import {LocaleConfig} from 'react-native-calendars';
import {useDayEvents} from './store/reducers/events.reducer';
import {useAppDispatch, useAppSelector} from './hooks/store';
import {getEvents} from './store/services/events.service';
import {getEventsAction} from './store/actions/events.action';
import {getLesson, type IAgendaEvent, type IEvent} from './interfaces/Events';
import {Row} from '../components/Layouts/Row';
import {Col} from '../components/Layouts/Col';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const timeToFRString = (time: number) => {
  const date = new Date(time);
  return `${
    LocaleConfig.locales.fr.dayNamesShort[date.getDay()]
  } ${date.getDate()} ${
    LocaleConfig.locales.fr.monthNamesShort[date.getMonth()]
  }`;
};

const getMonth = (time: number) => {
  const date = new Date(time);
  return LocaleConfig.locales.fr.monthNames[date.getMonth()];
};

const getStartEndHours = (event: IEvent) => {
  const start = new Date(event.start);
  const end = new Date(event.end);
  return `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
};

const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
  return r1.name !== r2.name;
};

const AgendaComponent = () => {
  const [items, setItems] = useState<AgendaSchedule>({});
  const [selectedDay, setSelectedDay] = useState<string>(
    timeToString(new Date().getTime()),
  );

  const allEvents = useAppSelector(state => state.events);

  useEffect(() => {
    if (Object.keys(allEvents.events).length === 0) {
      dispatch(getEventsAction());
    } else {
      const mapped = Object.keys(allEvents.events).map((key: string) => {
        // convert 31/12/2021 to 2021-12-31

        const keyArray = key.split('/');
        const newKey = `${keyArray[2]}-${keyArray[1]}-${keyArray[0]}`;

        const date = new Date(newKey);

        const day = timeToString(date.getTime());
        const event = allEvents.events[key];
        const schedule = event.map(e => {
          return {
            ...e,
            height: 50,
            day: e.start,
          };
        });

        return {
          [day]: schedule,
        };
      });

      setItems(mapped.reduce((acc, val) => ({...acc, ...val}), {}));
    }
  }, [allEvents]);

  const dispatch = useAppDispatch();

  return (
    <Agenda
      items={items}
      selected={selectedDay}
      showClosingKnob={true}
      renderItem={(item: IAgendaEvent, firstItemInDay) => {
        const lesson = getLesson(item.lessonType);
        const getBackgroundColor = () => {
          switch (item.status) {
            case 'canceled':
              return 'bg-danger-200';
            case 'pending':
              return 'bg-orange-200';
            default:
              return 'bg-green-200';
          }
        };

        const getTextColor = () => {
          switch (item.status) {
            case 'canceled':
              return 'text-danger-900';
            case 'pending':
              return 'text-orange-900';
            default:
              return 'text-green-900';
          }
        };

        const getDotColor = () => {
          switch (item.status) {
            case 'canceled':
              return 'bg-danger-900/20';
            case 'pending':
              return 'bg-orange-900/20';
            default:
              return 'bg-green-900/20';
          }
        };

        const LessonIcon = lesson?.icon;
        return (
          <TouchableOpacity
            onPress={() => Alert.alert(item._id)}
            className={`p-4 m-2 rounded-xl ${getBackgroundColor()} ${
              firstItemInDay ? 'mt-6' : ''
            }`}>
            <Row alignItems="center" justifyContent="space-between">
              <Text className={`font-bold ${getTextColor()}`}>
                {lesson.label}
              </Text>
              <LessonIcon className={`w-4 ${getTextColor()}`} />
            </Row>
            <View className={`h-[1px] w-full ${getDotColor()} my-2`} />
            <Col gap={4}>
              <Text className={`${getTextColor()} mb-1`}>
                {timeToFRString(new Date(item.day).getTime())} -{' '}
                {getStartEndHours(item)}
              </Text>

              <Row mt={16}>
                <Text
                  className={`font-bold text-white text-md ${getTextColor()}`}>
                  Réservation de :
                </Text>
                <Text className={`text-white text-md ${getTextColor()}`}>
                  {' '}
                  {item.student.firstName} {item.student.lastName}
                </Text>
              </Row>
            </Col>
          </TouchableOpacity>
        );
      }}
      renderDay={(day, item) => {
        if (!day) return <View className="w-16 mt-6" />;
        return (
          <View className="w-16 mt-6 flex items-center">
            <Text className="text-primary font-bold text-4xl">
              {new Date(day).getDate()}
            </Text>
            <Text className="text-primary">
              {getMonth(new Date(day).getTime())}
            </Text>
          </View>
        );
      }}
      renderEmptyData={() => {
        return (
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold text-center">
              Aucun évènement
            </Text>
          </View>
        );
      }}
      firstDay={1}
      hideExtraDays={false}
      rowHasChanged={(r1, r2) => {
        return r1.name !== r2.name;
      }}
      theme={{
        dotColor: '#1B1464',
        selectedDayBackgroundColor: '#1B1464',
        selectedDayTextColor: '#FFF',
      }}
      showOnlySelectedDayItems
    />
  );
};

export default AgendaComponent;
