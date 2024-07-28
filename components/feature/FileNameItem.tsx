'use client'

import type { MouseEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'

export interface FileNameItemProps {
  value: string
  isCurrent: boolean
  creating: boolean
  readonly: boolean
  onEditComplete: (name: string) => void
  onClick: () => void
  onRemove: MouseEventHandler
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, isCurrent = false, onClick, onEditComplete, creating, onRemove, readonly } = props

  const [name, setName] = useState(value)
  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }

  const handleInputBlur = () => {
    setEditing(false)
    onEditComplete(name)
  }

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus()
    }
  }, [creating])

  return (
    <div
      className={
        'inline-flex py-1.5 px-2.5 text-xs cursor-pointer items-center text-gray-600 '
        + `${isCurrent ? 'border-b !text-blue-600 border-blue-600' : ''}`
      }
      onClick={onClick}
    >
      {editing
        ? (
            <input
              ref={inputRef}
              className="w-20 p-1 text-xs text-white bg-gray-600 border border-gray-600 rounded-md outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={handleInputBlur}
            />
          )
        : (
            <>
              <span onDoubleClick={!readonly ? handleDoubleClick : () => { }}>{name}</span>
              { !readonly
                ? (
                    <span style={{ marginLeft: 5, display: 'flex' }} onClick={onRemove}>
                      <svg width="12" height="12" viewBox="0 0 24 24">
                        <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                        <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </span>
                  )
                : null }
            </>
          )}
    </div>
  )
}
