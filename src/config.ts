import ATMImage from "./assets/ATM.png";
import LoopLearnImage from "./assets/LoopLearn.png";
import PIMSImage from "./assets/PIMS.png";

export const config = {
    developer: {
        name: "Shahabaz",
        fullName: "Mahmad Shahabaz",
        title: "Software Engineer",
        description:
            "Computer Science undergraduate passionate about software engineering, full-stack development, backend systems, and building secure real-world applications."
    },

    social: {
        github: "MahmadShahabaz",
        email: "mahmadshahabaz@gmail.com",
        location: "Bengaluru, Karnataka, India",
        instagram: "shahabaz.in",
        x: "mahmadshahabaz",
        facebook: "mahmadshahabaz"
    },

    about: {
        title: "About Me",
        description:
            "I am a Computer Science Engineering student at BMS College of Engineering, Bengaluru. I enjoy building scalable software solutions, full-stack web applications, backend systems, and secure platforms that solve real-world problems. My interests include software engineering, web development, system design, databases, and modern application development."
    },

    experiences: [
        {
            position: "Software Engineering Intern",
            company: "Government Polytechnic Tumkur",
            period: "Jan 2024 - May 2025",
            location: "Tumkur, Karnataka, India",
            description:
                "Worked on AI-integrated security systems, full-stack web applications, and enterprise software solutions.",
            responsibilities: [
                "Designed and developed three complete software projects",
                "Collaborated with faculty and student teams using Agile methodology",
                "Created technical documentation and system architecture diagrams",
                "Delivered end-to-end software solutions from design to deployment"
            ],
            technologies: [
                "Python",
                "Flask",
                "React.js",
                "Node.js",
                "MongoDB",
                "MySQL"
            ]
        },
        {
            position: "Community Outreach Volunteer",
            company: "InCap Group",
            period: "Jun 2024 - May 2025",
            location: "Tumkur, Karnataka, India",
            description:
                "Led community engagement activities and volunteer initiatives.",
            responsibilities: [
                "Organized events for 50+ participants",
                "Designed promotional and marketing materials",
                "Mentored new volunteers",
                "Managed stakeholder communications"
            ],
            technologies: [
                "Leadership",
                "Communication",
                "Project Management",
                "Team Collaboration"
            ]
        }
    ],

    projects: [
        {
            id: 1,
            title: "Secure Multi-Bank ATM System",
            category: "Software Engineering",
            technologies:
                "Python, Flask, MySQL, YOLOv5, OpenCV, Face Recognition, Telegram API",
            image: ATMImage,
            description:
                "A secure multi-bank ATM platform using RFID cards, face recognition, OTP verification, threat detection, Telegram alerts, and reverse-PIN emergency security features."
        },
        {
            id: 2,
            title: "LoopLearn - AI Powered Online Learning Platform",
            category: "Full Stack Development",
            technologies:
                "React.js, Node.js, Express.js, MongoDB, JWT, REST APIs",
            image: LoopLearnImage,
            description:
                "A modern e-learning platform supporting course management, lecture streaming, authentication, role-based access control, student enrollment, and intelligent learning assistance."
        },
        {
            id: 3,
            title: "PIMS - Product Inventory & Expiry Management System",
            category: "Mobile Application",
            technologies:
                "Kotlin, Spring Boot, MySQL, ZXing, Google ML Kit, JWT",
            image: PIMSImage,
            description:
                "Android-based inventory management system featuring barcode scanning, OCR product recognition, billing, supplier management, expiry tracking, and inventory monitoring."
        }
    ],

    contact: {
        email: "mahmadshahabaz@gmail.com",
        github: "https://github.com/MahmadShahabaz",
        linkedin: "https://linkedin.com/in/mahmad-shahabaz",
        instagram: "https://www.instagram.com/shahabaz.in/",
        twitter: "https://x.com/mahmadshahabaz",
        facebook: "https://www.facebook.com/share/1J1dm7ZFhR/"
    },

    skills: {
        develop: {
            title: "SOFTWARE ENGINEER",
            description:
                "Designing and building scalable software solutions",
            details:
                "Experienced in full-stack development, backend engineering, API development, authentication systems, database design, and software architecture.",
            tools: [
                "Java",
                "Python",
                "JavaScript",
                "React.js",
                "Node.js",
                "Express.js",
                "Flask",
                "Spring Boot",
                "MongoDB",
                "MySQL"
            ]
        },

        design: {
            title: "FULL-STACK DEVELOPMENT",
            description:
                "Creating modern web applications and backend services",
            details:
                "Building responsive user interfaces, RESTful APIs, authentication systems, database-driven applications, and cloud-ready software solutions.",
            tools: [
                "React.js",
                "Next.js",
                "HTML5",
                "CSS3",
                "JWT Authentication",
                "REST APIs",
                "Git",
                "GitHub",
                "Postman",
                "Linux"
            ]
        }
    },

    education: [
        {
            degree: "Bachelor of Engineering (B.E.)",
            field: "Computer Science & Engineering",
            institution: "BMS College of Engineering",
            period: "2025 - 2028",
            cgpa: "7.23"
        },
        {
            degree: "Diploma",
            field: "Computer Science & Engineering",
            institution: "Government Polytechnic Tumkur",
            period: "2022 - 2025"
        }
    ],

    certifications: [
        "Full Stack Development - Infosys Springboard (2024)",
        "Git Foundation Certification - Infosys TechA Program",
        "Mastering Git Certificate - Infosys",
        "JobReady Employability Skills - Wadhwani Foundation",
        "Google Student Ambassador Program - Pitch Night Participant"
    ],

    languages: [
        "English",
        "Hindi",
        "Kannada",
        "Urdu"
    ]
};

