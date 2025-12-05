import './Style.css'
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../config/firebase';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""));
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="split-screen-container">
            
            <div className="auth-side">
                <div className="form-container">
                    <div className="form-toggle">
                        <button className={isLogin ? 'active' : ''} onClick={() => {setIsLogin(true); setError("")}}>Login</button>
                        <button className={!isLogin ? 'active' : ''} onClick={() => {setIsLogin(false); setError("")}}>Sign-Up</button>
                    </div>
                    
                    <div className="form-content">
                        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
                        
                        {!isLogin && (
                            <input 
                                type="text" 
                                placeholder='Name' 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        )}
                        
                        <input 
                            type="email" 
                            placeholder='Email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        {error && <p className="error-msg">{error}</p>}

                        <button className="submit-btn" onClick={handleAuth}>
                            {isLogin ? "Login" : "Sign Up"}
                        </button>

                        <div className="divider">or</div>

                        <button className="google-btn" onClick={handleGoogleSignIn}>
                            <FcGoogle/> {isLogin ? "Login" : "Sign up"} with Google
                        </button>

                        <p className="toggle-text">
                            {isLogin ? "Don't have an account?" : "Already have an account?"} 
                            <span onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? " Sign Up" : " Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="spline-side">
                <p className='name-auth'>Gideon</p>
                <Spline className='spline-component' scene="https://prod.spline.design/q-ImWQ9oo-90QW1k/scene.splinecode" />
            </div>
        </div>
    )
}

export default Auth