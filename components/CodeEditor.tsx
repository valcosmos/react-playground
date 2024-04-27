import React from 'react'
import FileNameList from './FileNameList'
import Editor from './Editor'

export default function CodeEditor () {
      const file = {
        name: 'guang.tsx',
        value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
        language: 'typescript'
      }

      function onEditorChange() {
        console.log(...arguments)
      }

  return (
    <div className='flex flex-col h-full'>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange}/>
    </div>
  )
}
