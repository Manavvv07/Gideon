import "./Style.css"
import { FaEdit } from "react-icons/fa";


const NewChat = ({ onClick = () => {}, compact = false }) => {

  if(compact){
    return(
      <button className="new-chat-compact"
      onClick={onClick}
      aria-label="New Chat"
      title="New Chat">
        <FaEdit style={{color:"black", fontSize:"25px"}}/>
      </button>
    )
  }

  return (
    <div>
        <button className="new-chat" onClick={onClick}>
            <FaEdit style={{color:"black", fontSize:"25px"}}/>New Chat
        </button>
    </div>
  )
}

export default NewChat