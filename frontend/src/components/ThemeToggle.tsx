import { Palette } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { mode, colorTheme, toggleMode, setColorTheme } = useThemeStore();
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    if (mode !== 'dark') {
      toggleMode(); // Force zustand state to dark if it isn't
    }
  }, [mode, toggleMode]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Color Theme Picker */}
      {showColorPicker && (
        <div className="bg-[#1a1a1a] rounded-lg shadow-xl p-3 border border-zinc-800 animate-fadeIn">
          <p className="text-xs font-semibold mb-2 text-gray-300">Color Theme</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setColorTheme('red');
                setShowColorPicker(false);
              }}
              className={`w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-500 hover:scale-110 transition-transform ${
                colorTheme === 'red' ? 'ring-2 ring-red-600 ring-offset-2 dark:ring-offset-gray-800' : ''
              }`}
              title="Red Theme"
            />
            <button
              onClick={() => {
                setColorTheme('gold');
                setShowColorPicker(false);
              }}
              className={`w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-500 hover:scale-110 transition-transform ${
                colorTheme === 'gold' ? 'ring-2 ring-yellow-600 ring-offset-2 dark:ring-offset-gray-800' : ''
              }`}
              title="Gold Theme"
            />
          </div>
        </div>
      )}

      {/* Color Picker Button */}
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="w-12 h-12 rounded-full bg-[#1a1a1a] shadow-lg hover:shadow-red-600/20 transition-all flex items-center justify-center border border-zinc-800 hover:scale-110 ml-auto"
        title="Change Color Theme"
      >
        <Palette className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
}
