import { useState, useEffect } from 'react';
import { getNotesFromStorage } from '../services/FileService';

/**
 * ノート一覧の状態管理を行うViewModel
 * - ノートの取得
 * - 読み込み状態の管理
 * - エラー処理
 * - ノートの追加・削除
 */
export function useNoteList() {
  // ノート一覧の状態（Model）
  const [notes, setNotes] = useState([]);

  // 読み込み中かどうかの状態
  const [loading, setLoading] = useState(true);

  // エラーが発生した場合の状態
  const [error, setError] = useState(null);

  // 初回レンダリング時にノートを読み込む
  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await getNotesFromStorage(); // 外部サービスから取得
        setNotes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  // ノートを追加する関数
  const addNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
    // 必要なら保存処理も呼び出す
  };

  // ノートを削除する関数
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // Viewに渡す値と関数をまとめて返す
  return {
    notes,
    loading,
    error,
    addNote,
    deleteNote,
  };
}
