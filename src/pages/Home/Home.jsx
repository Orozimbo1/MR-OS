import './Home.css'

// Components
import { Orders } from '../../components'

const arrayInfo = [
  {status: 'pending', title: 'Em andamento'},
  {status: 'finished', title: 'Concluídas'},
  {status: 'rejected', title: 'Rejeitadas'}
]

const Home = () => {

  return (
    <section>
      {arrayInfo.map((item, i) => (
        <Orders key={i} status={item.status} title={item.title} />
      ))}
    </section>
  )
}

export default Home