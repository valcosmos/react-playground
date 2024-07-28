'use client'

import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from './Header'
import CodeEditor from './CodeEditor'

import Preview from './preview/Preview'

export default function ReactPlayground() {
  return (
    <div className="h-screen">
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
