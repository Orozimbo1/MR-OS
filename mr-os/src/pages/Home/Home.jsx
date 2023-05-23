import './Home.css'

// Components
import { Orders } from '../../components'

// Redux
import { getUserData } from '../../slices/userDataSlice'
import { useEffect } from 'react'

// Hooks
import { useSelector, useDispatch } from 'react-redux'

const arrayInfo = [
  {status: 'pending', title: 'Em andamento'},
  {status: 'finished', title: 'Concluídas'},
  {status: 'rejected', title: 'Rejeitadas'}
]

const Home = () => {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData(user.uid))
  }, [])

  return (
    <section>
      {arrayInfo.map((item, i) => (
        <Orders key={i} status={item.status} title={item.title} />
      ))}
    </section>
  )
}

export default Home