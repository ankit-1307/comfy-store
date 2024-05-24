import { Form, Link, useLoaderData } from 'react-router-dom'
// import FormInput from './FormInput'
// import FormSelect from './FormSelect'
import { FormRange, FormSelect, FormInput, FormCheckbox } from './index.js'
import customFetch from '../utils/customFetch.js'

const Filters = () => {
	const { meta, params } = useLoaderData()
	const { search, category, company, order, price, shipping } = params

	return (
		<Form className="bg-base-200 grid gap-x-4 items-center rounded-md px-8 py-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{/* SEARCH */}
			<FormInput
				name="search"
				type="search"
				size="input-sm"
				label="search product"
				defaultValue={search}
			/>

			<FormSelect
				label="select category"
				name="category"
				list={meta.categories}
				size="select-sm"
				defaultValue={category}
			/>
			<FormSelect
				label="select Company"
				name="company"
				list={meta.companies}
				size="select-sm"
				defaultValue={company}
			/>
			<FormSelect
				label="sort by"
				name="order"
				list={['a-z', 'z-a', 'high', 'low']}
				size="select-sm"
				defaultValue={order}
			/>
			<FormRange
				label="select price"
				name="price"
				size="range-sm"
				price={price}
			/>
			<FormCheckbox
				label="free shipping"
				name="shipping"
				size="checkbox-sm"
				defaultValue={shipping}
			/>
			{/* BUTTONS */}
			<button className="btn btn-primary btn-sm" type="submit">
				SEARCH
			</button>
			<Link to={'/products'} className="btn btn-accent btn-sm">
				RESET
			</Link>
		</Form>
	)
}

export default Filters
