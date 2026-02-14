import { socialLinks } from "./links";
import { testimonials } from "./testimonials";

export const siteConfig = {
    logoText: "TANJIB AHMED.",
    logoImage: "/assets/logo.png", // Add your logo image at client/assets/logo.png
    heroTitle: "Creating Impactful Visual Solutions.",
    heroSubtitle: "Dynamic and innovative Graphic Designer with over four years of experience in creating impactful visual solutions across digital and print platforms.",
    resumeUrl: "https://drive.google.com/file/d/1oxK6vYlwm2wFUK81BwHBEyOkn05bRGAm/view?usp=sharing", // Add your resume link here
    inquiryEmail: "tanjib.tanjib204@gmail.com",
    socialLinks,
    testimonials,
    faqs: [
        {
            question: "How long does a project usually take?",
            answer: "For most smaller projects, you can expect completion within 24–48 hours. Larger or more complex custom designs may take anywhere from a few days to a few weeks, depending on the specific requirements and scope."
        },
        {
            question: "Can I request a custom design?",
            answer: "Absolutely! Simply share your ideas, references, or vision, and I will create a bespoke design tailored specifically to your needs."
        },
        {
            question: "Do you offer revisions?",
            answer: "Yes, I provide revisions to ensure the final result meets your expectations. Minor adjustments are typically included, while significant redesigns or major changes may incur an additional fee based on the scope of work."
        },
        {
            question: "How do payments and refunds work?",
            answer: "A 50% advance deposit is required to begin the project, with the remaining 50% due upon completion. Once full payment is received, final files are delivered via Google Drive or email. If you are unsatisfied with the completed work, a 25% refund of the initial deposit is available as compensation for the time invested. I accept Direct Bank Transfer and PayPal."
        }
    ]
};

