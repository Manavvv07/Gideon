import "./Style.css"
import RecentChats from "./RecentChats"
import ThemeToggle from "./ThemeToggle"
import { useState, useEffect, useContext } from "react"
import NewChat from "./NewChat"
import { FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaGear } from "react-icons/fa6";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Context } from "../context/Context"

const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const [recentChats, setRecentChats] = useState([]);
    const [user, setUser] = useState(null);
    const [currentTheme, setCurrentTheme] = useState("light");
    const {loadChat, newChat} = useContext(Context)
   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    
    useEffect(() => {
        if (user) {
            const q = query(
                collection(db, "users", user.uid, "chats"),
                orderBy("timestamp", "desc")
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const chats = snapshot.docs.map(doc => ({
                    id: doc.id,
                    text: doc.data().prompt
                }));
                setRecentChats(chats);
            });

            return () => unsubscribe();
        } else {
            setRecentChats([]);
        }
    }, [user]);

    const handleNewChat = () => {
        newChat();
    }

    const handleCompactNew = () => {
        handleNewChat();
    }


  return (
    <div className={`sidebar ${extended ? 'expanded' : 'collapsed'}`}>
        <div className="top">
            <TiThMenu onClick={() => setExtended(prev => !prev)} className="menu" />

            {extended ?<NewChat onClick={handleNewChat} />: (
            <NewChat compact onClick={handleCompactNew}/>
            )}
            <div className="recent">
                {extended ? <p className="recent-title">Recent</p> : null}
                {extended ? extended &&
                recentChats.map(item => (
                <RecentChats 
                    key={item.id} 
                    text={item.text} 
                    onClick={() => loadChat(item.id)} 
                />
                ))  : null}
            </div>
        </div>
        <div className="bottom">
            <div className="theme-name">
                <ThemeToggle className="icon" onThemeChange={setCurrentTheme} />
                {extended ? <p className="theme-name">{currentTheme === "dark" ? "Dark Mode" : "Light Mode"}</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <FaQuestionCircle className="icon"/>
                {extended ? <p>Help</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <FaInfoCircle className="icon"/>
                {extended ? <p>About</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <FaGear className="icon"/>
                {extended ? <p>Settings</p> : null}     
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar