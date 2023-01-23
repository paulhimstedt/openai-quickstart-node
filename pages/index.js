import Head from "next/head";
import { useState } from "react";
import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Landing from './components/landing';
import HowTo from './components/howto'
import NavBar from "./components/navbar";



export default function Home() {
  return (

    <NextUIProvider>
      <NavBar />


      <section>
        <Landing />
      </section>
      <section>

      </section>
      <section>
        <HowTo />
      </section>
    </NextUIProvider>
  );
}
