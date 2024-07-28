import type { MouseEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

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

  const [popoverVisible, setPopoverVisible] = useState(false)

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
              <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>{name}</span>
              {!readonly
                ? (
                    <Popover open={popoverVisible}>
                      <PopoverTrigger>
                        <span className="flex items-center ml-1" onClick={() => setPopoverVisible(true)}>
                          <svg width="12" height="12" viewBox="0 0 24 24">
                            <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                            <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="space-y-4">
                        <h3 className="text-lg">Confirm to delete the file?</h3>
                        <footer className="flex justify-end space-x-2">
                          <Button size="sm" variant="secondary" onClick={() => setPopoverVisible(false)}>
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              onRemove(e)
                              setPopoverVisible(false)
                            }}
                          >
                            Confirm
                          </Button>
                        </footer>
                      </PopoverContent>
                    </Popover>
                  )
                : null}
            </>
          )}
    </div>
  )
}
