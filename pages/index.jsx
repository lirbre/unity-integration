// import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "build/build.loader.js",
  dataUrl: "build/build.data",
  frameworkUrl: "build/build.framework.js",
  codeUrl: "build/build.wasm"
  // webglContextAttributes: {
  //   preserveDrawingBuffer: true,
  // },
});

function Home() {
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progression, setProgression] = useState(0);

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  useEffect(function () {
    unityContext.on("error", function (message) {
      setDidError(true);
      setErrorMessage(message);
    });
  }, []);

  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      { progression !== 1 ? (
      <p>Loading {progression * 100} percent...</p>
      ) : ( <p/> )}

      <div
        style={{
          marginBottom: "2rem"
        }}
      >
        <button onClick={() => handleOnClickFullscreen()}>Fullscreen</button>
      </div>
      
      {didError === true ? (
        <div>Oops, that's an error {errorMessage}</div>
      ) : (
        <Unity unityContext={unityContext} 
            style={{
              width: "50vw",
              height: "60vh"
            }}
          />
      )}

    </div>
  );
}

export default Home
