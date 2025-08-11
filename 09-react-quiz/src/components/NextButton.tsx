import type { Action } from "../App";

export default function NextButton({ dispatch, answerIndex, index, numQuestions }: { dispatch: React.Dispatch<Action>, answerIndex: number | null, index: number, numQuestions: number }) {

    if (answerIndex === null) {
        return null; // Don't show the button if no answer has been selected
    }

    if (index < numQuestions - 1)
        return (
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
                Next
            </button>
        )

    if (index  === numQuestions - 1)
        return (
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
                Finish
            </button>
        )
}
