import './App.css';
import Avatar from 'react-avatar';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'

function App() {

  const [queryResults, setQueryResults] = useState([{
    "question": "Who are you?",
    "answer": "I am Jessie"
  }])
  const [query, setQuery] = useState("")
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [queryResults]);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`http://localhost:8000/query?query=${query}`).then(
      res => (setQueryResults([...queryResults, { "question": query, "answer": res.data}]))
    )
    
    setQuery('')
  }

  return (
    <div className="App">
      <div className="side-container">
        <h1 className="hero">Chatbots for Student Assistance</h1>
        <p className="content">Say Hi to Jessie. Our very own personel assistant who is here to answer all your questions. </p>
      </div>
      <div className="chatbot-container">
        <div className="messages-container" ref={messagesEndRef}>
          {queryResults.map(res => {
            return (
              <>
                <>
                  <Avatar style={{ "alignSelf": "flex-end" }} round={true} size="27" facebook-id="invalidfacebookusername" src="https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-18.jpg" />
                <div className="message-container" style={{ "alignSelf": "flex-end" }}>
                  {res.question}
                </div>
                </>
                <>
                  <Avatar round={true} size="27" facebook-id="invalidfacebookusername" src="https://i.pinimg.com/564x/61/19/a9/6119a94aeaa05675168ef4941b4b739b.jpg" />
                <div className="message-container">
                  {res.answer}
                </div>
                </>
              </>
            )
          })
          }
        </div>
        <form action="#" onSubmit={e => handleSubmit(e)}>
          <input type="text" required className='query' value={query} onChange={e => setQuery(e.target.value)} />
        </form>
      </div>
    </div>
  );
}

export default App;
