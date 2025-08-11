import type { Action, Question } from "./App";
import Options from "./components/Options";

export default function Question({ question, dispatch, answerIndex }: { question: Question, dispatch: React.Dispatch<Action>, answerIndex: number | null }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answerIndex={answerIndex} />
        </div>
    )
}
