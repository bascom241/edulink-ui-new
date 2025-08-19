import React from 'react'
import { useState } from 'react'
import useMultiformStore from '../../store/Multiform'
import Form0 from '../../components/Auth/Form0'
import Form1S from '../../components/Auth/student/Form2'
import Form1T from '../../components/Auth/teacher/Form1'
import Form2S from '../../components/Auth/student/Form2S'
import Form2T from '../../components/Auth/teacher/Form2'
import Form3T from '../../components/Auth/teacher/Form3'
import Form4T from '../../components/Auth/teacher/Form4T'
const Register = () => {
  const { currentStep, setCurrentStep, formData } = useMultiformStore();
  console.log("Current Step:", currentStep);




  const renderStudentStep = () => {
    switch (currentStep) {
      case 1:
        return <Form0 />;
      case 2:
        return <Form1S />
      case 3:
        return <Form2S />;
   
    }
  }


  const renderTeacherStep = () => {
    switch (currentStep) {
      case 1:
        return <Form0 />;
      case 2:
        return <Form1T />;
      case 3:
        return <Form2T />;
      case 4:
        return <Form3T />;
        case 5:
        return <Form4T />;
        

    }
  }

  return (
    <div>
      {
        formData.student ? renderStudentStep() : renderTeacherStep()
      }

    </div>
  )
}

export default Register

