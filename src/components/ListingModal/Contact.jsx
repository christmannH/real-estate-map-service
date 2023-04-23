import React, { useState } from 'react'

const Contact = (props) => {
  const { data } = props

  //Christmann's code
  const [text, setText] = useState('');
  const [isTextValid, setIsTextValid] = useState(true);

  function handleTextChange(event) {
    setText(event.target.value);
    setIsTextValid(validateText(event.target.value));
  }

  function validateText(text) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(text);
  }

  const [number, setNumber] = useState('');
  const [isNumberValid, setIsNumberValid] = useState(true);

  function handleNumberChange(event) {
    setNumber(event.target.value);
    setIsNumberValid(validateNumber(event.target.value));
  }

  function validateNumber(number) {
    const regex = /^[0-9]+$/;
    return regex.test(number);
  }

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(validateEmail(event.target.value));
  }
  //I have added most popular top-level domains in email address
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|int)$/;
    return regex.test(email);
  }

  //----------End------------
  return (
    <>
      <div className='detailPreItem'>
        <form className='itemOne'>
          <div className='itemTitle'>Contact Agent</div>
          <div className='mb1'>
            <span className='font500'>Name</span>
            <input type='text' value={text} onChange={handleTextChange} className='inputBox' required />
            {!isTextValid && (
              <p style={{ color: 'red' }}>Please enter a only alphabetical character</p>
            )}
          </div>
          <div className='mb1'>
            <span className='font500'>Phone</span>
            <input type='text' value={number} onChange={handleNumberChange} className='inputBox' required />
            {!isNumberValid && (
              <p style={{ color: 'red' }}>Please enter only numeric characters</p>
            )}
          </div>
          <div className='mb1'>
            <span className='font500'>Email</span>
            <input type='email' value={email} onChange={handleEmailChange} className='inputBox' required />
            {!isEmailValid && (
              <p style={{ color: 'red' }}>Please enter a valid email address</p>
            )}
          </div>
          <div className='mb1'>
            <span className='font500'>Message</span>
            <textarea
              rows='2'
              className='inputBox'
              defaultValue={`I am interested in ${data.Location['Geo Address Line'] + ', ' + data.Location.City + ', ' + data.Location.State + ' ' + data.Location.Zip}`}
            />
          </div>
          <button type='submit' className='btn btnPrimary mb1 w100 font16 fontBold'>Contact Agent</button>
          <div className='mb2 font18 alignCenter'>
            <input type='checkbox' id='privacyCheck' />
            <label htmlFor='privacyCheck'>I want financing information</label>
          </div>
          <div className='font10 colorGray'>
            By pressing Contact Agent, you agree that ($Site) and its affiliates, and real estate professionals may call/text you about your inquiry, which may involve use of automated means and prerecorded/artificial voices. You don't need to consent as a condition of buying any property, goods or services. Message/data rates may apply. You also agree to our Terms of Use. ($Site) does not endorse any real estate professionals. We may share information about your recent and future site activity with your agent to help them understand what you're looking for in a home.
          </div>
        </form>
        <hr />
      </div>
    </>
  );
}
export default Contact;