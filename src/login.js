import React from 'react';

const Login = () => {
    
    return (
        <div>
            <center>
                <button style={{"marginTop" : "20px"}} 
                onClick={handleGoogleSignIn}>Sign In with Google</button>
            </center>
        </div>
    );
}

export default Login;