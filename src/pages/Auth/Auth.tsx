import { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { authClasses } from "./authClasses"
import { AuthForm, authFormSchema } from "../../models/Form"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "../../firebase";
import { useAppDispatch } from "../../hooks/storeHook";
import { login } from "../../features/authSlice";

const Auth = () => {
    const [authType, setAuthType] = useState<"login" | "sign-up">("login")
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>("")

    const dispatch = useAppDispatch();

    const { container, form, button, input, text, link, hr, forgotPasswordButton } = authClasses

    const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>({
        resolver: yupResolver(authFormSchema)
    })

    const handleFormSubmit = async (data: AuthForm) => {
        const { email, password } = data
        if (authType === "sign-up") {
            try {
                setLoading(true)
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                console.log(user)

                await setDoc(doc(db, "users", user.uid), {
                    email
                })

                setLoading(false)

                if (user && user.email) dispatch(login({ email: user.email, id: user.uid, photoUrl: user.photoURL }))
            } catch (error: any) {
                setLoading(false)
                const errorCode = error.code;
                setErrorMessage(errorCode);
            }
        } else { }
    }

    const handleAuthType = () => {
        setAuthType((prevAuthType) => prevAuthType === "login" ? "sign-up" : "login")
    }

    return (
        <>
            <div className={container}>
                <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
                    {errorMessage && (
                        <p className="bg-red-400 px-3 py-2 text-center rounded-md text-white">
                            {errorMessage}
                        </p>
                    )}
                    <form className={form} onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="grid gap-y-3">
                            <button className={button} type="button">Google</button>
                        </div>

                        <div className="my-3 flex items-center px-3">
                            <hr className={hr} />
                            <span className={text}>or</span>
                            <hr className={hr} />
                        </div>

                        <div className="grid gap-y-3">
                            <div>
                                <input className={input} type="email" placeholder="Email" {...register("email")} />
                                {errors.email ? <span className="text-red-700">{errors.email.message}</span> : <></>}
                            </div>
                            <div>
                                <input className={input} type="password" placeholder="Password" {...register("password")} />
                                {errors.password ? <span className="text-red-700">{errors.password.message}</span> : <></>}
                            </div>
                            <div>
                                <input className={input} type="password" placeholder="Confirm password" {...register("confirmPassword")} />
                                {errors.confirmPassword ? <span className="text-red-700">{errors.confirmPassword.message}</span> : <></>}
                            </div>

                            <button disabled={loading} className={button}>Sign {authType === "login" ? "in" : "up"} with email</button>
                        </div>

                        <div className="text-sm font-light py-4">
                            {authType === "login" ? (
                                <span>
                                    Don&apos;t have an account yet?{' '}
                                    <span onClick={handleAuthType} className={link}>Sign up</span>
                                </span>
                            ) : (
                                <span>
                                    Already have an account?{" "}
                                    <span
                                        onClick={handleAuthType}
                                        className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign in
                                    </span>
                                </span>
                            )}
                        </div>

                        <div className="my-3 flex items-center px-3">
                            <hr className={hr} />
                            <button type="button" className={forgotPasswordButton}>forgot password</button>
                            <hr className={hr} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Auth