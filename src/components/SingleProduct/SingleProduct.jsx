"use client";

import React, { useEffect } from "react";
import styles from "../SingleProduct/SingleProduct.module.css"
import { FaAward, FaChalkboardTeacher, FaCheck, FaChevronDown, FaGraduationCap, FaLanguage, FaTimes, FaUserClock, FaUserFriends } from "react-icons/fa";
import { MdBusiness, MdChecklist, MdSupportAgent, MdTranslate } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { RiTranslate } from "react-icons/ri";
import productLogo from "../../assets/productLogo.png"
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import Link from "next/link"; // ✅ Replaced react-router-dom Link
import { Autoplay, Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { client } from "../../utils/sanityClient";
import styles1 from "../RequestDemo/Requestdemo.module.css"; // adjust path if needed
import defaultImage from "../../assets/defaultImage.webp"
import { useParams, useRouter } from "next/navigation";


// import { Helmet } from "react-helmet";

import Head from "next/head";

// Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from "react";
import { FaArrowRight, FaCircleChevronRight } from "react-icons/fa6";
import Image from "next/image";


const useIsMobile = (breakpoint = 480) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Initialize only on client
        const checkIsMobile = () => setIsMobile(window.innerWidth <= breakpoint);

        // Initial check
        checkIsMobile();

        // Listen for resize
        window.addEventListener("resize", checkIsMobile);

        return () => window.removeEventListener("resize", checkIsMobile);
    }, [breakpoint]);

    return isMobile;
};


const SingleProduct = ({ slug }) => {
  const router = useRouter();
  const params = useParams();

  // ✅ Get slug from props OR from the URL params
  const productSlug = slug || params.slug;

  console.log("Product slug:", productSlug);

    const isMobile = useIsMobile();


    // ✅ All states declared at the top
    const [product, setProduct] = useState(null);

    const [showDemoPopup, setShowDemoPopup] = useState(false);
    const [loading, setLoading] = useState(true); // ✅ Loader state
    const [alternateProducts, setAlternateProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // ✅ for Read More / Less
    const [isAboutExpanded, setIsAboutExpanded] = useState(false); // ✅ add this near top
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };
    const [demoForm, setDemoForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        category: "",
        role: "",
        productName: "",
    });

   useEffect(() => {
    if (router.query?.product) {
      // If product info passed via query
      setProduct(JSON.parse(router.query.product));
    }
  }, [router.query]);

    // ✅ Fetch product if opened via shared link
    useEffect(() => {
        if (!product && slug) {
            client
                .fetch(
                    `*[_type == "product" && slug.current == $slug][0]{
            _id,
            productName,
            "productLogo": productLogo.asset->url,
            "featuredImage": featuredImage.asset->url,
            "galleryImages": galleryImages[].asset->url,
            heading,
            slug,
            shortDescription,
            longDescription,
            companyType,
            tags,
            companyName,
            hqLocation,
            founded,
            age,
            grade,
            features,
            perfectFor,
            awards,
            language,
            training,
            support,
            price,
            currency,
            productFor,
            trialType,
            subscriptionType,
            aboutHeading,
            aboutDescription,
            reviews[]{
              reviewerName,
              reviewText,
              "reviewProfileImage": reviewProfileImage.asset->url
            },
              productFaqs[]{
          question,
          answer,
        },
      metaTitle,
      metaDescription,
      schemaMarkup
          }`,
                    { slug }
                )
                .then((data) => setProduct(data))
                .catch(console.error)
                .finally(() => setLoading(false)); // ✅ stop loader

        }
        else {
            setLoading(false); // if product already passed via state
        }
    }, [slug, product]);

    // ✅ Fetch alternate products
    useEffect(() => {
        if (!product?.companyType) return;
        client
            .fetch(
                `*[_type == "product" && companyType == $companyType && _id != $currentProductId]{
        _id,
            productName,
            "productLogo": productLogo.asset->url,
            "featuredImage": featuredImage.asset->url,
            "galleryImages": galleryImages[].asset->url,
            heading,
            slug,
            shortDescription,
            longDescription,
            companyType,
            tags,
            companyName,
            hqLocation,
            founded,
            age,
            grade,
            features,
            perfectFor,
            awards,
            language,
            training,
            support,
            price,
            currency,
            productFor,
            trialType,
            subscriptionType,
            aboutHeading,
            aboutDescription,
            reviews[]{
              reviewerName,
              reviewText,
              "reviewProfileImage": reviewProfileImage.asset->url
            },
            productFaqs[]{
          question,
          answer,
        },
      metaTitle,
      metaDescription,
      schemaMarkup
          }`,
                { companyType: product.companyType, currentProductId: product._id }
            )
            .then((data) => setAlternateProducts(data))
            .catch(console.error);
    }, [product]);


    // ✅ Lock scroll when demo popup open
    useEffect(() => {
        document.body.style.overflow = showDemoPopup ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showDemoPopup]);

    // ✅ Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.create({
                _type: "lead",
                formType: "free-demo",
                fullName: demoForm.fullName,
                email: demoForm.email,
                phoneNumber: demoForm.phone,
                role: demoForm.role,
                category: product.companyType || "",
                productName: product.productName || "",
                submittedAt: new Date().toISOString(),
            });
            setShowDemoPopup(false);
            setDemoForm({
                fullName: "",
                email: "",
                phone: "",
                role: "",
                category: "",
                productName: "",
            });
            setShowPopup(true);
        } catch (error) {
            console.error("❌ Submission error:", error);
        }
    };

    // ✅ Tab scroll
    const handleTabClick = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    // ✅ Request demo
    const handleRequestDemo = () => {
        router.push("/request-demo", { state: { products: [product] } });
    };

    const handleFreeDemo = () => {
        setShowDemoPopup(true);
    };

    // ✅ Show loader while fetching
    if (loading) {
        return (
            <div className={styles.loaderWrapper}>
                <div className={styles.loader}></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (!product) return <p>No product found</p>;

    const title = product?.metaTitle || product?.productName || "Knotral";
    const paragraphs = product.longDescription?.split(/\n{2,}/) || [];
    const visibleParagraphs = isExpanded ? paragraphs : paragraphs.slice(0, 3);

    const aboutParagraphs = product.aboutDescription?.split(/\n{2,}/) || [];
    const aboutVisibleParagraphs = isAboutExpanded ? aboutParagraphs : aboutParagraphs.slice(0, 3);

    // const canonicalUrl = `https://knotral.com/${product.slug.current}`;

    return (
        <div className={styles.singleProduct}>
              {product && (
        <Head key={product.slug?.current}>
          <title>{product.metaTitle || product.productName}</title>
          {product.metaDescription && (
            <meta name="description" content={product.metaDescription} />
          )}
          <link
            rel="canonical"
            href={`https://knotral.com/${product.slug?.current}`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={product.metaTitle || product.productName} />
          {product.metaDescription && (
            <meta property="og:description" content={product.metaDescription} />
          )}
          {product.featuredImage && (
            <meta property="og:image" content={product.featuredImage} />
          )}
          <meta
            property="og:url"
            content={`contact@knotral.com/${product.slug?.current}`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={product.metaTitle || product.productName}
          />
          {product.metaDescription && (
            <meta name="twitter:description" content={product.metaDescription} />
          )}
          {product.featuredImage && (
            <meta name="twitter:image" content={product.featuredImage} />
          )}
        </Head>
      )}
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link href="/" className={styles.breadcrumbLink} >Home</Link>
                <FaArrowRight className={styles.separator} />
                <Link href="/all-products" className={styles.breadcrumbLink}>Products</Link>
                <FaArrowRight className={styles.separator} />
                <span className={styles.current}>{product.productName}</span>
            </nav>

            {/* hero section*/}
            <section className={styles.heroSection}>
                <div className={styles.leftSide}>
                    <h1 className={styles.heading}>{product.heading}</h1>

                    <div className={styles.description}>
                        {visibleParagraphs.map((para, index) => (
                            <p key={index}>{para}</p>
                        ))}

                        {paragraphs.length > 3 && (
                            <button
                                className={styles.readMoreButton}
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </div>
                </div>

                {/*hero section card*/}
                <div className={styles.rightSide}>
                    <div className={styles.product}>
                        <div className={styles.productImageWrapper}>
                            <img
                                src={product.featuredImage}
                                srcSet={`
    ${product.featuredImage}?w=400 400w,
    ${product.featuredImage}?w=800 800w,
    ${product.featuredImage}?w=1200 1200w
  `}
                                alt={`${product.productName} Image`}
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.productHeader}>
                            <div className={styles.productIconWrapper}>
                                <img
                                    src={product.productLogo}
                                    alt={`${product.productName} logo`}
                                    className={styles.productIcon}
                                />
                            </div>
                            <div className={styles.productTitleWrapper}>
                                <h2 className={styles.productTitle}>{product.productName}</h2>
                                <h3 className={styles.categoryTag}>{product.companyType}</h3>
                            </div>
                        </div>

                        <div className={styles.productContent}>
                            <div className={styles.productTags}>
                                <span className={styles.tag}><span className={styles.taglabel}>Age:&nbsp;</span> {product.age}</span>
                                <span className={styles.tag}><span className={styles.taglabel}>Grade:&nbsp;</span> {product.grade}</span>
                                {/* <span className={styles.tag}><span className={styles.taglabel}>Price:</span>₹ {product.price}</span> */}
                                <span className={styles.tag}><span className={styles.taglabel}></span>{product.trialType === "free" ? 'Free Trial' : 'Paid Trial'}</span>
                                <span className={styles.tag}><span className={styles.taglabel}></span>{product.subscriptionType === "free" ? 'Free Subscription' : 'Paid Subscription'}</span>
                                {/* <span className={styles.tag}><span className={styles.taglabel}>Perfect For:</span> {product.perfectFor}</span> */}
                            </div>

                            <div className={styles.ctaWrapper}>
                                <button
                                    className={styles.ctaButton1}
                                    // onClick={() => onToggle(product)}
                                    onClick={handleFreeDemo}
                                >
                                    Free Demo
                                </button>

                                {showDemoPopup && (
                                    <div className={styles.popupOverlay}>
                                        <div className={styles.popup}>
                                            <h2>Request Free Demo</h2>
                                            {/* <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // handle form data here
                                console.log("Demo submitted:", demoForm);
                                setShowDemoPopup(false);
                                onClick = { handleSubmit }
                            }}
                        > */}
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    value={demoForm.fullName}
                                                    onChange={(e) =>
                                                        setDemoForm((prev) => ({ ...prev, fullName: e.target.value }))
                                                    }
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={demoForm.email}
                                                    onChange={(e) =>
                                                        setDemoForm((prev) => ({ ...prev, email: e.target.value }))
                                                    }
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    value={demoForm.phone}
                                                    onChange={(e) =>
                                                        setDemoForm((prev) => ({
                                                            ...prev,
                                                            phone: e.target.value.replace(/\D/g, ""), // Only digits allowed
                                                        }))
                                                    }
                                                    inputMode="numeric"
                                                    maxLength={15} // Optional: restrict to 15 digits
                                                    required
                                                />
                                                <select
                                                    id="role"
                                                    name="role"
                                                    className={styles.selectDropdown}
                                                    value={demoForm.role}
                                                    onChange={(e) =>
                                                        setDemoForm((prev) => ({ ...prev, role: e.target.value }))
                                                    }
                                                    required
                                                >
                                                    <option value="" disabled hidden>-- Select an option --</option>
                                                    <option value="institutionalLeader">Institutional Leader</option>
                                                    <option value="educator">Educator</option>
                                                    <option value="entrepreneur">Entrepreneur</option>
                                                    <option value="resellerDistributor">Reseller / Distributor</option>
                                                </select>

                                                <div className={styles.popupButtons}>
                                                    <button type="submit">Submit</button>
                                                    <button type="button" onClick={() => setShowDemoPopup(false)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                {/* <button
                                    className={styles.ctaButton1}
                                    // onClick={() => onToggle(product)}
                                    onClick={handleRequestDemo}
                                >
                                    Price Quote
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* tab section*/}
            <section className={styles.tabSection}>
                <div className={styles.tabBar}>
                    <button className={styles.tab} onClick={() => handleTabClick('about')}>About</button>
                    <button className={styles.tab} onClick={() => handleTabClick('pricing')}>Pricing</button>
                    <button className={styles.tab} onClick={() => handleTabClick('reviews')}>Reviews</button>
                    <button className={styles.tab} onClick={() => handleTabClick('faqs')}>FAQs</button>
                    <button className={styles.tab} onClick={() => handleTabClick('alternatives')}>Alternatives</button>
                </div>
            </section>

            {/* about section*/}
            <section id="about" className={styles.aboutSection}>

                <div className={styles.aboutHeader}>
                    <div className={styles.aboutleft}>
                        <h2 className={styles.aboutHeading}>{product.aboutHeading}</h2>
                        {/* <p className={styles.aboutdesc}>{product.aboutDescription}</p> */}

                        <div className={styles.aboutdesc}>
                            {aboutVisibleParagraphs.map((para, index) => (
                                <p key={index}>{para}</p>
                            ))}

                            {aboutParagraphs.length > 3 && (
                                <button
                                    className={styles.aboutReadMoreButton}
                                    onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                                >
                                    {isAboutExpanded ? "Read Less" : "Read More"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/*hero section card*/}
                    <div className={styles.aboutRight}>
                        <Swiper
                            key={product.galleryImages.length}
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={100}
                            slidesPerView={1}
                            // navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            loop={true}
                            className={styles.imageWrapper}
                        >
                            {product.galleryImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        srcSet={`
    ${img}?w=400 400w,
    ${img}?w=800 800w,
    ${img}?w=1200 1200w
  `}
                                        alt={`slide-${index}`}
                                        className={styles.aboutImage}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                {/* 👇 Product details inside aboutSection */}
                <div className={styles.detailsSection}>
                    <div className={styles.detailsContent}>

                        <div className={styles.detailItem}>
                            <div className={styles.companylabelWrapper}>
                                <span className={styles.icon}><MdBusiness /></span>
                                <span className={styles.labelText}>Company:</span>
                            </div>
                            <div className={styles.values}>
                                <div className={styles.valueLine}><strong>Business Name:</strong> {product.companyName}</div>
                                <div className={styles.valueLine}><strong>HQ Location:</strong> {product.hqLocation}</div>
                                <div className={styles.valueLine}><strong>Founded:</strong> {product.founded}</div>
                            </div>                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><FaUserClock /></span>
                                <span className={styles.labelText}>Age Group</span>
                            </div>
                            <div className={styles.value}>{product.age}</div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><FaGraduationCap /></span>
                                <span className={styles.labelText}>Grade</span>
                            </div>
                            <div className={styles.value}>{product.grade}</div>
                        </div>


                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><BiCategory /></span>
                                <span className={styles.labelText}>Company Type</span>
                            </div>
                            <div className={styles.value}>{product.companyType}</div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><MdChecklist /></span>
                                <span className={styles.labelText}>Features</span>
                            </div>
                            <div className={styles.value}>
                                {product.features?.join(" | ")}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><FaUserFriends /></span>
                                <span className={styles.labelText}>Perfect For</span>
                            </div>
                            <div className={styles.value}>
                                {product.perfectFor
                                    ?.map(item => item.charAt(0).toUpperCase() + item.slice(1)) // capitalize
                                    .join(" | ")}   {/* join with | */}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><FaAward /></span>
                                <span className={styles.labelText}>Awards and <br /> Recognition</span>
                            </div>
                            <div className={styles.value}>{product.awards}</div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><RiTranslate /></span>
                                <span className={styles.labelText}>Language</span>
                            </div>
                            <div className={styles.value}>{product.language}</div>
                        </div>
                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><FaChalkboardTeacher /></span>
                                <span className={styles.labelText}>Training</span>
                            </div>
                            <div className={styles.value}>{product.training}</div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.labelWrapper}>
                                <span className={styles.icon}><MdSupportAgent /></span>
                                <span className={styles.labelText}>Support</span>
                            </div>
                            <div className={styles.value}>{product.support}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* pricing section*/}
            <section id="pricing" className={styles.pricingSection}>
                <h2 className={styles.pricingHeading}>Pricing Plan</h2>

                <div className={styles.pricingWrapper}>

                    <div className={styles.pricing}>
                        <div className={styles.pricingLeft}>
                            {/* Price and duration stacked in column */}
                            <div className={styles.pricingAmountWrapper}>
                                <h3 className={styles.price}>{product.currency}{product.price}</h3>
                                <p className={styles.perYear}>{product.productFor}</p>
                            </div>
                        </div>

                        <div className={styles.pricingRight}>
                            <div className={styles.pricingCards}>
                                {/* Example Plan */}
                                <div className={styles.card}>

                                    <div className={styles.pricingfeatures}>
                                        {/* <p><FaTimes className={styles.pricingIcon} /> Monthly Royalties</p> */}
                                        <p> <FaCheck className={styles.pricingIcon} />{' '}
                                            {product.trialType === 'free' ? 'Free Trial' : 'Paid Trial'}</p>
                                        <p> <FaCheck className={styles.pricingIcon} />{' '}
                                            {product.subscriptionType === 'free' ? 'Free Subscription' : 'Paid Subscription'}
                                        </p>
                                    </div>

                                    {/* CTA button */}
                                    <button className={styles.ctaButton2} onClick={handleRequestDemo}>Request info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* review section*/}
            <section id="reviews" className={styles.reviewsSection}>
                <h2 className={styles.reviewsHeading}>Reviews</h2>
                <div className={Array.isArray(product.reviews) && product.reviews.length > 0 ? styles.reviewsGrid : styles.noGrid}>
                    {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className={styles.reviewCard}>
                                <Image
                                    src={review.reviewProfileImage || defaultImage}
                                    alt={review.name || "Reviewer"}
                                    className={styles.reviewImage} />
                                <div className={styles.reviewContent}>
                                    <h4 className={styles.reviewerName}>{review.reviewerName}</h4>
                                    <p className={styles.reviewText}>{review.reviewText}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noReviews}>No reviews yet.</p>
                    )}
                </div>
            </section>

            <section id="faqs" className={styles.faq}>
                <h2 className={styles.faqHeading}>Frequently asked questions</h2>

                {isMobile ? (
                    Array.isArray(product.productFaqs) && product.productFaqs.length > 0 ? (
                        <div className={styles.accordionContainer}>
                            {product.productFaqs.map((item, index) => (
                                <div key={index} className={styles.accordionItem}>
                                    <div
                                        className={styles.accordionTitle}
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <span>{item.question}</span>
                                        <FaChevronDown
                                            className={`${styles.icon} ${openIndex === index ? styles.rotate : ''
                                                }`}
                                        />
                                    </div>

                                    {openIndex === index && (
                                        <div className={styles.accordionContent}>{item.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.noReviews}>No FAQs available.</p>
                    )
                ) : Array.isArray(product.productFaqs) && product.productFaqs.length > 0 ? (
                    <div className={styles.accordionContainer}>
                        {product.productFaqs.map((item, index) => (
                            <div key={index} className={styles.accordionItem}>
                                <div
                                    className={styles.accordionTitle}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{item.question}</span>
                                    <FaChevronDown
                                        className={`${styles.icon} ${openIndex === index ? styles.rotate : ''
                                            }`}
                                    />
                                </div>

                                {openIndex === index && (
                                    <div className={styles.accordionContent}>{item.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.noReviews}>No FAQs available.</p>
                )}
            </section>



            <section id="alternatives" className={styles.alternativeSection}>
                <h2 className={styles.alternativeHeading}>Explore Alternatives</h2>

                {alternateProducts.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, Grid]}
                        spaceBetween={30}
                        grid={{
                            rows: 1,
                            fill: 'row',
                        }}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}
                        className={styles.alternateProductsRow}
                        slidesPerView={2}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            360: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                        }}
                    >
                        {alternateProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className={styles.alternateProduct}>
                                    <div className={styles.alternateProductInfo}>
                                        <h2 className={styles.alternateProductTitle}>{product.productName}</h2>
                                        <p className={styles.alternateProductDesc}>{product.shortDescription}</p>
                                        <Link
                                            href={`/${product.slug.current}`}
                                            state={{ product }}
                                            className={styles.learnMoreButton}
                                            onClick={() => console.log("Clicked Product:", product)} // 👈 log here

                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                    <div className={styles.alternateproductImageWrapper}>
                                        <img
                                            src={product.productLogo}
                                            alt={product.title}
                                            className={styles.alternateproductImage}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className={styles.noAlternativesText}>No Alternatives Present.</p>
                )}
            </section>
            {showPopup && (
                <div className={styles1.popupOverlay}>
                    <div className={styles1.popup}>
                        <h2>Thank You!</h2>
                        <p>We've received your request and will contact you shortly.</p>
                        <button onClick={() => {
                            setShowPopup(false);
                            localStorage.clear();   // Clear all local storage
                            //   navigate("/"); // 👈 Redirect to home
                        }}
                            className={styles1.popupButton}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProduct