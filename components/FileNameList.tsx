import { useContext, useEffect, useState } from 'react'

import { PlaygroundContext } from './PlaygroundContext'
import { FileNameItem } from './FileNameItem'

export default function FileNameList() {
  const { files, removeFile, addFile, updateFileName, selectedFileName, setSelectedFileName }
    = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    files && setTabs(Object.keys(files))
  }, [files])

  return (
    <div className="flex items-center h-9 overflow-auto border-b border-gray-600 bg-white">
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName?.(item)}
        >
        </FileNameItem>
      ))}
    </div>
  )
}
