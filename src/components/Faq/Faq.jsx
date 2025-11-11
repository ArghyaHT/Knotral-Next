import { FaChevronDown } from "react-icons/fa";
import styles from "./Faq.module.css"
import { useEffect, useState } from "react";

const data = [
    //General
    {
        question: 'What is Knotral and how is it different from other marketplaces?',
        answer: 'Knotral is a three-sided B2B marketplace that connects education solution providers, local resellers, and institutions. Unlike traditional platforms, Knotral focuses exclusively on the education sector and allows resellers to retain 100% of their margins.',
        category: 'General',
    },
    {
        question: 'How does Knotral make money if it doesn’t take a commission?',
        answer: 'Knotral operates on a pure subscription and listing fee model. Solution providers and resellers pay monthly fees based on their platform access and listing needs.',
        category: 'General',
    },
    {
        question: 'What kinds of products or services are available on Knotral?',
        answer: 'You’ll find a wide range of verified education solutions including EdTech tools, curriculum content, hardware, classroom resources, and institutional support services.',
        category: 'General',
    },
    {
        question: 'Who can join the Knotral platform?',
        answer: 'Knotral is open to EdTech providers, local education resellers, and institutions such as schools, training centers, and universities seeking quality educational solutions.',
        category: 'General',
    },

    //Solution Providers
    {
        question: 'How can solution providers benefit from using Knotral?',
        answer: 'Providers gain global reach without building local teams, get access to verified resellers, and leverage market insights to optimize pricing and positioning.',
        category: 'Solution Providers',
    },
    // {
    //     question: 'What are the costs involved for listing products on Knotral?',
    //     answer: 'Listing fees range from $99 to $499/month depending on the product’s visibility and feature requirements.',
    //     category: 'Solution Providers',
    // },
    {
        question: 'Do providers retain control over pricing and branding?',
        answer: 'Yes, solution providers maintain full control over their product pricing, branding, and reseller relationships through the Knotral dashboard.',
        category: 'Solution Providers',
    },
    {
        question: 'How are leads generated on the platform?',
        answer: 'Knotral automates lead qualification and routes verified opportunities to the most relevant resellers, ensuring quality connections between providers and institutions.',
        category: 'Solution Providers',
    },

    //Resellers & Distributors
    {
        question: 'Why should I join Knotral as a reseller?',
        answer: 'Knotral gives resellers access to a vetted catalog of education solutions, analytics tools for pricing, and full control over their margins—without paying commissions.',
        category: 'Resellers & Distributors',
    },
    {
        question: 'Can I build long-term relationships with institutions through Knotral?',
        answer: 'Yes, the platform supports relationship management and helps you become a trusted local expert, enhancing repeat business opportunities.',
        category: 'Resellers & Distributors',
    },
    {
        question: 'Is training or onboarding support provided to new resellers?',
        answer: 'Absolutely. Knotral offers certification programs, onboarding guidance, and ongoing support to help you maximize success.',
        category: 'Resellers & Distributors',
    },

    //Educators & Schools
    {
        question: 'How does Knotral help schools and educational institutions?',
        answer: 'Knotral offers improved visibility into vetted education products, local implementation support, transparent pricing, and simplified vendor evaluation processes.',
        category: 'Educators & Schools',
    },
    {
        question: 'Can we get support for implementation or training?',
        answer: 'Yes, Knotral’s certified reseller network provides localized support for onboarding, implementation, and training as needed.',
        category: 'Educators & Schools',
    },
     {
        question: 'Are the solutions on Knotral verified for educational use?',
        answer: 'Yes, every product listed goes through a vetting process to ensure compliance with educational standards and relevance for institutional needs.',
        category: 'Educators & Schools',
    },
     {
        question: 'Is Knotral suitable for both large institutions and small schools?',
        answer: 'Absolutely. Whether you’re a large university or a small preschool, Knotral scales to meet your procurement and support needs with localized expertise.',
        category: 'Educators & Schools',
    },

];

const tabs = ['General', 'Solution Providers', 'Resellers & Distributors', 'Educators & Schools'];


// Add this hook in the same file or import from utils
const useIsMobile = (breakpoint = 480) => {
  const [isMobile, setIsMobile] = useState(false); // default false

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= breakpoint);
    checkMobile(); // initial check

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
};


const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedTab, setSelectedTab] = useState('General');

    const isMobile = useIsMobile();

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = data.filter(item => item.category === selectedTab);


    // return (
    //     <section className={styles.faq}>
    //         <div className={styles.faqheaderSection}>
    //             <h2 className={styles.faqHeading}>Frequently asked questions</h2>
    //             <p className={styles.faqDesc}>These are the most commonly asked questions about Knotral.
    //                 Can’t find what you're looking for? Email to our friendly team!</p>
    //         </div>

    //         {/* Tabs */}
    //         <div className={styles.tabContainer}>
    //             {tabs.map(tab => (
    //                 <button
    //                     key={tab}
    //                     className={`${styles.tabButton} ${selectedTab === tab ? styles.activeTab : ''}`}
    //                     onClick={() => {
    //                         setSelectedTab(tab);
    //                         setOpenIndex(null); // close any open accordion on tab change
    //                     }}
    //                 >
    //                     {tab}
    //                 </button>
    //             ))}
    //         </div>

    //         {/* Accordion */}
    //         <div className={styles.accordionContainer}>
    //             {filteredData.length === 0 ? (
    //                 <p>No questions available in this category.</p>
    //             ) : (
    //                 filteredData.map((item, index) => (
    //                     <div key={index} className={styles.accordionItem}>
    //                         <div
    //                             className={styles.accordionTitle}
    //                             onClick={() => toggleAccordion(index)}
    //                         >
    //                             <span>{item.question}</span>
    //                             <FaChevronDown
    //                                 className={`${styles.icon} ${openIndex === index ? styles.rotate : ''}`}
    //                             />
    //                         </div>
    //                         {openIndex === index && (
    //                             <div className={styles.accordionContent}>{item.answer}</div>
    //                         )}
    //                     </div>
    //                 ))
    //             )}
    //         </div>
    //     </section>
    // )

    return (
        <section className={styles.faq}>
            <div className={styles.faqheaderSection}>
                <h2 className={styles.faqHeading}>Frequently asked questions</h2>
                <p className={styles.faqDesc}>These are the most commonly asked questions about Knotral.
                    Can’t find what you're looking for? Email to our friendly team!</p>
            </div>

            {isMobile ? (
                // 👇 Render all categories with questions (mobile layout)
                tabs.map(tab => {
                    const categoryData = data.filter(item => item.category === tab);
                    return (
                        <div key={tab} className={styles.mobileTabSection}>
                            <h3 className={styles.mobileTabHeading}>{tab}</h3>
                            {categoryData.map((item, index) => (
                                <div key={index} className={styles.accordionItem}>
                                    <div
                                        className={styles.accordionTitle}
                                        onClick={() => toggleAccordion(`${tab}-${index}`)}
                                    >
                                        <span>{item.question}</span>
                                        <FaChevronDown
                                            className={`${styles.icon} ${openIndex === `${tab}-${index}` ? styles.rotate : ''
                                                }`}
                                        />
                                    </div>
                                    {openIndex === `${tab}-${index}` && (
                                        <div className={styles.accordionContent}>{item.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })
            ) : (
                // 👇 Desktop view: tabs + filtered accordions
                <>
                    <div className={styles.tabContainer}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`${styles.tabButton} ${selectedTab === tab ? styles.activeTab : ''}`}
                                onClick={() => {
                                    setSelectedTab(tab);
                                    setOpenIndex(null);
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className={styles.accordionContainer}>
                        {filteredData.map((item, index) => (
                            <div key={index} className={styles.accordionItem}>
                                <div
                                    className={styles.accordionTitle}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{item.question}</span>
                                    <FaChevronDown
                                        className={`${styles.icon} ${openIndex === index ? styles.rotate : ''}`}
                                    />
                                </div>
                                {openIndex === index && (
                                    <div className={styles.accordionContent}>{item.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default Faq;

