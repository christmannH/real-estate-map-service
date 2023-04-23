import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetUserProfile, SaveUser } from '../../services/UserService';
import { useSession } from '../../contexts/SessionContext'

const Register = () => {
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

    const onSubmit = async (data) => {
        const newData = { email: data.email }
        const res = await GetUserProfile(newData);
        if (res.length > 0) {
            setFalseDetail(true);
        } else {
            const userData = {
                ...data,
                savedHome: [],
                savedSearch: []
            }
            const createdUser = await SaveUser(userData);
            login(createdUser);
        }
    }

    return (
        <form className='loginMain' onSubmit={handleSubmit(onSubmit)}>
            <div className='fontBold font15'>Email</div>
            <div className='mb1'>
                <input type="email" value={email} onChange={handleEmailChange} className="inputBox" placeholder="Enter Email" name="email" required
                // Follow code is not neccessary.
                // {...register("email", { required: 'Enter a valid email address' })}    
                />

                {/* I have added this code to display the warning */}
                {!isValid && (
                    <p style={{ color: 'red' }}>Please enter a valid email address</p>
                )}
                <p className='formErrorText'>{errors.email?.message}</p>
                {isFalseDetail &&
                    <p className='formErrorText'>
                        Email already exist. Please use another email!
                    </p>
                }
            </div>
            <div className='fontBold font15'>Password</div>
            <div className='mb2'>
                <input type="password" className="inputBox" placeholder="Enter Password" name="password"
                    {...register("password", { required: 'Please enter a password' })}
                />
                <p className='formErrorText'>{errors.password?.message}</p>
            </div>
            <div className="mb2">
                <input type="submit" className='btn btnPrimary largeBtn w100 fontBold mb1' value="Submit" />
            </div>
        </form>
    )
}

export default Register;