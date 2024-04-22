import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/inputBox';

//          component: 인증 화면 컴포넌트             //
export default function Authentication() {
  
  //       state: 화면상태              리터럴 타입 2가지 값만//
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');


//          component: sign in card 컴포넌트             //
const SignInCard = () => {
  
  //       state: 이메일 요소 참조 상태                     //
  const emailRef = useRef<HTMLInputElement | null>(null);
  //       state: 패스워드 요소 참조 상태                     //
  const passwordRef = useRef<HTMLInputElement | null>(null);

  //       state: 이메일 상태                     //
  const [email, setEmail] = useState<string>('');

  //       state: 패스워드 상태                     //
  const [password, setPassword] = useState<string>('');

  //       state: 패스워드 타입 상태                     //
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
  
  //       state: 패스워드 버튼 아이콘 상태                     //
  const [passwordButtonIcon,setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

  //       state: 에러 타입 상태                     //
  const [error, setError] = useState<boolean>(false);

  //       event handler: 로그인 버튼 클릭 이벤트 처리 함수           //
  const onSignInButtonClickHandler = () =>{

  }

  //       event handler: 패스워드 버튼 클릭 이벤트 처리 함수           //
  const onPasswordButtonClickHandler = () =>{
    console.log(passwordType);
    if(passwordType === 'text'){
      setPasswordType('password');
      setPasswordButtonIcon('eye-light-off-icon');
    }
    else{
      setPasswordType('text');
      setPasswordButtonIcon('eye-light-on-icon');
    }
  }

  //       event handler: 이메일 키 다운 이벤트 처리 함수           //
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
    if(event.key !== 'Enter') return;
    if(!passwordRef.current) return;
    passwordRef.current.focus();    
  }

  //       event handler: 패스워드 키 다운 이벤트 처리 함수           //
  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
    if(event.key !== 'Enter') return;
    onSignInButtonClickHandler();
  }

  //          render: sign in card 컴포넌트             //
  return (
    <div className='auth-card'>
      <div className='auth-card-box'>
        <div className='auth-card-top'>
          <div className='auth-card-title-box'>
            <div className='auth-card-title'>{'로그인'}</div>
          </div> 
           {/* forwardref  */}
          <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} setValue={setEmail} onKeyDown={onEmailKeyDownHandler}/>
          <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} setValue={setPassword} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
        </div>
        <div className='auth-card-bottom'>
          <div className='auth-sign-in-error-box'>
            <div className='auth-sign-in-error-message'>
              {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n 입력하신 내용을 다시 확인해주세요.'}
            </div>
          </div>
          <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
          <div className='auth-description-box'>
            <div className='auth-description'>{'신규 사용자이신가요? '}<span className='auth-description-link'>{'회원가입'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

//          component: sign up card 컴포넌트             //
const SignUpCard = () =>{

  //          state: 이메일 요소 참조 상태             //
  const emailRef = useRef<HTMLInputElement | null>(null);
  //          state: 패스워드 요소 참조 상태             //
  const passwordRef = useRef<HTMLInputElement | null>(null);
  //          state: 패스워드 체크 요소 참조 상태             //
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);
  //          state: 페이지 번호 상태                   //
  const [page, setPage] = useState<1 | 2> (1);
  //          state: 이메일 상태                        //
  const [email, setEmail] = useState<string>('');
  //          state: 패스워드 상태                      //
  const [password, setPassword] = useState<string>('');
  //          state: 패스워드 확인 상태                  //
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  //          state: 패스워드 타입 상태                  //
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
  //          state: 패스워드 체크 타입 상태                  //
  const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');
  //          state: 이메일 에러 상태                  //
  const [isEmailError, setEmailError] = useState<boolean>(false);
  //          state: 패스워드 에러 상태                  //
  const [isPasswordError, setPasswordError] = useState<boolean>(false);
  //          state: 이메일 에러 메시지 상태                  //
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  //          state: 패스워드 에러 메시지 상태                  //
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  //          state: 이메일 에러 메시지 상태                  //
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
  //          state: 패스워드 버튼 아이콘 상태                  //
  const [passwordButtonIcon,setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
  //          state: 패스워드 확인 아이콘 상태                  //
  const [passwordCheckButtonIcon,setpasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
  
  
  //          event Handler: 이메일 변경 이벤트 처리          //
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);
  };
  //          event Handler: 패스워드 변경 이벤트 처리          //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value);
  };
  //          event Handler: 패스워드 확인 변경 이벤트 처리          //
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPasswordCheck(value);
  };
  //          event Handler: 패스워드 확인 변경 이벤트 처리          //
  const onPasswordButtonChangeHandler = () => {
    if(passwordButtonIcon === 'eye-light-off-icon'){
      setPasswordButtonIcon('eye-light-on-icon');
      setPasswordType('text');
    }
    else{
      setPasswordButtonIcon('eye-light-off-icon');
      setPasswordType('password');
    }
  };
  //          event Handler: 패스워드 확인 버튼 클릭 이벤트 처리          //
  const onPasswordCheckButtonChangeHandler = () => {
    if(passwordButtonIcon === 'eye-light-off-icon'){
      setPasswordButtonIcon('eye-light-on-icon');
      setPasswordType('text');
    }
    else{
      setPasswordButtonIcon('eye-light-off-icon');
      setPasswordType('password');
    }
  };
  //          event Handler: 이메일 키 다운 이벤트 처리          //
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
    if(event.key !== 'Enter') return;
    if(!passwordRef.current) return;
    passwordRef.current.focus();
  }

  //          render: sign up card 컴포넌트             //
  return (
    <div className='auth-card'>
      <div className='auth-card-box'>
      <div className='auth-card-top'>
        <div className='auth-card-title-box'>
          <div className='auth-card-title'>{'회원가입'}</div>
          <div className='auth-card-page'>{`${page}/2`}</div>
        </div>
        <InputBox ref={emailRef} type='text' label='이메일 주소*' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} /> 
        <InputBox ref={passwordRef} type={passwordType} label='비밀번호*' placeholder='비밀번호를 입력해주세요.' value={password}  onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} /> 
        <InputBox ref={passwordCheckRef} type={passwordCheckType} label='비밀번호 확인*' placeholder='비밀번호를 다시 입력해주세요.' value={passwordCheck} onChange={onPasswordCheckChangeHandler} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} /> 
      </div>
      <div className='auth-card-bottom'>
        <div className='black-large-full-button'>{'다음 단계'}</div>
        <div className='auth-description-box'>
          <div className='auth-description'>{'이미 계정이 있으신가요?'}<span className='auth-description-link'>{'로그인'}</span></div>
        </div>
      </div>
      </div>
    </div>
  );
};

//          render: 인증 화면 컴포넌트 렌더링           //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotro-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
              <div className='auth-jumbotron-text'>{'이상준 입니다.'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard/>}
        {view === 'sign-up' && <SignUpCard/>}
      </div>
    </div>
  )
}
