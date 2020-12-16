import React from 'react' ;

const Login = (props) => {

     
      const {
          email,
          emailUpdate,
          password,
          passwordError,
          setPassword,
          handleLogin,
          handleSignup,
          hasAccount,
          sethasAccount,
          emailError,
        }= props ;

    return(
        <section className ="login"> 
        <div className="loginContainer">
            <label>UserName</label>
            <input type ="text" 
            autoFocus 
            required
            value ={email}
            onChange = {e=> {
                console.log(e.target.value)
                emailUpdate(e.target.value)
            }}
            />
            <p className="errorMsg" >{emailError}</p>
            <label>Password</label>
            <input type ="password" 
            autoFocus 
            required
            value = {password}
            onChange = {(e)=> setPassword(e.target.value)}
            />

            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
            {hasAccount ?(
                <>
                <button onClick={handleLogin} > Sign in  </button>
                <p>Dont hanve an account ?<span onClick={()=>sethasAccount(!hasAccount)} >Sign Up</span></p>
                </>
            ):(
                <>
                <button onClick={handleSignup} > Sign up  </button>
                <p> Hanve an account ?<span  onClick={()=>sethasAccount(!hasAccount)} >Sign In</span></p>
                </>
            )
            }
            </div>

        </div>

        </section>

    )
}

export default Login ;