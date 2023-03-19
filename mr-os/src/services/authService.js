import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { app } from '../firebase/config'

const auth = getAuth(app)

// Register an user
const register = async (data) => {

  try {
    
    const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
    ) 

    await updateProfile(user, {
      displayName: data.displayName
    })

    if(user) {
      localStorage.setItem('user', JSON.stringify(user))
    }

    return user

  } catch (error) {
    console.log(error)
  }
}

// Sign in an user

// Logout an user

const authService = {
  register,
}

export default authService