import { Link } from "react-router-dom";
import "./Resume.css";

const resumeUrl = "/resume/Mahmad_Shahabaz_Resume.pdf";

const Resume = () => {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <Link to="/" className="back-button" data-cursor="disable">
          Back to Home
        </Link>
        <h1>
          My <span>Resume</span>
        </h1>
      </div>

      <div className="resume-container" data-cursor="disable">
        <p>Open or download the resume directly.</p>
        <div className="resume-actions">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Open Resume
          </a>
          <a href={resumeUrl} download>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resume;
