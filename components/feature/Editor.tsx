'use client'

import type { EditorProps, OnMount } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import { createATA } from '@/utils/ata'
import MonacoEditor from '@monaco-editor/react'
import { LoaderIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export interface EditorFile {
  name: string
  value: string
  language: string
}

export interface CEditorProps {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: CEditorProps) {
  const { file, onChange, options } = props
  const { theme } = useTheme()

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
    })

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue())
    })

    ata(editor.getValue())
  }
  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      theme={`vs-${theme}`}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      loading={
        <LoaderIcon className="animate-spin" size={30} />
      }
      value={file.value}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  )
}
