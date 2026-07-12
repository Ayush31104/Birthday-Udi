"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Envelope from "./Envelope";
import LetterPaper from "./LetterPaper";

type Props = {
  onClose: () => void;
};

export default function LetterModal({ onClose }: Props) {

  const [opened,setOpened]=useState(false);

  return(

    <AnimatePresence mode="wait">

      {!opened ? (

        <Envelope
          onOpen={()=>setOpened(true)}
        />

      ) : (

        <LetterPaper
          onClose={onClose}
        />

      )}

    </AnimatePresence>

  );

}