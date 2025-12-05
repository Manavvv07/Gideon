import "./Style.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaRegMessage, FaRegCompass, FaRegLightbulb, FaCode, FaMicrophone, FaRegCircleUser, FaGem } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { GoFileMedia } from "react-icons/go";
import { useContext, useEffect, useRef } from 'react';
import Greeting from './Greeting';
import Answer from './Answer';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Context } from '../context/Context';

const Main = () => {

    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    
    const { 
        onSent, 
        recentPrompt, 
        showResult, 
        loading, 
        resultData, 
        setInput, 
        input,
        user,
        messages
    } = useContext(Context);

    const cardData = [
        {text: "Suggest beautiful places to see on a trip", icon: <FaRegCompass  />},
        {text: "Help in brainstorming business ideas", icon: <FaRegLightbulb />},
        {text: "Suggest a topic for a Group discussion", icon: <FaRegMessage />},
        {text: "Write a basic code in Java to explain OOP ", icon: <FaCode/> }
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleSendQuestion = () => {
        if(input && input.trim() !== ""){
            onSent(); 
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSendQuestion();
        }
    }

    const handleCardClick = (promptText) => {
        setInput(promptText);
        onSent(promptText);
    }

    const LoadingSkeleton = () => (
        <div className="answer-container" style={{display: 'block', width: '100%', minHeight: '100px', boxSizing: 'border-box' }}>
            <Skeleton count={3} height={18} style={{marginBottom: 10}}/>
            <Skeleton count={1} width='70%' height={18}/>
        </div>
    );

    return (
        <div className='main'>
            <div className="nav">
                <span>Gideon <span className='version'>1.0</span></span>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    {user ? (
                        <button className='login-main' onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className='login-main' onClick={() => navigate('/login')}>Login</button>
                    )}
                
                    {user && user.photoURL ? (
                        <img 
                            src={user.photoURL} 
                            alt="User Icon" 
                            style={{
                                width: '40px', 
                                height: '40px', 
                                borderRadius: '50%', 
                                objectFit: 'cover',
                                cursor: 'pointer'
                            }}
                        />
                    ) : (
                        <FaRegCircleUser size={40} style={{color: 'var(--text-primary)'}} />
                    )}
                </div>
            </div>
            
            <div className="main-container">
                {!showResult ? (
                    <Greeting cardData={cardData} onCardClick={handleCardClick}/>
                ) : (
                    <div className='result'>
                        {messages.map((msg, index) => (
                            <div key={index} className="message-block">
                                {msg.role === "user" ? (
                                    <div className="result-title">
                                        {user?.photoURL ? (
                                            <img src={user.photoURL} alt="" style={{width:'30px', borderRadius:'50%', marginRight:'10px', marginTop: '40px'}}/>
                                        ) : (
                                            <FaRegCircleUser size={30} style={{marginRight:'10px', color: 'var(--text-primary)'}}/>
                                        )}
                                        <p>{msg.text}</p>
                                    </div>
                                ) : (
                                    <div className="result-data">
                                        <FaGem className="gem" size={30} />
                                        <Answer text={msg.text}/>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="result-data">
                                <FaGem className="gem" size={30} />
                                <div style={{width:'100%'}}><LoadingSkeleton/></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyDown={handleKeyDown} 
                            type="text" 
                            placeholder='Ask Gideon'
                        />
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