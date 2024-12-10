import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ENVIROMENT from '../../enviroment'
import { GET, getUnnauthenticatedHeaders } from '../fetching/http.fetching'
const EmailVerify = () => {

    const {verificationToken} = useParams()
    const [statusMessage, setStatusMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const verifyEmail = async () => {
        try {
            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/auth/verify/${verificationToken}`, {
                headers: getUnnauthenticatedHeaders()
            })
            if (!response.ok) {
                setStatusMessage(response.payload.detail)
                console.error(response.payload.detail || 'Error Verifying Email')
            }else{
                setStatusMessage(response.payload.detail)
            }
        }
        catch (error) {
            console.error(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(
        () => {
            if (verificationToken) {
                verifyEmail()
            }
        }, [verificationToken])

    return (
        <div className='authPage'>
            <div className='whatsAppAuthPage'>
                <img className='whatsAppAuthinIcon' src="/images/whatsApp.png" alt="whatsApp" />
            </div>
            <div className='authForm'>
            <h2 className='authTitle'>Email Verification</h2>
            {
                isLoading
                    ?
                    <span className='statusMessage'>Loading...</span>
                    :
                    <div className='verifyEmailFooter'>
                        <span className='statusMessage'>{statusMessage}</span>
                        <span className='goToLogin'>Please go to <Link to={'/login'}>Login</Link> </span>
                    </div>
            }
            </div>
            
        </div>
    )
}

export default EmailVerify