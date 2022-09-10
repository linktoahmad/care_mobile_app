import React, {useState} from 'react';
import {View, ScrollView, Animated} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import * as Utils from '@utils';
import {serverIp} from "../../apiList"

import styles from './styles';

import {useTranslation} from 'react-i18next';

export default function HotelDetail({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const {activity} = route.params;
 
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  return (
    <View style={{flex: 1}}>
      
      {/* Header */}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={"black"}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('PreviewImage');
        }}
      />
     
    </View>
  );
}
