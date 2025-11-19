import "./Style.css"
const Cards = ({text, icon}) => {
  return (
    <div className="card">
        <p>{text}</p>
        <div className="card-icon">{icon}</div>
    </div>
  )
}




export default Cards