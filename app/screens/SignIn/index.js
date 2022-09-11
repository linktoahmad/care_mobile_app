import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiList from '../../apiList';

export default function SignIn({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({id: true, password: true});

  /**
   * call when action login
   *
   */



  const validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      alert("invalid Email")
      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
  };

  const storeData = async (value,id) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
      await AsyncStorage.setItem('@storage_Key_id', id)
    } catch (e) {
      console.log(e)
    }
  }

  const onLogin = () => {
    if (id == '' || password == '') {
      setSuccess({
        ...success,
        id: false,
        password: false,
      });
    } else if (validate(id)) {
      setLoading(true)
      axios
        .post(apiList.login, {
          email: id,
          password: password,
        })
        .then(res => {
          storeData(res.data.token,res.data.id);
          dispatch(AuthActions.authentication(true));
          setTimeout(() => {
            navigation.navigate('Home')
          }, 1000);
          
        
        })
        .catch(e => {
          console.log(e)
          setLoading(false);
          alert("Try Again with different Credentials")
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('sign_in')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <View style={styles.contain}>
            <TextInput
              onChangeText={text => setId(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  id: true,
                });
              }}
              placeholder={'Email'}
              success={success.id}
              value={id}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={'Password'}
              secureTextEntry={true}
              success={success.password}
              value={password}
            />
            <Button
              style={{marginTop: 20}}
              full
              loading={loading}
              onPress={() => {
                onLogin();
              }}>
              {t('sign_in')}
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}>
              <Text body1 grayColor style={{marginTop: 25}}>
                {"Signup if you are new user"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
