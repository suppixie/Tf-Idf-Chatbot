import './App.css';
import Avatar from 'react-avatar';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [queryResults, setQueryResults] = useState([
    {
      question: 'Hi',
      answer: 'Hello! How may I help you?',
    },
  ]);
  const [query, setQuery] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [savedConversations, setSavedConversations] = useState(() => {
    const savedConversations = localStorage.getItem('savedConversations');
    return savedConversations ? JSON.parse(savedConversations) : [];
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('savedConversations', JSON.stringify(savedConversations));
  }, [queryResults, savedConversations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8001/${enabled ? 'query_gpt' : 'query'}?query=${query}`).then((res) => {
      setQueryResults([...queryResults, { question: query, answer: res.data }]);
    });

    setQuery('');
  };

  const handleSaveConversation = () => {
    const timestamp = new Date().toLocaleDateString(); // Get current timestamp
    const conversationWithTime = { conversation: queryResults, timestamp }; // Include timestamp with conversation
    setSavedConversations([...savedConversations, conversationWithTime]);
  };

  const enableGPT = () => {
    setEnabled(true);
    alert('Generative AI enabled!');
  };

  return (
    <div className="App">
      <h1 className="logo">Therapipy</h1>
      {enabled ? <h3>enabled</h3> : null}
      <div className='full-container'>
      <div className="side-container">
        <h1 className="hero">Your ADHD Therapist</h1>
        <p className="content">Say Hi to Therapipy. It can answer all your questions on Attention Deficit Hyperactivity Disorder.</p>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn">Sign Up</button>
        </Link>
        
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

        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" required className="query" value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
        <button className="save-btn" onClick={handleSaveConversation}>Save Conversation</button>

      </div>
      <div className="saved-conversations">
  {savedConversations.map((conversationWithTime, index) => (
    <button key={index} className="conversation-btn" onClick={() => setQueryResults(conversationWithTime.conversation)}>
      Conversation {index + 1} - {conversationWithTime.timestamp}
    </button>
  ))}
</div>
    </div>
    </div>
  );
}

export default Home;
