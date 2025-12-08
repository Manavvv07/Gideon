import './Style.css'
import { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../config/firebase';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';
import { animate, svg, stagger } from 'animejs';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        animate(svg.createDrawable('.line'), {
          draw: ['0 0', '0 1', '1 1'],
          ease: 'inOutQuad',
          duration: 3000,
          delay: stagger(200),
          loop: true
        });
    }, []);

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
                <div className="name-auth-wrapper">
                    <svg className="name-auth-svg" viewBox="0 0 600 150">
                        <defs>
                            <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4b90ff" />
                                <stop offset="100%" stopColor="#ff5446" />
                            </linearGradient>
                        </defs>
                        <text x="50%" y="50%" textAnchor="middle" dy=".35em" className="line">
                            Gideon
                        </text>
                    </svg>
                </div>
                <Spline className='spline-component' scene="https://prod.spline.design/q-ImWQ9oo-90QW1k/scene.splinecode" />
            </div>
        </div>
    )
}

export default Auth