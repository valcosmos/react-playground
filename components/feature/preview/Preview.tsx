'use client'

import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../PlaygroundContext'
// import Editor from '../Editor'
import { compile } from './compiler'
import { iframeStr } from './iframe'
import { IMPORT_MAP_FILE_NAME } from '@/utils/files'

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  // const [compiledCode, setCompiledCode] = useState('')

  const getIframeUrl = (compiledCode: string) => {
    if (!files)
      return ''

    const res = iframeStr
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`,
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`,
      )

    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const [iframeUrl, setIframeUrl] = useState<string>('')

  useEffect(() => {
    if (files) {
      const res = compile(files)
      // setCompiledCode(res)
      setIframeUrl(getIframeUrl(res))
    }
  }, [files])

  return (
    <div style={{ height: '100%' }}>
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
        // eslint-disable-next-line react-dom/no-unsafe-iframe-sandbox
        sandbox="allow-scripts allow-same-origin"
      />
      {/* <Editor file={{
            name: 'dist.js',
            value: compiledCode,
            language: 'javascript'
        }}/> */}
    </div>
  )
}
