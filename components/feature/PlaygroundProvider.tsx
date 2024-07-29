'use client'

import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { Files, Theme } from './PlaygroundContext'
import { PlaygroundContext } from './PlaygroundContext'
import { compress, fileName2Language, uncompress } from '@/utils/utils'
import { initFiles } from '@/utils/files'

// function getFilesFromUrl() {
//   let files: Files | undefined
//   try {
//     const hash = decodeURIComponent(window.location.hash.slice(1))
//     files = JSON.parse(hash)
//   }
//   catch (error) {
//     console.error(error)
//   }
//   return files
// }
function getFilesFromUrl() {
  let files: Files | undefined
  try {
    const hash = uncompress(window.location.hash.slice(1))
    files = JSON.parse(hash)
  }
  catch (error) {
    console.error(error)
  }
  return files
}

export function PlaygroundProvider(props: PropsWithChildren) {
  const { children } = props
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles)
  const [selectedFileName, setSelectedFileName] = useState('App.tsx')
  const [theme, setTheme] = useState<Theme>('light')

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
    theme,
    setTheme,
    setSelectedFileName,
    setFiles,
    addFile,
    removeFile,
    updateFileName,

  }), [files, selectedFileName, setSelectedFileName, setFiles, addFile, removeFile, updateFileName])

  // useEffect(() => {
  //   const hash = JSON.stringify(files)
  //   window.location.hash = encodeURIComponent(hash)
  // }, [files])

  useEffect(() => {
    const hash = compress(JSON.stringify(files))
    window.location.hash = hash
  }, [files])

  return <PlaygroundContext.Provider value={ctxValue}>{children}</PlaygroundContext.Provider>
}
