import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { 
  DarkModeOutlined as DarkIcon, 
  LightModeOutlined as LightIcon 
} from '@mui/icons-material';
import { useTheme } from '../utils/ThemeContext';

const ThemeToggle = ({ showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <button
        onClick={toggleTheme}
        className={`flex items-center gap-4 px-4 py-4 rounded-[20px] font-bold transition-all duration-300 w-full text-muted hover:bg-surface-2 hover:text-primary group`}
      >
        <div className={`h-11 w-11 flex items-center justify-center rounded-xl bg-surface-2 text-muted group-hover:bg-blue-600 group-hover:text-white transition-all shadow-card`}>
          {theme === 'light' ? <DarkIcon sx={{ fontSize: 20 }} /> : <LightIcon sx={{ fontSize: 20 }} />}
        </div>
        {showLabel && <span className="text-[15px]">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
      </button>
    </Tooltip>
  );
};

export default ThemeToggle;
