import './index.scss'

const BottomResultBox = ({ averageTime }: { averageTime: number }) => {
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: averageTime,
    },
    {
      title: 'Longest word:',
      value: '-',
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
