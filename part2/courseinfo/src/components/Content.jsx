import Part from "./Part"
import Total from "./Total"

const Content = ({ parts }) => {
	return(
	   <div>
         <Part part={parts[0]} />
         <Part part={parts[1]} />
         <Part part={parts[2]} />
         <Total parts={parts}/>
		</div>
)}

export default Content 