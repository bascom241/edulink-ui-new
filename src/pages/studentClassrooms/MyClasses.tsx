import React, { useEffect, useState } from 'react'
import { useClassRoomStore } from '../../store/useClassRoom'

import { useAuthStore } from '../../store/useAuthStore'
import { Loader } from 'lucide-react'
import MyClassroomCard from '../../cards/MyClassroomCard'
import { ChatModal } from '../../models/ChartModal'

interface Instructor {
  classroomOwnerEmail: string;
  classroomOwnerFirstName?: string;
  instructorId?: number;
}
const MyClasses = () => {

  const { getStudentClassroooms, studentClassroomContainer, fetchingStudentClassrooms } = useClassRoomStore()
    const [showChat, setShowChat] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  
  const { user } = useAuthStore()

useEffect(() => {
  console.log("User changed:", user)
  if (user && getStudentClassroooms) {
    const studentEmail = user.email
    getStudentClassroooms(studentEmail)
  }
}, [user])


  if (fetchingStudentClassrooms) {
    return (
      <div className='flex items-center justify-center'>
        <Loader className='animate-spin' size={30} />
      </div>
    )
  }

  return (
    <main className="pt-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 pb-10 bg-gray-50 min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Classrooms
        </h1>
        <p className="text-gray-600 text-lg">
          Explore Information  about your classrooms Here
        </p>
      </header>

      <section className='flex-col space-y-6'>
        {
          studentClassroomContainer.length > 0 &&
          studentClassroomContainer.map((c) => (
            <MyClassroomCard
              key={c.classId}
              classroom={c}
               onChat={(inst) => {
                setSelectedInstructor(inst);
                setShowChat(true);
              }}
            />
          ))
        }
      </section>

        {showChat && selectedInstructor && (
              <ChatModal
                instructor={selectedInstructor}
                onClose={() => setShowChat(false)}
              />
            )}
    </main>
  )
}

export default MyClasses
