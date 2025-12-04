import "./Style.css"
import { FaRegMessage } from "react-icons/fa6";

const RecentChats = ({text, onClick}) => {
  return (
    <div className="recent-entry" onClick={onClick}>
        <FaRegMessage className="recent-icon"/>
        <p>{text}</p>
    </div>
  )
}

export default RecentChats