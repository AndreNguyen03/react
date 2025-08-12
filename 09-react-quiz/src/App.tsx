import { useEffect, useReducer } from "react"
import { ErrorComponent, Header, Loader, Main, Progress, StartScreen, Question, Footer, Timer, NextButton, FinishScreen } from "./components";


export type Question = {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
}
export type State = {
    questions: Question[];
    status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
    index: number;
    answer: number | null;
    points: number;
    highscore: number;
    secondsRemaining: number | null;
}

export type Action =
    | { type: 'dataReceived'; payload: Question[] }
    | { type: 'dataFailed'; payload: Error }
    | { type: 'start' }
    | { type: 'newAnswer'; payload: number }
    | { type: 'nextQuestion' }
    | { type: 'finish' }
    | { type: 'restart' }
    | { type: 'tick' };

const initialState: State = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
}

const SECS_PER_QUESTION = 30;

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'dataReceived':
            return { ...state, questions: action.payload, status: 'ready' };
        case 'dataFailed':
            return { ...state, status: 'error' };
        case 'start':
            return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION };
        case 'newAnswer': {
            const question = state.questions[state.index];

            return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points };
        }
        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null }
        case 'finish':
            return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore };
        case 'restart':
            console.log('State trước khi restart:', state);
            return { ...initialState, status: 'ready', questions: state.questions };
        case 'tick':
            return { ...state, secondsRemaining: state.secondsRemaining! - 1, status: state.secondsRemaining === 0 ? 'finished' : state.status };
        default:
            throw new Error('Unknown action type');
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { questions, status, index, answer, points, highscore, secondsRemaining } = state;
    const numQuestions = questions.length;
    const maxPoints = questions.reduce((total, question) => total + question.points, 0);

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: 'dataReceived', payload: data })
            })
            .catch((error: Error) => {
                dispatch({ type: 'dataFailed', payload: error })
            })
    }, [])

    return (
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <ErrorComponent />}
                {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === 'active' &&
                    (
                        <>
                            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answerIndex={answer} />
                            <Question question={questions[index]} dispatch={dispatch} answerIndex={answer} />
                            <Footer>
                                <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                                <NextButton dispatch={dispatch} answerIndex={answer} index={index} numQuestions={numQuestions} />
                            </Footer>
                        </>
                    )
                }
                {status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />}
            </Main>
        </div>
    )
}

export default App