'use client'

import type { PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'
import type { Files } from './PlaygroundContext'
import { PlaygroundContext } from './PlaygroundContext'
import { fileName2Language } from '@/utils/utils'
import { initFiles } from '@/utils/files'

export function PlaygroundProvider(props: PropsWithChildren) {
  const { children } = props
  const [files, setFiles] = useState<Files>(initFiles)
  const [selectedFileName, setSelectedFileName] = useState('App.tsx')

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    }
    setFiles({ ...files })
  }

  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null)
      return
    const { [oldFieldName]: value, ...rest } = files
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    }
    setFiles({
      ...rest,
      ...newFile,
    })
  }

  const ctxValue = useMemo(() => ({
    files,
    selectedFileName,
    setSelectedFileName,
    setFiles,
    addFile,
    removeFile,
    updateFileName,
  }), [files, selectedFileName, setSelectedFileName, setFiles, addFile, removeFile, updateFileName])

  return <PlaygroundContext.Provider value={ctxValue}>{children}</PlaygroundContext.Provider>
}
