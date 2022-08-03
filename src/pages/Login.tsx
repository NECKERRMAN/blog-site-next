import { useSession, signOut, signIn} from "next-auth/react"

const Login = () => {
    const { data: session } = useSession()

    if(session) {
        return (
            <div>
                <p>Welcome, {session.user.name }</p>
                <button onClick={()=> signOut() }>Sign out</button>
            </div>
        )
    } else {
        return (
            <div>
                <p>Not logged in</p>
                <button onClick={()=> signIn() }>Sign in</button>
            </div>
        ) 
    }
}

export default Login