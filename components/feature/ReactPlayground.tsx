'use client'

import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { useContext } from 'react'
import Header from './Header'
import CodeEditor from './CodeEditor'

import Preview from './preview/Preview'
import { PlaygroundContext } from './PlaygroundContext'

export default function ReactPlayground() {
  const { theme } = useContext(PlaygroundContext)
  return (
    <div className={`h-screen ${theme}`}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
