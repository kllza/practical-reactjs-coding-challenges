import { useState, ChangeEvent } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'

const App = () => {
  const [charactersCount, setCharactersCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setCharactersCount(text.length)

    const words = text.trim().split(/\s+/)
    setWordCount(words.length)
  }
  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox charactersCount={charactersCount} wordsCount={wordCount} />
          <TextArea onChange={handleChange} />
          <BottomResultBox />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
