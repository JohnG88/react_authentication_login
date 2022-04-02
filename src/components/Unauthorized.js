import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    
    // line below has navigate(-1), which will go back to wherever you came from and is set to go back button
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized