import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNoteList } from '../viewmodels/useNoteList';
import NoteItem from '../components/NoteItem';

/**
 * ノート一覧画面のコンポーネント
 * ViewModel（useNoteList）から状態とロジックを取得して表示する
 */
export default function NoteListScreen() {
  // ViewModelから状態を取得
  const { notes, loading, error } = useNoteList();

  // 読み込み中の表示
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>読み込み中...</Text>
      </View>
    );
  }

  // エラーが発生した場合の表示
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>エラーが発生しました: {error.message}</Text>
      </View>
    );
  }

  // ノート一覧の表示
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📒 ノート一覧</Text>

      {/* FlatListでノートをリスト表示 */}
      <FlatList
        data={notes} // 表示するノートデータ
        keyExtractor={(item) => item.id} // 一意なキー（id）
        renderItem={({ item }) => (
          <NoteItem note={item} /> // NoteItemコンポーネントで表示
        )}
      />
    </View>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
