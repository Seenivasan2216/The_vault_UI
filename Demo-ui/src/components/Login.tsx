import React, { useState } from 'react';
import { setSessionData, clearSessionData, setSessionuser } from '../service/session';
import { postMethod } from '../service/util';
import { useNavigate } from "react-router-dom";
import {
    Card,
    Input,
    Button,
    Typography,
    Alert 
  } from "@material-tailwind/react";


const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await postMethod('login', { username, password });
            console.log('test', response);
            if (!response.success) {
                console.error('Login error:', response);
                setError('Failed to log in. Please check your credentials.');
                throw new Error('Login failed');
            }
            else {
                if(response && response.success){
                    console.log('Login successful:', response);
                    setSessionData(response.accessToken);
                    setSessionuser(response.data[0].userid)
                    navigate("/Dashboard");
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to log in. Please check your credentials.');
            clearSessionData();
        }
    };


    return (
        <Card className="flex justify-center items-center h-screen">
           <div className="bg-gray-200 p-4">
              <img
                  src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                  alt="Sample Image"
                  className="rounded-lg shadow-md"
              />
          </div>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"  onSubmit={handleLogin}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                id="username" name="username" 
                placeholder="Username"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                id="password" name="password" 
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
                {error && <div className="flex w-full flex-col gap-2"><Alert color="red">{error} </Alert></div> }
            </div>
            <Button className="mt-6" color='blue-gray' fullWidth type='submit'>
              sign in
            </Button>
            
          </form>
        </Card>
          
      );
  };
  
  export default LoginForm;
    
