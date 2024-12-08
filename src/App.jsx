import React from "react";
import { useState } from "react";
import axios from "axios";

function App() {

  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value)
    setSummary("")
  }

  const summarize = async () => {
    setSummary("Loading...")

    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: input,
        lang: 'en',
        engine: '2'
      },
      headers: {
        'x-rapidapi-key': 'dcf67b0885mshb575ab13e81274dp19a061jsn8e8685fd7dd8',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options)
      setSummary(response.data.summary);
    }
    catch{
      setSummary("Cannot summarize this article")
    }
  }

  const handleEnter = (e) => {
    if(e.key === "Enter") {
      setSummary("Loading...")
      summarize()
    }
  }

  return(
    <div className="w-screen h-screen bg-gray-700 flex justify-center items-center flex-col">
      <div className="container">
        <h1 className="flex w-full justify-center text-5xl font-bold main-header">Article Summarizer</h1>
        <div className="input-data-holder">
        <input type="text" placeholder="Paste your link here" className="input-box" onChange={handleInput} onKeyDown={handleEnter}/>
        <button className="submit" onClick={summarize}>Submit</button>
        </div>
        <div className="result-holder">
          <div className="header-holder">
          <h2 className="result-header">Short Summary</h2>
          </div>
        <textarea className="result" value={summary} readOnly>

        </textarea>
        </div>
      </div>
    </div>
  )
}

export default App