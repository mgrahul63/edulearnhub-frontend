import { useLocation } from "react-router-dom";

const Instructor = () => {
  const state = useLocation();
  const { instructorId } = state?.state || "";
  return (
    <div>
      Instructor
      <p>Instructor ID: {instructorId}</p>
    </div>
  );
};

export default Instructor;
