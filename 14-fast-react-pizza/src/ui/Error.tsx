import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
    const error = useRouteError() as { data?: string; message?: string, status?: number, statusText?: string, internal: boolean };

    return (
        <div>
            <h1>Something went wrong 😢</h1>
            <p>{error.message}</p>
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
    );
}

export { Error };
