import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetUserProfile } from '../../services/UserService';
import { useSession } from '../../contexts/SessionContext'

const SignIn = () => {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const [, { login }] = useSession();
    const [isFalseDetail, setFalseDetail] = useState(false);

    //Christmann's code
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsValid(validateEmail(event.target.value));
    }
    //I have added most popular top-level domains in email address
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|int)$/;
        return regex.test(email);
    }
    //----------End------------

    const onSubmit = async (data) => {
        const res = await GetUserProfile(data);
        if (res.length > 0) {
            login(res[0]);
        } else {
            setFalseDetail(true);
        }
    }

    return (
        <form className='loginMain' onSubmit={handleSubmit(onSubmit)}>
            <div className='fontBold font15'>Email</div>
            <div className='mb1'>
                <input type="email" value={email} onChange={handleEmailChange} className="inputBox" placeholder="Enter Email" name="email"
                // {...register("email", { required: 'Enter a valid email address' })}
                />

                {/* I have added this code to display the warning */}
                {!isValid && (
                    <p style={{ color: 'red' }}>Please enter a valid email address</p>
                )}
                {/* -----------End----------- */}
                <p className='formErrorText'>{errors.email?.message}</p>
            </div>
            <div className='fontBold font15'>Password</div>
            <div className='mb2'>
                <input type="password" className="inputBox" placeholder="Enter Password" name="password"
                    {...register("password", { required: 'Please enter a password' })}
                />
                <p className='formErrorText'>{errors.password?.message}</p>
            </div>
            <div className="mb2">
                <input type="submit" className='btn btnPrimary largeBtn w100 fontBold mb1' value="Sign In" />
                {isFalseDetail &&
                    <p className='formErrorText'>
                        Incorrect email or password.<br /> Please try again or click    'Forgot your password?'.
                    </p>
                }
            </div>
        </form>
    )
}

export default SignIn;