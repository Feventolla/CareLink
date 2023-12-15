import React from 'react'

 function Login() {
  return (
    <div>
        <form action="">
            <label htmlFor="email">Email</label>
            <input type="email" required/>

            <label htmlFor="password">Password</label>
            <input type="password"  required/>
            
            <label htmlFor="name">Name</label>
            <input type="text" required/>

            <button type="submit">Submit</button>
        </form>
      </div>
  )
}


export default Login;