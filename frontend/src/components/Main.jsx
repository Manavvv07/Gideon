
import { assets } from '../assets/assets'
import "./Style.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaRegMessage, FaRegCompass, FaRegLightbulb, FaCode, FaMicrophone } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { GoFileMedia } from "react-icons/go";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Greeting from './Greeting';
import Answer from './Answer';

const Main = () => {
    const cardData = [
    {text: "Suggest beautiful places to see on a trip", icon: <FaRegCompass  />},
    {text: "Help in brainstorming business ideas", icon: <FaRegMessage />},
    {text: "Summarize this topic for a Group discussion", icon: <FaRegLightbulb />},
    {text: "Increase the readability of given code", icon: <FaCode/> }
]

const [question, setQuestion] = useState("");
const[answer, setAnswer] = useState("")
const [triggerFetch, setTriggerFetch] = useState(false);
const [loading, setLoading] = useState(false);

useEffect(() => {
    if(triggerFetch && question.trim() !== ""){
        const fetchData = async () => {
            setLoading(true);

            try{
                const response = await axios({
                 url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                method: "post",
                data: {
                "contents": [{"parts": [{"text": question}]}]
                }
                });
                setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
                setQuestion("");
            } catch (error) {
                console.error("error: ", error);
                setAnswer("Sorry, I encontered an error while fetching the answer.")
            } finally {
                setLoading(false);
                setTriggerFetch(false);
            }
        };
        fetchData();
    }
}, [triggerFetch, question])

const handleSendQuestion = () => {
    if(!loading && question.trim() !== ""){
        setTriggerFetch(true);
    }
}

const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
        handleSendQuestion();
    }
}

const LoadingSkeleton = () => (
    <div className="answer-container" style={{display: 'block', width: '100%', minHeight: '100px', boxSizing: 'border-box' }}>
        <Skeleton count={5} height={18} style={{marginBottom: 15}}/>
        <Skeleton count={1} width='70%' height={18}/>
    </div>
);

  return (
    <div className='main'>
        <div className="nav">
            <span>Gideon <span className='version'>1.0</span></span>
            <img src={assets.user_icon} alt="" />
        </div>
        
        <div className="main-container">
            {loading ? (
                <LoadingSkeleton/>
            ) : answer ? (
                <Answer text={answer}/>
            ) : (
                <Greeting cardData={cardData}/>
            )}
            

            <div className="main-bottom">
                <div className="search-box">
                    <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder='Ask Gideon'/>
                    <div>
                    <GoFileMedia className='prompt-icon'/>
                    <FaMicrophone className='prompt-icon'/>
                    <button onClick={handleSendQuestion} className='send-button'>
                        <IoMdSend className='prompt-icon'/>
                    </button>
                    </div>
                </div>
                <p className="bottom-info">
                    Gideon may display inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main