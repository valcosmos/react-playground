'use client'
import { createATA } from '@/utils/ata'
import { editor } from 'monaco-editor'

import MonacoEditor, { EditorProps, OnMount } from '@monaco-editor/react'

export interface EditorFile {
  name: string
  value: string
  language: string
}

interface Props {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}


export default function Editor(props: Props) {
  const { file, onChange, options } = props

  const code = `export default function App() {
    return <div>xxx</div>
    }
    `
  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run()

      // let actions = editor.getSupportedActions().map((a) => a.id)
      // console.log(actions)
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true
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
      height={'100%'}
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6
        },
        ...options
      }}
    />
  )
}
