import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../redux/noslice';
import { RootState } from '../redux/store';
import socket from '../utils/socket';

interface NoteEditorProps {
  noteId: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ noteId }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null); // Ensure Quill is only initialized once
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.note.content);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your note...',
      });

      // Set text direction to left-to-right (ltr) after initialization
      const quillEditor = quillInstance.current;
      quillEditor.root.setAttribute('dir', 'ltr'); // This will apply LTR text direction

      // Handle text-change
      quillEditor.on('text-change', () => {
        const noteContent = quillEditor.root.innerHTML;
        dispatch(setContent(noteContent));
        socket.emit('editNote', { noteId, content: noteContent });
      });

      // Load the initial content from server
      socket.emit('joinNote', noteId);
      socket.on('loadNote', (note: { content: string }) => {
        quillEditor.root.innerHTML = note.content;
        dispatch(setContent(note.content));
      });

      // Sync with other users in real-time
      socket.on('noteUpdated', (updatedContent: string) => {
        quillEditor.root.innerHTML = updatedContent;
      });
    }
  }, [dispatch, noteId]);

  return (
    <div className="note-editor">
      <div
        className="p-4 bg-light rounded-md border border-gray-300"
        ref={editorRef}
      ></div>
    </div>
  );
};

export default NoteEditor;
