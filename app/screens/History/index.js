import React, {useEffect, useState} from 'react';
import {RefreshControl, FlatList, View} from 'react-native';
import {BaseColor, useTheme, DefaultFont} from '@config';
import {Text, Icon, FormOption} from '@components';
import {Header, SafeAreaView, ListThumbSquare} from '@components';
import styles from './styles';
import {MessagesData} from '@data';
import {useTranslation} from 'react-i18next';
import axios from 'react-native-axios';
import apiList from '../../apiList';
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

//todo
// history color according to mode
// getting history data

export default function Messenger({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [userData, setUserdata] = useState('');
  const [refreshing] = useState(false);
  const [messenger] = useState(MessagesData);
  const [history, setHistory] = useState({});

  const getColorMood = score => {
    switch (true) {
      case score <= 10:
        return '#ff7575';

      case score > 10 && score <= 20:
        return '#ff8c75';

      case score > 20 && score <= 30:
        return '#ffa375';

      case score > 30 && score <= 40:
        return '#ffba75';

      case score > 40 && score <= 50:
        return '#ffd375';

      case score > 50 && score <= 60:
        return '#efff75';

      case score > 60 && score <= 70:
        return '#c3ff75';

      case score > 70 && score <= 80:
        return '#8aff75';

      case score > 80 && score <= 90:
        return '#75ffb3';

      case score > 90:
        return '#75ffe6';
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');

      if (value !== null) {
        axios
          .get(apiList.getUserDate, {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          })
          .then(res => getHistory(res.data._id))
          .catch(e => console.log(e));
       // console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getHistory = id => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 2)
      .toISOString('uk')
      .substring(0, 10);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      .toISOString('uk')
      .substring(0, 10);

    // post api because get dont haves

    console.log({
      sdate: firstDay, // first day of month
      edate: lastDay, // last day of month
      userId: id,
    });
    axios
      .post(apiList.GetMonthData, {
        sdate: firstDay, // first day of month
        edate: lastDay, // last day of month
        userId: id,
      })
      .then(res => {
        const x = {};
       // console.log(res.data)
        res.data.forEach(item => {
          x[item.dateOfQuiz.substring(0, 10)] = {
            customStyles: {
              container: {
                backgroundColor: getColorMood(Number(item.score)),
              },
              text: {
                color: getColorMood(Number(item.score)),
                fontWeight: 'bold',
              },
            },
          };
        });
        console.log(x);
        setHistory(x);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title={t('History')} />

      <View style={[styles.contentCalendar, {backgroundColor: colors.card}]}>
        <Calendar markingType={'custom'} markedDates={history} />
      </View>
     
     <FormOption style={{marginTop: 20}} />
    </View>
  );
}
