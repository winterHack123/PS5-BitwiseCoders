import React,{useState} from 'react'
import axios from 'axios'
import UserContext from "./UserContext"

export default function UserState(props) {
    const host = "http://localhost:3000";
    const studentsInitial = [];
    const [students,setStudents]=useState(notesInitial);
    const [loadingState,setLodingState]=useState(false);
    
    //Get all users
    const getUsers = async()=>{
      setLodingState(true);
      const url = `${host}/api/students/fetchallstudents`;
      const headers = {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
      const response = await axios.get(url,{headers});
      // console.log(response.data);
      // eslint-disable-next-line
      const json = await response.data;
      setStudents(json);
      setLodingState(false);
    }

    const addStudent = async({user})=>{
        setLodingState(true);
        const url = `${host}/api/students/addstudent`;
        const headers = {
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token')
        }
        const requestBody = {user}
        const response = await axios.post(url,requestBody,{headers});
        // eslint-disable-next-line
        const json = await response.data;
        // console.log(response.data);
        setLodingState(false);
      }

  return (
    <NoteContext.Provider value={{getUsers,addStudent}}>
    {props.children}
  </NoteContext.Provider>
  )
}
