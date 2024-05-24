import { Outlet, useNavigation } from 'react-router-dom'
import { Header, Navbar } from '../components'
import { Loading } from '../components'

const HomeLayout = () => {
	const navigation = useNavigation()
	const isPageLoading = navigation.state === 'loading'
	if (isPageLoading) {
		return <Loading />
	}
	return (
		<>
			<Header />
			<Navbar />

			<section className="align-components py-20">
				<Outlet />
			</section>
		</>
	)
}

export default HomeLayout
