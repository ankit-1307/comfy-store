const FormSelect = ({ label, name, list, defaultValue, size }) => {
	return (
		<div className="form-control w-full max-w-xs">
			<label htmlFor={name} className="label">
				<span className="label-text capitalize">{label}</span>
			</label>
			<select
				className={`select select-bordered ${size}`}
				name={name}
				id={name}
				defaultValue={defaultValue}
			>
				{list.map((item) => {
					return <option value={item} key={item}>{item}</option>
				})}
			</select>
		</div>
	)
}
export default FormSelect
