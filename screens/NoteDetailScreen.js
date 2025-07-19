import React from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useNoteDetail } from '../viewmodels/useNoteDetail';

/**
 * ノート詳細画面（表示・編集・保存）
 * - ViewModel（useNoteDetail）で状態とロジックを管理
 * - TextInputでノート内容を編集
 * - 保存ボタンで保存処理を実行
 */
export default function NoteDetailScreen({ route }) {
  // 一覧画面から渡されたnoteIdを取得
  const { noteId } = route.params;

  // ViewModelから状態と関数を取得
  const {
    note,
    loading,
    error,
    updateNoteField,
    saveNote,
    saved,
  } = useNoteDetail(noteId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>読み込み中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>エラーが発生しました: {error.message}</Text>
      </View>
    );
  }

  if (!note) {
    return (
      <View style={styles.center}>
        <Text>ノートが見つかりませんでした</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>タイトル：</Text>
      <TextInput
        style={styles.input}
        value={note.title}
        onChangeText={(text) => updateNoteField('title', text)}
        placeholder="タイトルを入力"
      />

      <Text style={styles.label}>内容：</Text>
      <TextInput
        style={styles.textarea}
        value={note.content}
        onChangeText={(text) => updateNoteField('content', text)}
        placeholder="内容を入力"
        multiline
      />

      <Button title="保存する" onPress={saveNote} />

      {saved && <Text style={styles.saved}>✅ 保存されました！</Text>}
    </View>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    paddingVertical: 4,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginTop: 8,
    padding: 10,
    height: 120,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  saved: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
  },
});
