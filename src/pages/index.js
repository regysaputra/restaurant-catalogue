import Image from 'next/image'
import { Inter } from 'next/font/google'
import RestaurantList from 'components/RestaurantList'
import Container from 'components/styled/Container'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const response = await fetch('https://restaurant-api.dicoding.dev/list')
  const { restaurants } = await response.json()

  return {
    props: { restaurants }
  }
}

export default function Home({ restaurants }) {
  return (
    <Container>
      <RestaurantList restaurants={restaurants} />
    </Container>
  )
}
