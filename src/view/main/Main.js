import React from 'react';
import {ModeProvider} from "../../context/Context";
import MainBody from "../../component/main/body/MainBody";

const Main: () => React$Node = () => {

  return (
    <>
      <ModeProvider>
          <MainBody/>
      </ModeProvider>
    </>
  );
};

export default Main;
