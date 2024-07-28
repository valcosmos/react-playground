export interface FileNameItemProps {
  value: string
  isCurrent: boolean
  onClick: () => void
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, isCurrent = false, onClick } = props

  // const [name, setName] = useState(value)

  // className={classnames(styles['tab-item'], isCurrent ? styles.isCurrent : null)}
  return (
    <div
      className={
        'inline-flex py-1.5 px-2.5 text-xs cursor-pointer items-center text-gray-600 '
        + `${isCurrent ? 'border-b !text-blue-600 border-blue-600' : ''}`
      }
      onClick={onClick}
    >
      <span>{value}</span>
    </div>
  )
}
