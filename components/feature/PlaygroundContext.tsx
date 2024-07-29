import { createContext } from 'react'
import type { CEditorProps } from './Editor'

export interface Files {
  [key: string]: CEditorProps['file']
}

export type Theme = 'light' | 'dark'

export interface PlaygroundContextProps {
  selectedFileName: string
  theme?: Theme
  setTheme?: (theme: Theme) => void
  files?: Files
  setSelectedFileName?: (fileName: string) => void
  setFiles?: (files: Files) => void
  addFile?: (fileName: string) => void
  removeFile?: (fileName: string) => void
  updateFileName?: (oldFieldName: string, newFieldName: string) => void
}

export const PlaygroundContext = createContext<PlaygroundContextProps>({
  selectedFileName: 'App.tsx',
})
