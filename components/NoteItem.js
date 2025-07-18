// components/NoteItem.js

import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * ノート1件を表示するコンポーネント
 */
export default function NoteItem({ note }) {
  return <Text style={styles.item}>・{note.title}</Text>;
}

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    marginVertical: 4,
  },
});
