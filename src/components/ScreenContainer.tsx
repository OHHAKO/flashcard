import React from 'react';
import {SafeAreaView, ViewProps} from 'react-native';

export default class ScreenContainer extends React.Component<ViewProps> {
  render() {
    const {children} = this.props;
    return <SafeAreaView {...this.props}>{children}</SafeAreaView>;
  }
}
