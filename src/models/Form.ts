import * as yup from 'yup'

export const authFormSchema = yup.object().shape({
    email: yup.string().email("Please provide a valid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").max(12, "Password must have only 12 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required")
})

export interface AuthForm {
    email: string;
    password: string;
    confirmPassword: string;
}