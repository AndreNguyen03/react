import type { Action, Question } from "../App";

export default function Options({ question, answerIndex, dispatch }: { question: Question, answerIndex: number | null, dispatch: React.Dispatch<Action> }) {

    const hasAnswered = answerIndex !== null;

    return (
        <div className="options">
            {question.options.map((option: string, index: number) =>
                <button className={`btn btn-option 
                                    ${index === answerIndex ? 'answer' : ' '} 
                                    ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ' '}
                                `}
                    key={option}
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                    >
                    {option}
                </button>
            )}
        </div>
    )
}
