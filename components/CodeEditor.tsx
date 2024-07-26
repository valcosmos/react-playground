import React, { useContext } from 'react'
import FileNameList from './FileNameList'
import Editor, { CEditorProps } from './Editor'
import { PlaygroundContext } from './PlaygroundContext'
import { debounce } from 'es-toolkit'

export default function CodeEditor() {
  // const file = {
  //   name: 'guang.tsx',
  //   // value: 'import lodash from "lodash";\n\nconst a = <div>Hello world</div>',
  //   value: 'const a = <div>Hello world</div>',
  //   language: 'typescript'
  // }

  const { files, setFiles, selectedFileName, setSelectedFileName } = useContext(PlaygroundContext)

  if (!files) return

  const file = files[selectedFileName]

  const onEditorChange: CEditorProps['onChange'] = (value?: string) => {
    files[file.name].value = value!
    setFiles && setFiles({ ...files })
  }

  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  )
}
