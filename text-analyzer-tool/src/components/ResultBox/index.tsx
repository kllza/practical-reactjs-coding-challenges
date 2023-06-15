import './index.scss'

const ResultBox = ({
  charactersCount,
  wordsCount,
}: {
  charactersCount: number
  wordsCount: number
}) => {
  const resultBar = [
    {
      title: 'Words',
      value: wordsCount,
    },
    {
      title: 'Characters',
      value: charactersCount,
    },
    {
      title: 'Sentences',
      value: 0,
    },
    {
      title: 'Paragraphs ',
      value: 0,
    },
    {
      title: 'Pronouns',
      value: 0,
    },
  ]

  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
