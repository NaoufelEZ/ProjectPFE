import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./home.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";

const Home = () => {
  const progressLine = useRef(null);

  const onAutoplayTimeLeft = (swiper, timeLeft) => {
    if (progressLine.current) {
      const progress = 1 - timeLeft / swiper.params.autoplay.delay;
      progressLine.current.style.setProperty("--progress", progress);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="w-100 position-relative d-block" style={{ height: "100vh"}}>
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
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressLine}>
            <line x1="10" y1="24" x2="38" y2="24" stroke="black" strokeWidth="4" />
          </svg>
          </div>
          </Swiper>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
