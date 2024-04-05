interface StepsProps {
  stage: number;
}

const Steps = ({ stage }: StepsProps) => {
  return (
    <div>
      <ul
        className={`steps steps-vertical ${
          stage >= 1 ? "lg:steps-vertical" : ""
        }`}
      >
        <li className={`step ${stage >= 1 ? "step-primary" : ""}`}>Register</li>
        <li className={`step ${stage >= 2 ? "step-primary" : ""}`}>
          Create Profile
        </li>
      </ul>
    </div>
  );
};

export default Steps;
