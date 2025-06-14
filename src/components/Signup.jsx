import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { registerUser } from '../utils/authSlice.js';
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router';

// Zod validation schema
const registerSchema = z.object({
    userName: z.string().min(2, "Username must be at least 2 characters"),
    emailId: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
        <Link to={"/"} className='fixed top-5 left-5 text-white text-4xl'>Ever Ai</Link>
        <div className='bg-register min-h-screen w-full flex items-center justify-center'>
            <div className='w-140 py-30 backdrop-blur-[5px] border-2 border-purple-300 flex justify-center items-center rounded-2xl'>
                <form
                    className='bg-[#1F1F1F] p-6 rounded-lg shadow-md w-80 opacity-100'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='
                    flex gap-2 justify-center items-center text-white'>
                        <FiUser className='text-xl text-white mb-[18px] font-bold bg-[#007AFF] h-6 w-6 rounded-3xl'/> 
                        <h1 className='text-2xl mb-4 text-center'>Sign Up</h1>
                    </div>

                    <div className='mb-4'>
                        <input
                            className='w-full bg-white text-[#007AFF] p-2 border rounded'
                            type='text'
                            placeholder='Username'
                            {...register('userName')}
                        />
                        {errors.userName && (
                            <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <input
                            className='w-full bg-white text-[#007AFF] p-2 border rounded'
                            type='email'
                            placeholder='Email'
                            {...register('emailId')}
                        />
                        {errors.emailId && (
                            <p className="text-red-500 text-sm mt-1">{errors.emailId.message}</p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <input
                            className='w-full bg-white text-[#007AFF] p-2 border rounded'
                            type='password'
                            placeholder='Password'
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <button
                        className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                    <div className='flex justify-center items-center gap-2 mt-5 text-[15px]'>
                        <h1 className='text-white'>already, have an account?</h1>
                        <span className='text-[#007AFF]'><Link to={"/login"}>login!</Link></span>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Signup;