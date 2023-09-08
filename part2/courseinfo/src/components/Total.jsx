const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentPart) => {
    return accumulator + currentPart.exercises
  }, 0)

	return(
		<b>
			total of {total} exercises
		</b>
)}

export default Total 