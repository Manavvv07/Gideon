import "./Style.css"
import { FaRegMessage } from "react-icons/fa6";
const RecentChats = ({text}) => {
  return (
    <div className="recent-entry">
        <FaRegMessage className="recent-icon"/>
        <p>{text}</p>
    </div>
  )
}

export default RecentChats



