import { useEffect, useRef } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import man from "./Assets/images/D_slide_man_accs_-1.jpg";
import calzado from "./Assets/images/D_slide_man_calzado_-1.jpg";
import ramadan from "./Assets/images/D_slide_man_ramadan_-1.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./home.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Home = () => {
  const progressLine = useRef(null);

  const onAutoplayTimeLeft = (swiper, timeLeft) => {
    if (progressLine.current) {
      const progress = 1 - timeLeft / swiper.params.autoplay.delay;
      progressLine.current.style.setProperty("--progress", progress);
    }
  };

  // Smooth fade-in effect for sections
  useEffect(() => {
    const sections = document.querySelectorAll(".fullpage-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Header />
      <main className="fullpage-container">
        {/* Swiper Section (First Full Page) */}
        <section className="fullpage-section">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            <SwiperSlide>
              <img width="100%" src={man} alt="Man Collection" />
              <h1 className="section-title">Welcome to our store</h1>
            </SwiperSlide>
            <SwiperSlide>
              <img width="100%" src={calzado} alt="Shoes Collection" />
            </SwiperSlide>
            <SwiperSlide>
              <img width="100%" src={ramadan} alt="Ramadan Collection" />
            </SwiperSlide>
          </Swiper>
        </section>

        {/* Categories Section (Second Full Page) */}
        <section className="fullpage-section categories">
          <h2 className="section-title">Categories</h2>
          <p>Discover our unique categories</p>
        </section>

        {/* New Collection Section (Third Full Page) */}
        <section className="fullpage-section new-collection">
          <h2 className="section-title">New Collection</h2>
          <p>Check out our latest arrivals</p>
        </section>

        {/* Other Section (Fourth Full Page) */}
        <section className="fullpage-section other-section">
          <h2 className="section-title">Trending Now</h2>
          <p>Explore the hottest trends</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
