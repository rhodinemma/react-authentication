import { Link } from "react-router-dom"
import { headerClasses } from "./headerClasses"

const Header = () => {
    const { header, navContainer, navContent, linkHome, linkProfile, linkSignIn } = headerClasses
    return (
        <>
            <header className={header}>
                <nav className={navContainer}>
                    <div className={navContent}>
                        <div className="flex items-center w-full">
                            <Link to="/" className={linkHome}>Home</Link>
                            <Link to="/auth" className={linkSignIn}>Sign in</Link>
                            <Link to="/profile"><img className={linkProfile} src="" alt="Avatar" /></Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header