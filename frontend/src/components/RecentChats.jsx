import "./Style.css"
import { FaRegMessage } from "react-icons/fa6";
const RecentChats = ({text}) => {
  return (
    <div className="recent-entry">
        <FaRegMessage/>
        <p>{text}</p>
    </div>
  )
}

export default RecentChats



