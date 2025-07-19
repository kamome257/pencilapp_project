import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoteListScreen from '../screens/NoteListScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

/**
 * アプリの画面遷移を定義するナビゲーションコンポーネント
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen
          name="NoteList"
          component={NoteListScreen}
          options={{ title: '📒 ノート一覧' }}
        />
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ title: '📝 ノート編集' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
