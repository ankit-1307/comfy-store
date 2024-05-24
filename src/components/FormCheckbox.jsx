const FormCheckbox = ({ name, size, label, defaultValue }) => {
	return (
		<div className="form-control items-center ">
			<label htmlFor={name} className="label cursor-pointer">
				<span className="label-text capitalize mr-4">{label}</span>
				<br />
				<input
					type="checkbox"
					defaultChecked ={defaultValue}
					className={`checkbox checkbox-primary ${size}`}
					id={name}
					name={name}
				/>
			</label>
		</div>
	)
}
export default FormCheckbox
