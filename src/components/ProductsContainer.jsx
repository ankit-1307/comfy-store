import { BsFillGridFill, BsList } from 'react-icons/bs'
import ProductsList from './ProductsList'
import ProductsGrid from './ProductsGrid'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'

const ProductsContainer = () => {
	const { meta } = useLoaderData()
	
	const totalProducts = meta?.pagination?.total
	const [layout, setLayout] = useState(
		localStorage.getItem('defaultLayout') || 'grid'
	)

	const handleLayout = (value) => {
		localStorage.setItem('defaultLayout', value)
		setLayout(value)
	}

	//console.log(totalProducts)
	return (
		<div>
			<div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
                {/* HEADER LAYOUT */}
				<h4 className="font-medium text-md">
					{totalProducts} Product{totalProducts > 1 && 's'}
				</h4>
				<div className="flex gap-x-2">
					<button
						className={`text-xl btn btn-circle btn-sm ${
							layout === 'grid' &&
							'btn-primary text-primary-content'
						} `}
						onClick={() => {
							handleLayout('grid')
						}}
					>
						<BsFillGridFill />
					</button>
					<button
						className={`text-xl btn btn-circle btn-sm ${
							layout === 'list' &&
							'btn-primary text-primary-content'
						}`}
						onClick={() => {
							handleLayout('list')
						}}
					>
						<BsList />
					</button>
				</div>
			</div>
            {/* PRODUCTS */}
			{totalProducts === 0 ? (
				<h1>Sorry, no products matched your search... </h1>
			) : layout === 'grid' ? (
				<ProductsGrid />
			) : (
				<ProductsList />
			)}
			{/* {layout === 'grid' ? <ProductsGrid /> : <ProductsList />} */}
		</div>
	)
}

export default ProductsContainer
