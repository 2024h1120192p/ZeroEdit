// src/utils/storage.js

// Read from localStorage
export const loadSaved = (key) => localStorage.getItem(key);
export const save = (key, value) => localStorage.setItem(key, value);


// Read/Write Theme from localStorage
export const loadSavedGlobalTheme = () => loadSaved('GlobalThemeDark') === 'true';
export const loadSavedEditorTheme = () => loadSaved('EditorThemeDark') === 'true';
//
export const saveGlobalTheme = (globalThemeDark) => save('GlobalThemeDark', globalThemeDark === true);
export const saveEditorTheme = (editorThemeDark) => save('EditorThemeDark', editorThemeDark === true);

// Read/Write settings from localStorage
export const loadSavedSettings = () => JSON.parse(loadSaved("settings"));;
export const saveSettings = (settings) => save("settings", JSON.stringify(settings));

