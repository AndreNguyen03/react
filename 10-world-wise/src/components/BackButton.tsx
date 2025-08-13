import { useNavigate } from "react-router-dom"
import { Button } from "./"

function BackButton() {
    const navigate = useNavigate()

    return (
        <Button type="back" buttonType="button" onClick={() => {
            navigate(-1)
        }}>
            &larr; Back
        </Button>
    )
}

export { BackButton }