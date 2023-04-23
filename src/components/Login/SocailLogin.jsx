import React from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { GetUserProfile, SaveUser } from '../../services/UserService';
import { useSession } from '../../contexts/SessionContext'
import Constant from '../../Constant';

const SocailLogin = () => {

    const [, {login, setLoading}] = useSession();

    const checkLoginStatus = async (userData) => {
        const data = await GetUserProfile(userData);

        if(data.length>0){
            login(data[0]);
        }  else {
            const createdUser = await SaveUser(userData);
            login(createdUser);
        }
    }

    const handleGoogleLogin = async (googleData) => {
        setLoading(true);
        const userData = {
            firstName : googleData.profileObj.givenName,
            lastName : googleData.profileObj.familyName,
            profileImg : googleData.profileObj.imageUrl,
            email : googleData.profileObj.email,
            googleAccessToken: googleData.accessToken,
            savedHome: [],
            savedSearch: []
        }

        checkLoginStatus(userData)
    }

    const handleGoogleFailure = (result) => {
        console.log(result)
    }

    const responseFacebook = (response) => {
        alert(JSON.stringify(response));
        setLoading(true);
        const name = response.name
        const firstName = name.split(" ")[0];
        const lastName = name.split(" ")[1];
        const email = response.email
        const profileImg = response.picture.data.url

        const userData = {
            firstName : firstName,
            lastName : lastName,
            profileImg : profileImg,
            email : email,
            password: 'Init~123',
            savedHome: [],
            savedSearch: []
        }
        checkLoginStatus(userData)
    }

    return (
        <div className='SocailLoginMain'>
            <div className='mb2'>Or connect with:</div>

            <FacebookLogin
                appId={Constant.facebookAppId}
                fields="name, email, picture"
                callback={responseFacebook}
                render={renderProps => (
                    <div className='btn btnPrimary largeBtn w100 mb1' onClick={renderProps.onClick}>
                        <div className='socialBtnIcon'><FaFacebook/></div>
                        <div>Continue with FaceBook</div>
                    </div>
                )}
            />

            <GoogleLogin
                clientId={Constant.googleClientId}
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <div className='btn btnPrimaryOutline largeBtn w100 mb1' onClick={renderProps.onClick}>
                        <div className='socialBtnIcon'><FcGoogle/></div>
                        <div>Continue with Google</div>
                    </div>
                )}
            >
            </GoogleLogin>
        </div>
    )
}

export default SocailLogin;