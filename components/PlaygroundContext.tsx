'use client'
import { createContext } from "react"
import { CEditorProps } from "./Editor"

export interface Files {
  [key: string]: CEditorProps['file']
}

export interface PlaygroundContext {
  selectedFileName: string
  files?: Files
  setSelectedFileName?: (fileName: string) => void
  setFiles?: (files: Files) => void
  addFile?: (fileName: string) => void
  removeFile?: (fileName: string) => void
  updateFileName?: (oldFieldName: string, newFieldName: string) => void
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx'
})