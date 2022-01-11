import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import * as yup from 'yup'
import { GlobalPropsContext } from '../GlobalPropsContext'
import "../../App.css"

const initialFakeUserData =   {
  username: "user",
  password: "pass",
  phoneNumber: "123-456-7890"
}


export default function Profile() {

  const [userInfo, setUserInfo] = useState();
  const { isLoading, setIsLoading } = useContext(GlobalPropsContext);
  const [userId, setUserId] = useState(userInfo?.user_id);

  const username = localStorage.getItem('username')

    const params = useParams();
    // use axios to get user info to display in form
    useEffect(() => {
        axios
            .get(`https://water-my-plants-fullstack-api.herokuapp.com/user/${params.id}`)
            .then((res) => {
                setUserInfo(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params]);


  const onChange = (e) => {
    setUserInfo({
        ...userInfo, [e.target.name]: e.target.value
    })
}
    const editUsertSubmitHandler = (e) => {
      e.preventDefault();
      setIsLoading(true);
      // send to database via axios
      axios.put(
          `/user/${userId} `,
          {
              username: userInfo.username, password: userInfo.password, phoneNumber: userInfo.phoneNumber,
          },
      )
          .then((res) => {
              setUserInfo(res.data);
              setUserId(res.data.user_id);
          })
          .finally(() => {
              console.log(userId);
          });
  };


  return (
    <div>
      <h2>username </h2>
      <input
          placeholder="username"
          name="username"
          label="username"
          type="text"
          id="username"
          onChange={onChange}
          value={userInfo.username}
      />
      <h2>password </h2>
      <input
          placeholder="password"
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={onChange}
          value={userInfo.password}
      />
      <p>pls retype password</p>
            <input
          placeholder="password"
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={onChange}
          value={userInfo.password}
      />
      <h2>phone number </h2>
      <input
          placeholder="phone number"
          name="phoneNumber"
          label="phoneNumber"
          type="text"
          id="phoneNumber"
          onChange={onChange}
          value={userInfo.phoneNumber}
      />
      <br/><br/>
      <button type="submit">Save Changes</button>
    </div>
  )
}
