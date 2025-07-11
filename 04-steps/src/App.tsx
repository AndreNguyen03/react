import { useState } from "react";

const messages: string[] = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

const App = () => {
    return (
        <div className="app">
            <Steps />
            {/* <Steps /> */}
        </div>
    );
}

export default App;

const Steps = () => {

    const [step, setStep] = useState<number>(1)

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handlePrevious = () => {
        setStep((prevStep) => prevStep > 1 ? prevStep - 1 : prevStep);
    }

    const handleNext = () => {
        setStep((prevStep) => prevStep < messages.length ? prevStep + 1 : prevStep);
    }

    return (
        <div>
            <button className="close" onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
                &times;
            </button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step >= 3 ? "active" : ""}>3</div>
                    </div>

                    <StepMessage step={step}>
                        {messages[step - 1]}
                    </StepMessage>

                    <div className="buttons">
                        <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
                            Previous
                        </Button>
                        <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

interface ButtonProps {
    textColor: string,
    bgColor: string,
    onClick: () => void
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ textColor, bgColor, onClick, children }) => {
    return (
        <button style={{ backgroundColor: bgColor, color: textColor }} onClick={onClick}>
            {children}
        </button>
    )
}

interface StepMessageProps {
    step: number,
    children: React.ReactNode
}

const StepMessage: React.FC<StepMessageProps> = ({ step, children }) => {
    return (
        <p className="message">
            <h3>Step {step}</h3>
            {children}
        </p>
    )
}