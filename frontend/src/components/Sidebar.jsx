import "./Style.css"
import RecentChats from "./RecentChats"
import ThemeToggle from "./ThemeToggle"
import { useState } from "react"
import NewChat from "./NewChat"
import { FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaGear } from "react-icons/fa6";

const Sidebar = () => {
    const [extended, setExtended] = useState(false)

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
