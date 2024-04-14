import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../../services/Auth/auth_slice';

const LangButton = () => {
    const dispatch = useDispatch()
    const {currentLanguage, setCurrentLanguage} = useSelector(state => state.auth.language);

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'am' : 'en';
        setCurrentLanguage(newLanguage);
        dispatch(setLanguage(newLanguage));
    }
    return (
        <div>
            <button onClick={toggleLanguage}>
                {currentLanguage === 'en' ? 'English' : 'Amharic'}
            </button>
        </div>
    )
}

export default LangButton