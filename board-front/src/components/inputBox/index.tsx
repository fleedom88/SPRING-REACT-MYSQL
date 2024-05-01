import { ChangeEvent, KeyboardEvent, forwardRef } from 'react';
import './style.css';

//          interface: Input Box 컴포넌트 Properties    //
interface Props{
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;

    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon'; //필수가 아닌 선택인 요소
    onButtonClick?: () => void; 


    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//          component: Input Box 컴포넌트               //
const InputBox = forwardRef<HTMLInputElement, Props>((props:Props, ref) =>{ //useRef를 쓰기 위해 forwardRef를 사용함

//          state: properties                           //
    const {label, type, placeholder, value, error, icon, message} = props;
    const {onChange, onButtonClick, onKeyDown} = props;

//          event handler: input 키 이벤트 처리 함수           //
    const onKeyDownHandler=(event: KeyboardEvent<HTMLInputElement>)=>{
        if(!onKeyDown) return;
        onKeyDown(event);
    };


//          render: Input Box 컴포넌트                   //
    return(
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ?'inputbox-container-error': 'inputbox-container'}>
                {/* ref를 쓰는 이유는 엔터쳤을 때 다음요소로 넘어가기 위함 */}
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler}/>
                {onButtonClick !== undefined &&
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && (<div className={`icon ${icon}`}></div>) }
                    </div>
                }
            </div>
            {message !== undefined && <div className='inputbox-message'>{message}</div>}            
        </div>
    )
    
});

export default InputBox;