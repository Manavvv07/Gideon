import Cards from './Cards'

const Greeting = ({cardData}) => {
  return (
    <div>
        <div className="greet">
                    <p><span>Hello, Barry !</span></p>
                    <p>How can i help you today ?</p>
            </div>
               
            <div className="cards">
                {cardData?.map((item, index) => (
                  <Cards key={index} text={item?.text} icon={item.icon} />
                ))}
            </div>
    </div>
  )
}

export default Greeting