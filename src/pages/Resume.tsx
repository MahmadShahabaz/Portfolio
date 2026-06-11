import { Link } from "react-router-dom";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          My <span>Resume</span>
        </h1>
      </div>

      <div className="resume-container" data-cursor="disable">
        <iframe
          src="/resume/Mahmad_Shahabaz_Resume.pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Mahmad Shahabaz Resume"
        />
      </div>
    </div>
  );
};

export default Resume;
