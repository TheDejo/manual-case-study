'use client'

import React, { Fragment, useState} from "react";
import Header from "@/pageComponents/Header/Header";
import Hero from "@/pageComponents/Hero/Hero";
import Services from "@/pageComponents/Services/Services";
import Footer from "@/pageComponents/Footer/Footer";
import QuestionaireModal from "@/pageComponents/QuestionaireModal/QuestionaireModal";

export default function Home() {
  const [isQuestionaireModalOpen, setIsQuestionaireModalOpen] = useState(false);

  return (
    <Fragment>
      <Header />
      <Hero onCtaClick={() => setIsQuestionaireModalOpen(true)} /> 
      <Services />
      <Footer />
      <QuestionaireModal
        isOpen={isQuestionaireModalOpen}
        onClose={() => setIsQuestionaireModalOpen(false)}
      />
    </Fragment>
  );
}
