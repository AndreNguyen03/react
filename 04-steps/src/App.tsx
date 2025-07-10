import { useState } from "react";

const messages: string[] = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  return (
    <div className="app">
      <h1>Steps Component</h1>
      <Steps />
      <Steps />
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

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={handlePrevious}>
              Previous
            </button>
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
