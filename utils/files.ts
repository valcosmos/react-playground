import type { Files } from '@/components/feature/PlaygroundContext'
import { app } from '@/template/app'
import { css } from '@/template/css'
import { main } from '@/template/main'
import { map } from '@/template/map'
// import importMap from '../template/import-map.json?raw'
// import AppCss from '../template/App.css?raw'
// import App from '../template/App.tsx?raw'
// import main from '../template/main.tsx?raw'
import { fileName2Language } from './utils'

// app 文件名
export const APP_COMPONENT_FILE_NAME = 'App.tsx'
// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'
// app 入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: app,
  },
  'App.css': {
    name: 'App.css',
    language: 'css',
    value: css,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: map,
  },
}
