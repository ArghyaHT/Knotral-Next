import React from "react";
import styles from "./Aboutus.module.css"
import { FaHandshake, FaSchool, FaUsers } from "react-icons/fa";

const cards = [
    {
        id: 1,
        icon: <FaUsers />,
        bgColor: "#798089", // light cyan
        title: "Solution Providers List & Connect",
        content: <p>Upload your education solutions to our marketplace. Get discovered by qualified resellers and schools globally. Access real-time market intelligence and pricing analytics.</p>
    },
    {
        id: 2,
        icon: <FaHandshake />,
        bgColor: "#1A2D47", // light cyan

        title: "Resellers Access & Engage",
        content: <p>Browse our curated catalog of verified education solutions. View margin opportunities, market demand, and competitive insights. Connect directly with solution providers and schools.</p>
    },
    {
        id: 3,
        icon: <FaSchool />,
        bgColor: "#FE2E00", // light cyan

        title: "Schools Discover & Procure",
        content: <p>Explore comprehensive education solutions from verified providers. Compare options, access local expertise, and streamline your procurement process.</p>
    },
];

const AboutUs = () => {
    return (
        <section className={styles.aboutus}>
            <h2 className={styles.aboutusheading}>Who is Knotral for?</h2>

            <div className={styles.cardContainer}>
                {cards.map((card) => (
                    <div key={card.id} className={styles.card}>

                        {/* Optional Icon/Image */}
                        {card.icon && (
                            <div
                                className={styles.cardIcon}
                                style={{ backgroundColor: card.bgColor, borderRadius: "20px" }}
                            >
                                {card.icon}
                            </div>
                        )}

                        {/* Header section */}
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                        </div>

                        {/* Content section */}
                        <div className={styles.cardContent}>
                            <div className={styles.cardBody}>{card.content}</div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default AboutUs;