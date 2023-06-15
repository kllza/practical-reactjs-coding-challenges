import './index.scss'
interface TextAreaProps {
  
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ onChange }: TextAreaProps) => {
  return (
    <textarea
      className="text-area"
      placeholder="Paste your text here..."
      onChange={onChange}
    />
  )
}

export default TextArea
