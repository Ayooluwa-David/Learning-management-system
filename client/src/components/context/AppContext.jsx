import { createContext, useState, useEffect} from "react";
import { assets, dummyCourses } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth, useUser } from "@clerk/react" 



        

 export const AppContext = createContext()



export const AppContextProvider = (props) => {
    const currency  = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const  {getToken} = useAuth()
    const {user} = useUser()




    const [allCourses, setAllCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])


     const [isEducator, setIsEducator] = useState(true)

     // Fetch all Courses
     const fetchAllCourses = async ()  => {
             setAllCourses(dummyCourses)
     }

     const calculateRating = (course) => {
        if(course.courseRatings.length === 0) {
            return 0;
        }

        let totalRating = 0
        course.courseRatings.forEach(
            rating => {
                totalRating += rating.rating
            }
        )

        return totalRating / course.courseRatings.length
     }


     // Function to calculate Course Chapter time


     const calculateChapterTime = (chapter) => {
              let time = 0
              chapter.chapterContent.map(
                (lecture)=>
                    time += lecture.lectureDuration
                
              )

              return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
     }


     // Function to Calculate Course Duration 


     const calculateCourseDuration = (course) => {
             let time = 0

             course.courseContent.map((chapter) => chapter.chapterContent.map(
                   (lecture) => time += lecture.lectureDuration 
             ) )
              return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})

     } 


     // Function to calculate  No of Lectures in the course

     const calculateNoOfLetures = (course) => {
                   let totalLectures = 0;

                   course.courseContent.forEach(chapter => {
                        if(Array.isArray(chapter.chapterContent))  {
                            totalLectures += chapter.chapterContent.length
                        }
                   })

                   return totalLectures;
     } 
     
// Fetch User Enrolled Courses

const fetchUserEnrolledCourses = async ()=> {
     setEnrolledCourses(dummyCourses)
}



useEffect(() => {
     fetchAllCourses()
     fetchUserEnrolledCourses()
}, [])

const logToken = async () => {
    console.log(await getToken())
}

useEffect(() => {
    if(user) {

        logToken()

    }
}, [user]) 


    const value = {
        currency, allCourses, navigate, calculateRating, isEducator, setIsEducator, calculateNoOfLetures, calculateCourseDuration, calculateChapterTime, enrolledCourses, fetchUserEnrolledCourses
    }
    return (
            <AppContext.Provider value={value}>

                {props.children}
            </AppContext.Provider>
    )
 }