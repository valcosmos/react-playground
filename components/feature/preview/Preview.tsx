import { useContext, useEffect, useRef, useState } from 'react'
import { debounce } from 'es-toolkit'
import { PlaygroundContext } from '../PlaygroundContext'
// import Editor from '../Editor'
import Message from '../Message'
import { iframeStr } from './iframe'
import { IMPORT_MAP_FILE_NAME } from '@/utils/files'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  // const [compiledCode, setCompiledCode] = useState('')

  const compilerWorkerRef = useRef<Worker>()

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

  // useEffect(() => {
  //   if (files) {
  //     const res = compile(files)
  //     // setCompiledCode(res)
  //     setIframeUrl(getIframeUrl(res))
  //   }
  // }, [files])

  useEffect(
    debounce(() => {
      compilerWorkerRef.current?.postMessage(files)
    }, 500),
    [files],
  )

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new Worker(new URL('./compiler', import.meta.url))
      compilerWorkerRef.current.addEventListener('message', ({ data }) => {
        if (data.type === 'COMPILED_CODE') {
          setIframeUrl(getIframeUrl(data.data))
        }
        else {
          // console.log('error', data);
        }
      })
    }
  }, [])

  const [error, setError] = useState('')

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

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
      <Message type="error" content={error} />
      {/* <Editor file={{
            name: 'dist.js',
            value: compiledCode,
            language: 'javascript'
        }}/> */}
    </div>
  )
}
