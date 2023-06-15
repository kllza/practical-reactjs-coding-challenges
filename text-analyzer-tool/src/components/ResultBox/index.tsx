import './index.scss'

const ResultBox = ({
  charactersCount,
  wordsCount,
  sentencesCount,
  paragraphsCount,
  pronounsCount,
}: {
  charactersCount: number
  wordsCount: number
  sentencesCount: number
  paragraphsCount: number
  pronounsCount: number
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
      value: sentencesCount,
    },
    {
      title: 'Paragraphs ',
      value: paragraphsCount,
    },
    {
      title: 'Pronouns',
      value: pronounsCount,
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
