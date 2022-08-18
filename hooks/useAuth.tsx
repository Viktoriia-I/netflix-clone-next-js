import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth } from "../firebase";

interface AuthProviderProps {
  children: React.ReactNode
}
interface AuthInterface {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<AuthInterface>({
  user: null,
  signUp: async () => { },
  signIn: async () => { },
  logout: async () => { },
  error: null,
  loading: false
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null)
  const router = useRouter();

  useEffect(() => onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      setLoading(false)
    } else {
      setUser(null)
      setLoading(true)
      router.push('/login')
    }
    setInitialLoading(false)
  }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      router.push('/');
      setLoading(false);
    })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      router.push('/');
      setLoading(false);
    })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true);
    signOut(auth).then(() => {
      setUser(null)
    })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const memoizedValue = useMemo(() => ({ user, signUp, signIn, logout, loading, error }), [user, loading])

  return <AuthContext.Provider value={memoizedValue}>
    {!initialLoading && children}
  </AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}