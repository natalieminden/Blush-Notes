import React, { useState, useEffect } from 'react';
import { Trash2, PenLine, Plus, Folder, Palette } from 'lucide-react';

const THEMES = {
  sakura: {
    name: 'Sakura',
    classes: {
      primary: 'bg-pink-500',
      primaryHover: 'hover:bg-pink-600',
      sidebar: 'bg-pink-50',
      accent: 'bg-pink-100',
      accentHover: 'hover:bg-pink-200',
      text: 'text-gray-700',
      folderText: 'text-gray-600',
      noteBackground: 'bg-white',
      noteBorder: 'border-gray-100',
      noteText: 'text-gray-700',
      mainBackground: 'bg-white',
      inputBorder: 'border-gray-200',
      inputBackground: 'bg-white'
    }
  },
  desertRose: {
    name: 'Desert Rose',
    classes: {
      primary: 'bg-rose-400',
      primaryHover: 'hover:bg-rose-500',
      sidebar: 'bg-amber-50',
      accent: 'bg-amber-100',
      accentHover: 'hover:bg-amber-200',
      text: 'text-amber-900',
      folderText: 'text-amber-700',
      noteBackground: 'bg-amber-50',
      noteBorder: 'border-amber-100',
      noteText: 'text-amber-900',
      mainBackground: 'bg-white',
      inputBorder: 'border-amber-200',
      inputBackground: 'bg-white'
    }
  },
  cherryCola: {
    name: 'Cherry Cola',
    classes: {
      primary: 'bg-slate-900',
      primaryHover: 'hover:bg-slate-800',
      sidebar: 'bg-slate-900',
      accent: 'bg-slate-800',
      accentHover: 'hover:bg-slate-700',
      text: 'text-pink-200',
      folderText: 'text-pink-300',
      noteBackground: 'bg-slate-900',
      noteBorder: 'border-slate-800',
      noteText: 'text-pink-200',
      mainBackground: 'bg-slate-950',
      inputBorder: 'border-slate-700',
      inputBackground: 'bg-slate-900'
    }
  }
};

const NotesApp = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [folders, setFolders] = useState(() => {
    const savedFolders = localStorage.getItem('folders');
    return savedFolders ? JSON.parse(savedFolders) : [];
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'sakura';
  });

  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('All Notes');
  const [newFolderInput, setNewFolderInput] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const currentTheme = THEMES[theme].classes;

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('folders', JSON.stringify(folders));
    localStorage.setItem('theme', theme);
  }, [notes, folders, theme]);

  const addNote = () => {
    if (currentNote.content.trim()) {
      const newNote = {
        title: currentNote.title,
        content: currentNote.content,
        folder: selectedFolder === 'All Notes' ? null : selectedFolder,
        timestamp: new Date().toISOString(),
      };

      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = newNote;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setCurrentNote({ title: '', content: '' });
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setCurrentNote({
      title: notes[index].title || '',
      content: notes[index].content
    });
    setEditingIndex(index);
  };

  const addFolder = () => {
    if (newFolderInput.trim() && !folders.includes(newFolderInput)) {
      setFolders([...folders, newFolderInput]);
      setNewFolderInput('');
      setShowNewFolderInput(false);
    }
  };

  const deleteFolder = (folderName) => {
    setFolders(folders.filter(f => f !== folderName));
    if (selectedFolder === folderName) {
      setSelectedFolder('All Notes');
    }
  };

  const filteredNotes = notes.filter(note => 
    selectedFolder === 'All Notes' || note.folder === selectedFolder
  );

  return (
    <div className={`min-h-screen flex ${currentTheme.mainBackground}`}>
      <div className={`w-64 min-h-screen p-4 flex flex-col ${currentTheme.sidebar}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-light ${currentTheme.text}`}>
            Blush Notes
          </h1>
          <button 
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className={`transition-colors ${currentTheme.text} ${currentTheme.primaryHover}`}
          >
            <Palette size={20} />
          </button>
        </div>

        {showThemeSelector && (
          <div className="mb-4 p-2 bg-white rounded-lg shadow-sm">
            {Object.entries(THEMES).map(([themeKey, themeData]) => (
              <button
                key={themeKey}
                onClick={() => {
                  setTheme(themeKey);
                  setShowThemeSelector(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg mb-1 last:mb-0 
                  ${theme === themeKey ? currentTheme.accent : 'text-gray-600'} 
                  ${currentTheme.accentHover}`}
              >
                {themeData.name}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <button
            onClick={() => setSelectedFolder('All Notes')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 
              ${selectedFolder === 'All Notes' 
                ? `${currentTheme.accent} ${currentTheme.text}`
                : `${currentTheme.folderText} ${currentTheme.accentHover}`}`}
          >
            All Notes
          </button>
          
          {folders.map((folder) => (
            <div
              key={folder}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-200 
                ${selectedFolder === folder 
                  ? `${currentTheme.accent} ${currentTheme.text}`
                  : `${currentTheme.folderText} ${currentTheme.accentHover}`}`}
            >
              <button
                onClick={() => setSelectedFolder(folder)}
                className="flex items-center flex-grow"
              >
                <Folder size={16} className="mr-2" />
                {folder}
              </button>
              <button
                onClick={() => deleteFolder(folder)}
                className={`${currentTheme.folderText} hover:text-pink-500`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {showNewFolderInput ? (
          <div className="mt-4">
            <input
              type="text"
              value={newFolderInput}
              onChange={(e) => setNewFolderInput(e.target.value)}
              placeholder="Folder name"
              className={`w-full px-3 py-2 border ${currentTheme.inputBorder} rounded-lg focus:outline-none focus:border-pink-500`}
              onKeyPress={(e) => e.key === 'Enter' && addFolder()}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowNewFolderInput(true)}
            className="mt-4 flex items-center text-pink-500 hover:text-pink-600 px-3 py-2"
          >
            <Plus size={16} className="mr-1" /> New Folder
          </button>
        )}
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
              placeholder="Note title (optional)"
              className={`w-full p-4 border ${currentTheme.inputBorder} rounded-t-lg 
                focus:outline-none focus:border-pink-500 ${currentTheme.noteText} 
                ${currentTheme.inputBackground} text-lg`}
            />
            <textarea
              value={currentNote.content}
              onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
              placeholder="Write a note..."
              className={`w-full p-4 border border-t-0 ${currentTheme.inputBorder} rounded-b-lg mb-4 
                min-h-32 focus:outline-none focus:border-pink-500 ${currentTheme.noteText} 
                ${currentTheme.inputBackground} resize-none text-lg`}
            />
            <button
              onClick={addNote}
              className={`w-full ${currentTheme.primary} text-white py-2 px-4 rounded-lg 
                ${currentTheme.primaryHover} transition-colors duration-200`}
            >
              {editingIndex !== null ? 'Save changes' : 'Add note'}
            </button>
          </div>

          <div className="space-y-4">
            {filteredNotes.map((note, index) => (
              <div
                key={index}
                className={`border ${currentTheme.noteBorder} rounded-lg p-6 
                  ${currentTheme.noteBackground} shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    {note.title && (
                      <h2 className={`text-xl font-medium ${currentTheme.noteText} mb-2`}>
                        {note.title}
                      </h2>
                    )}
                    <p className={`${currentTheme.noteText} whitespace-pre-wrap text-lg`}>
                      {note.content}
                    </p>
                    {note.folder && (
                      <p className={`text-sm ${currentTheme.folderText} mt-2`}>
                        {note.folder}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => editNote(index)}
                      className={`${currentTheme.folderText} hover:text-pink-500 transition-colors`}
                    >
                      <PenLine size={18} />
                    </button>
                    <button
                      onClick={() => deleteNote(index)}
                      className={`${currentTheme.folderText} hover:text-pink-500 transition-colors`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className={`text-center ${currentTheme.folderText} mt-8`}>
              No notes in {selectedFolder}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
