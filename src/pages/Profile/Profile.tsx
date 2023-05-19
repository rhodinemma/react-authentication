import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail, signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { logout } from "../../features/authSlice"
import ResetPassword from "../../components/ResetPassword/ResetPassword"

const Profile = () => {
    const [resetPassword, setResetPassword] = useState(false)
    const [resetPasswordEmail, setResetPasswordEmail] = useState("");
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState<string | null>(null);
    const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);


    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut(auth)
        navigate("/auth")
        dispatch(logout())
    }

    const handlePasswordReset = async () => {
        if (!resetPasswordEmail.length) return;

        try {
            await sendPasswordResetEmail(auth, resetPasswordEmail)
            setResetPasswordSuccess("Check your email for further instructions")
            setResetPasswordError(null)
        } catch (error: any) {
            setResetPasswordError(error.message)
            setResetPasswordSuccess(null)
        }
    }

    useEffect(() => {
        if (Boolean(!user)) {
            navigate("/auth")
        }
    }, [navigate, user])

    return (
        <>
            <Header />
            <ResetPassword handlePasswordReset={handlePasswordReset} isOpen={resetPassword} onClose={() => setResetPassword(false)} resetPasswordEmail={resetPasswordEmail} resetPasswordSuccess={resetPasswordSuccess} resetPasswordError={resetPasswordError} setResetPasswordEmail={setResetPasswordEmail} />
            {user && <ProfileCard user={user} handleLogout={handleLogout} setResetPassword={() => setResetPassword(true)} />}
        </>
    )
}

export default Profile