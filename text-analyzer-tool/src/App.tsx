import { useState, ChangeEvent } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'
import { pronouns } from './data/pronouns'

const App = () => {
  const [charactersCount, setCharactersCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [sentencesCount, setSentencesCount] = useState(0)
  const [paragraphsCount, setParagraphsCount] = useState(0)
  const [pronounsCount, setPronounsCount] = useState(0)
  const [averageTime, setAverageTime] = useState(0)
  const WORDSPERMIN = 225

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setCharactersCount(text.length)

    const words = text.trim().split(/\s+/)
    setWordCount(words.length)

    const sentences = text.split(/[.!?]+/)
    setSentencesCount(sentences.length - 1)

    const paragraphs = text.split('\n\n').filter(Boolean).length
    setParagraphsCount(paragraphs)

    const newPronounsCount = words.reduce((count, word) => {
      const cleanedWord = word.trim().toLowerCase()
      if (pronouns.includes(cleanedWord)) {
        return count + 1
      } else {
        return count
      }
    }, 0)
    setPronounsCount(newPronounsCount)

    const averageReadingTime = Math.ceil(words.length / WORDSPERMIN)
    setAverageTime(averageReadingTime)
  }

  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox
            charactersCount={charactersCount}
            wordsCount={wordCount}
            sentencesCount={sentencesCount}
            paragraphsCount={paragraphsCount}
            pronounsCount={pronounsCount}
          />
          <TextArea onChange={handleChange} />
          <BottomResultBox averageTime={averageTime} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
