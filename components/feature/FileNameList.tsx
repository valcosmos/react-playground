import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from '@/utils/files'
import { useContext, useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { FileNameItem } from './FileNameItem'
import { PlaygroundContext } from './PlaygroundContext'

export default function FileNameList() {
  const { files, selectedFileName, addFile, setSelectedFileName, updateFileName, removeFile } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState([''])
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (files) {
      setTabs(Object.keys(files))
    }
  }, [files])

  const handleEditComplete = (name: string, prevName: string) => {
    if (updateFileName)
      updateFileName(prevName, name)
    if (setSelectedFileName)
      setSelectedFileName(name)
    setCreating(false)
  }

  const addTab = () => {
    const newFileName = `Comp${Math.random().toString().slice(2, 6)}.tsx`
    if (addFile) {
      addFile(newFileName)
    }
    if (setSelectedFileName) {
      setSelectedFileName(newFileName)
    }
    setCreating(true)
  }

  const handleRemove = (name: string) => {
    if (removeFile) {
      removeFile(name)
    }
    if (setSelectedFileName) {
      setSelectedFileName(ENTRY_FILE_NAME)
    }
  }

  const readonlyFileNames = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME]

  return (
    <ScrollArea>
      <Tabs>
        <TabsList>
          {tabs.map((item, index, arr) => (
            <TabsTrigger
              key={`${Math.random().toString()}-${item}-${index.toString()}`}
              value={item}
            >
              <FileNameItem
                value={item}
                readonly={readonlyFileNames.includes(item)}
                creating={creating && index === arr.length - 1}
                isCurrent={selectedFileName === item}
                onClick={() => setSelectedFileName?.(item)}
                onEditComplete={name => handleEditComplete(name, item)}
                onRemove={(e) => {
                  e.stopPropagation()
                  handleRemove(item)
                }}
              />
            </TabsTrigger>
          ))}
          <TabsTrigger value="add">
            <span className="cursor-pointer text-xl" onClick={addTab}>
              +
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
