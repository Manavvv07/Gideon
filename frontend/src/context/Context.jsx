import { createContext, useState, useEffect } from "react";
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [user, setUser] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [messages, setMessages] = useState([])

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

   
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        const promptToSend = prompt !== undefined ? prompt : input;
        setInput(""); 
        setRecentPrompt(promptToSend);

        const userMessage = {role: 'user', text: promptToSend};
        setMessages(prev => [...prev, userMessage])

        try {
            const history = messages.map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.text,
                reasoning_details: msg.reasoning_details || undefined 
            }));

            history.push({ role: 'user', content: promptToSend });

            const apiResponse = await axios({
                url: "https://openrouter.ai/api/v1/chat/completions",
                method: "post",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                data: {
                    "model": "nvidia/nemotron-nano-12b-v2-vl:free",
                    "messages": history,
                    "reasoning": { "enabled": true }
                }
            });

            const responseMessage = apiResponse.data.choices[0].message;
            const responseText = responseMessage.content;
            
            const modelMessage = {
                role: 'model', 
                text: responseText,
                reasoning_details: responseMessage.reasoning_details
            };
            
            setResultData(responseText);
            setMessages(prev => [...prev, modelMessage]);

            if(user){
                if(!chatId){
                    const newChatRef = await addDoc(collection(db, 'users', user.uid, 'chats'), {
                        title: promptToSend.slice(0, 30) + '...',
                        messages: [userMessage, modelMessage], 
                        timestamp: serverTimestamp()
                    });
                    setChatId(newChatRef.id);
                }else{
                    const chatRef = doc(db, 'users', user.uid, 'chats', chatId);
                    await updateDoc(chatRef, {
                        messages: arrayUnion(userMessage, modelMessage),
                        timestamp: serverTimestamp()
                    })
                }
            }

        } catch (error) {
            console.error("Error:", error);
            setResultData("Error fetching response.");
        } finally {
            setLoading(false);
        }
    }

    const loadChat = async (chatId) => {
        if(!user) return;
        
        setLoading(true);
        setShowResult(true); 
        
        try {
            const chatRef = doc(db, "users", user.uid, "chats", chatId);
            const chatSnap = await getDoc(chatRef);

            if (chatSnap.exists()) {
                const data = chatSnap.data();
                setRecentPrompt(data.prompt); 
                setMessages(data.messages || []);
            } else {
                console.log("No such chat!");
            }
        } catch (error) {
            console.error("Error loading chat:", error);
        } finally {
            setLoading(false);
        }
    }
   
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setChatId(null);
        setMessages([]);
    }

    const contextValue = {
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        loadChat,
        user,
        messages
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;