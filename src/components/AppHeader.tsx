import * as React from 'react';
import { memo } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// import {
//   BORDERRADIUS,
//   COLORS,
//   FONTFAMILY,
//   FONTSIZE,
//   SPACING,
// } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
      <Ionicons name="clock" size={12} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: 'white',
    fontSize: 24,
  },
  headerText: {
    flex: 1,
    fontFamily: 'poppins_medium',
    fontSize:20,
    textAlign: 'center',
    color: 'white',
  },
  emptyContainer: {
    height: 40,
    width: 40,
  },
  iconBG: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'orange',
  },
});
export default AppHeader;