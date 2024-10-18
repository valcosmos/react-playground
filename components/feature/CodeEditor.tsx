import type { CEditorProps } from './Editor'
import { debounce } from 'es-toolkit'
import dynamic from 'next/dynamic'
import React, { useContext } from 'react'
import FileNameList from './FileNameList'
import { PlaygroundContext } from './PlaygroundContext'

const Editor = dynamic(() => import('./Editor'), { ssr: false })

export default function CodeEditor() {
  const { files, setFiles, selectedFileName } = useContext(PlaygroundContext)

  if (!files)
    return

  const file = files[selectedFileName]

  const onEditorChange: CEditorProps['onChange'] = (value?: string) => {
    files[file.name].value = value!
    if (setFiles) {
      setFiles({ ...files })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  )
}
