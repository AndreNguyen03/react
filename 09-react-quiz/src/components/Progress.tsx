export default function Progress({ index, numQuestions, points, maxPoints, answerIndex }: { index: number, numQuestions: number, points: number, maxPoints: number, answerIndex?: number | null }) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answerIndex !== null)}></progress>

            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>

            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}
