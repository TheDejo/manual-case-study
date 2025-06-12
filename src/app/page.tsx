import React, { Fragment} from "react";
import Header from "@/pageComponents/Header/Header";
import Hero from "@/pageComponents/Hero/Hero";
import Services from "@/pageComponents/Services/Services";
import Footer from "@/pageComponents/Footer/Footer";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Hero /> 
      <Services />
      <Footer />
    </Fragment>
  );
}
