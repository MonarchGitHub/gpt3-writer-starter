import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [userInput1, setUserInput1] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [userInput3, setUserInput3] = useState('');
  const [finalmerge, setfinalmerge] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {

    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tag1: userInput, tag2: userInput1, tag3: userInput2, tag4: userInput3 }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  // this function will display everything you write on the console
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  const onUserChangedText1 = (event) => {
    console.log(event.target.value);
    setUserInput1(event.target.value);
  };
  const onUserChangedText2 = (event) => {
    console.log(event.target.value);
    setUserInput2(event.target.value);
  };
  const onUserChangedText3 = (event) => {
    console.log(event.target.value);
    setUserInput3(event.target.value);
    // console.log(userInput3);
  };

  // const finalmergefunc = () => {
  //   setfinalmerge(userInput + userInput1 + userInput2 + userInput3);
  //   console.log(finalmerge);
  // };

  return (
    <div className="root">
      <Head>
        <title>Rate My Interview Major Project</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Rate My Interview</h1>
          </div>
          {/* first input box start */}
          <div className="header-subtitle">
            <h2>🔴 Provide concise details about your interview experience.</h2>
            <h3>🔴 Go through each and every question carefully to get the best results!</h3>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Which company did you interview for?"
            value={userInput}
            onChange={onUserChangedText}
          />

          {/* second input box */}
          {/* <div className="header-subtitle">
            <h2>How was you interview experience.</h2>
          </div> */}
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Which specific questions were you not able to answer?"
            value={userInput1}
            onChange={onUserChangedText1}
          />
          {/* third input box */}
          {/* <div className="header-subtitle">
            <h2>How was you interview experience.</h2>
          </div> */}
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What was the tech stack of the company?"
            value={userInput2}
            onChange={onUserChangedText2}
          />
          {/* third input box */}
          {/* <div className="header-subtitle">
            <h2>How was you interview experience.</h2>
          </div> */}
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Out of 1 to 10 what was your preparation level?"
            value={userInput3}
            onChange={onUserChangedText3}
          />
          {/* third input box */}
          {/* <div className="header-subtitle">
            <h2>How was you interview experience.</h2>
          </div> */}
        </div>
        <div className="prompt-container">

          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>


        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Here are the detailed insights on your interview experience</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}

      </div>
      <div className="badge-container grow">
        <a
          href="https://github.com/MonarchGitHub"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={buildspaceLogo} alt="buildspace logo" /> */}
            <p>Find me on GitHub 🤖</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
