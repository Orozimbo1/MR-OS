import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { app } from '../firebase/config'

const auth = getAuth(app)

// Register an user
const register = async (data) => {
  let res = {}

  try {
    res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
    )
  } catch (err) {
    res = {error: err}
    return res
  }
  const { user } = res

  await updateProfile(user, {
    displayName: data.displayName
  })

  if(user) {
      localStorage.setItem('user', JSON.stringify(user))
  }

  return user
}

// Sign in an user
const login = async (data) => {
  let res = {}

  try {
    res = await signInWithEmailAndPassword(
      auth, 
      data.email,
      data.password
    )
  } catch (err) {
    res = {error: err}
    return res
  }

  const { user } = res

  if(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  return user
}

// Logout an user
const logout = () => {
  localStorage.removeItem('user')
  signOut(auth)
}

const authService = {
  register,
  login,
  logout
}

export default authService