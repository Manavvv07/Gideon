import "./Style.css"
import RecentChats from "./RecentChats"
import ThemeToggle from "./ThemeToggle"
import { useState } from "react"
import NewChat from "./NewChat"
import { FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaGear } from "react-icons/fa6";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app"

const Sidebar = () => {
    const [extended, setExtended] = useState(false)

    const firebaseConfig = {
    apiKey: "AIzaSyCnDWcFeSFSKn5BsrVwdIEqPjxihO5tY7w",
    authDomain: "gideon-db8ab.firebaseapp.com",
    projectId: "gideon-db8ab",
    storageBucket: "gideon-db8ab.firebasestorage.app",
    messagingSenderId: "114667605820",
    appId: "1:114667605820:web:772f48d0ae1025c9615839",
    measurementId: "G-XDFW4N7TSZ"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const [recentChats, setRecentChats] = useState([
        {id: 1, text: "what is react..."},
        {id: 2, text: "how to make omelette"},
        {id: 3, text: "Install node"}
    ])
    
    const [currentChatTitle, setCurrentChatTitle] = useState("New Chat")

    const handleNewChat = () => {
        if(currentChatTitle.trim() != ""){
            setRecentChats(prev => [...prev], {id: Date.now(), text: currentChatTitle})
        }
        setCurrentChatTitle("New Chat")
        console.log("New Chat Handled")
    }

    const handleCompactNew = () => {
        handleNewChat();
    }

    const [currentTheme, setCurrentTheme] = useState("light");

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
                <RecentChats key={item.id} text={item.text} />
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
