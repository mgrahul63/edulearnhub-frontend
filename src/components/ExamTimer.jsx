import { useRef, useState } from "react";

const ExamTimer = ({ duration, onTimeUp, submitted }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);
  const startedRef = useRef(false);

  // start timer once
  if (!startedRef.current && duration > 0 && !submitted) {
    startedRef.current = true;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // stop timer after submit
  if (submitted && timerRef.current) {
    clearInterval(timerRef.current);
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <span
      className={`font-medium ${
        timeLeft <= 60 ? "text-red-600" : "text-gray-700"
      }`}
    >
      Time Left: {formatTime(timeLeft)}
    </span>
  );
};

export default ExamTimer;
