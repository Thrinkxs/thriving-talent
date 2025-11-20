interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => (
        <div key={label} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white ${
              index <= currentStep ? "bg-thrive-blue" : "bg-gray-500"
            }`}
          >
            {index + 1}
          </div>
          <p className="text-xs mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
};
