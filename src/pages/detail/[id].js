import Card from 'components/styled/Card'
import Container from 'components/styled/Container'
import Image from 'components/styled/Image'
import Grid from 'components/styled/Grid'

export async function getStaticPaths() {
  const response = await fetch('https://restaurant-api.dicoding.dev/list')
  const { restaurants } = await response.json()
  const ids = restaurants.map((restaurant) => restaurant.id)

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${params.id}`)
  const { restaurant } = await response.json()

  return {
    props: {
      restaurant
    }
  }
}

export default function Detail({ restaurant }) {
  const { name, description, pictureId, menus: { foods, drinks } } = restaurant

  return (
    <Container>
      <Image
        height='300px' 
        src={`https://restaurant-api.dicoding.dev/images/large/${pictureId}`} 
        alt={name} />

      <header>
        <h1>{name}</h1>
        <p>{description}</p>
      </header>

      <br />

      <main>
        <h2>Informasi Menu</h2>

        <Grid>
          <Card>
            <Container>
              <h3>Makanan</h3>
              <ul>
                {foods.map((food) => (
                  <li key={food.name}>{food.name}</li>
                ))}
              </ul>
            </Container>
          </Card>

          <Card>
            <Container>
              <h3>Minuman</h3>
              <ul>
                {drinks.map((drink) => (
                  <li key={drink.name}>{drink.name}</li>
                ))}
              </ul>
            </Container>
          </Card>
        </Grid>
      </main>
    </Container>
  )
}