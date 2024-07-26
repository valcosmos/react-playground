import React, { useState, useRef, useEffect } from 'react'

export interface FileNameItemProps {
  value: string
  actived: boolean
  onClick: () => void
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick } = props

  const [name, setName] = useState(value)

  // className={classnames(styles['tab-item'], actived ? styles.actived : null)}
  return (
    <div
      className={'inline-flex py-1.5 px-2.5 text-xs cursor-pointer items-center text-gray-600 ' + `${actived?'border-b !text-blue-600 border-blue-600':''}`}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  )
}
