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
        setRecentPrompt(promptToSend);

        const userMessage = {role: 'user', text: promptToSend};
        setMessages(prev => [...prev, userMessage])

        try {
             const apiResponse = await axios({
                 url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                method: "post",
                data: {
                "contents": [{"parts": [{"text": promptToSend}]}]
                }
            });
            const responseText = apiResponse["data"]["candidates"][0]["content"]["parts"][0]["text"];
            const modelMessage = {role: 'model', text: responseText};
            
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
            setInput("");
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
                setResultData(data.response);
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