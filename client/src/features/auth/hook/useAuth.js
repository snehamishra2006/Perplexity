

// hook layer
import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
import { setChats, setCurrentChatId } from "../../chat/chat.slice";

export function useAuth() {

    const dispatch = useDispatch()

    // async function handleRegister({ email, username, password }) {
    //     try {
    //         dispatch(setLoading(true))
    //         dispatch(setError(null))
    //         const data = await register({ email, username, password })
    //         return { success: true, message: data.message }
    //     } catch (error) {
    //         dispatch(setError(error.response?.data?.message || "Registration failed"))
    //         return { success: false }
    //     } finally {
    //         dispatch(setLoading(false))
    //     }
    // }

    async function handleRegister({ email, username, password }) {
    try {
        dispatch(setLoading(true))
        dispatch(setError(null))
        const data = await register({ email, username, password })
        return { success: true, message: data.message }
    } catch (error) {
        const responseData = error.response?.data
        const message =
            responseData?.message ||
            responseData?.errors?.[0]?.msg ||
            "Registration failed"
        dispatch(setError(message))
        return { success: false }
    } finally {
        dispatch(setLoading(false))
    }
}

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return { success: true }
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Login failed"))
            return { success: false }
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Failed to fetch user data"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
    try {
        await logout()
    } catch (err) {
        dispatch(setError(err.response?.data?.message || "Logout failed"))
        return { success: false }
    }
    dispatch(setUser(null))
    dispatch(setChats({}))
    dispatch(setCurrentChatId(null))
    return { success: true }
}

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    }

}