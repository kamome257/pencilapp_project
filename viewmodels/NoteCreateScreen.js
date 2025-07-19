import { useState } from 'react';
import { saveNoteToStorage } from '../services/FileService';
import uuid from 'react-native-uuid';

/**
 * 新しいノートを作成・保存するViewModel
 */
export function useNoteCreate() {
  const [note, setNote] = useState({
    id: uuid.v4(),
    title: '',
    content: '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  // タイトル・本文を更新する関数
  const updateNoteField = (field, value) => {
    setNote((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 保存処理
  const saveNote = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);

    // タイトルが空の場合はエラーをセットして中断
    if (!note.title || note.title.trim() === "") {
      setError("タイトルを入力してください。");
      setSaving(false);
      return;
    }

    try {
      await saveNoteToStorage(note);
      setSaved(true);
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  };

  return {
    note,
    updateNoteField,
    saveNote,
    saving,
    saved,
    error,
  };
}
