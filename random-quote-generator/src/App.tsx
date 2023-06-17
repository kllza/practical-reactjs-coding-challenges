import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import "./App.css"
import axios, { AxiosResponse } from "axios"
import { useState, useEffect } from "react"
import queryString from "query-string"

function App() {
  const url = "http://localhost:4000/quotes"
  const [quote, setQuote] = useState<string>("")
  const [author, setAuthor] = useState<string>("")

  const fetchData = () => {
    let randomIndex = Math.floor(Math.random() * 19)
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        const fetchedQuote = response.data[randomIndex].quote
        const fetchedAuthor = response.data[randomIndex].author
        setQuote(fetchedQuote)
        setAuthor(fetchedAuthor)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleShareOnTwitter = () => {
    const baseUrl = "https://twitter.com/intent/tweet"
    const queryParams = {
      text: `${quote} - ${author}`,
      hashtags: "myApp",
    }
    const url = `${baseUrl}?${queryString.stringify(queryParams)}`

    window.open(url, "_blank")
  }
  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          <div className="quote">
            <p>{quote}</p>
            <span>- {author}</span>{" "}
          </div>
          <div className="bottom-navigation">
            <div>
              <Button
                className={classnames("rotate cp")}
                onClick={() => {
                  fetchData()
                }}
              />
              <Button
                className="cp"
                onClick={() => {
                  fetchData()
                }}
              />
            </div>
            <div className="share">
              <span>Share At:</span>
              <Twitter
                title="Post this quote on twitter!"
                className="cp"
                onClick={handleShareOnTwitter}
              />
              <Whatsapp title="Post this quote on WhatsApp!" className="cp" />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-strip" />
    </>
  )
}

export default App
