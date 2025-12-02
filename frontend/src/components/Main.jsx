
import { assets } from '../assets/assets'
import "./Style.css"
import Cards from './Cards'
import { FaRegMessage, FaRegCompass, FaRegLightbulb, FaCode, FaMicrophone } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { GoFileMedia } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

const Main = () => {
    const cardData = [
    {text: "Suggest beautiful places to see on a trip", icon: <FaRegCompass  />},
    {text: "Help in brainstorming business ideas", icon: <FaRegMessage />},
    {text: "Summarize this topic for a Group discussion", icon: <FaRegLightbulb />},
    {text: "Increase the readability of given code", icon: <FaCode/> }

]
  return (
    <div className='main'>
        <div className="nav">
            <span>Gideon <span className='version'>1.0</span></span>
            <img src={assets.user_icon} alt="" />
        </div>
        
        <div className="main-container">
            <div className="greet">
                <p><span>Hello, Barry !</span></p>
                <p>How can i help you today ?</p>
        </div>
           
        <div className="cards">
            {cardData?.map((item, index) => (
              <Cards key={index} text={item?.text} icon={item.icon} />
            ))}
        </div>

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Ask Gideon'/>
                    <div>
                    <GoFileMedia className='prompt-icon'/>
                    <FaMicrophone className='prompt-icon'/>
                    <IoMdSend className='prompt-icon'/>
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