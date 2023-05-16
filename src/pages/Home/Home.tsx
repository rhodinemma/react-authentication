import Header from "../../components/Header/Header"
import { homeClasses } from "./homeClasses"

const Home = () => {
    const { container, cardContainer, title, description } = homeClasses

    return (
        <>
            <Header />
            <div className={container}>
                <div className={cardContainer}>
                    <h5 className={title}>Firebase Authentication</h5>
                    <p className={description}>Master complete authentication with firebase</p>
                </div>
            </div>
        </>
    )
}

export default Home