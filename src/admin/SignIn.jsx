import React, { useEffect, useState } from 'react';

const SignInButton = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const allowedPhoneNumber = '8755163576';

    useEffect(() => {
        // Create and load the external script
        const script = document.createElement('script');
        script.src = "https://www.phone.email/sign_in_button_v1.js";
        script.async = true;
        script.onload = () => {
            console.log('Sign-in button script loaded successfully');
        };
        script.onerror = () => {
            console.error('Failed to load the sign-in button script');
        };
        document.querySelector('.pe_signin_button').appendChild(script);

        // Define the phoneEmailListener function to handle the phone verification result
        window.phoneEmailListener = function(userObj) {
            console.log("Received user object:", userObj); // Debugging

            const verifiedPhoneNumber = userObj.phone_number; // Adjust based on actual property

            console.log("Verified phone number:", verifiedPhoneNumber); // Debugging

            // Check if the verified phone number matches the allowed number
            if (verifiedPhoneNumber === allowedPhoneNumber) {
                setIsAuthorized(true);
                document.querySelector('.pe_signin_button').innerHTML = `<span>Phone Verification Successful! You are authorized to access this application.</span>`;
            } else {
                document.querySelector('.pe_signin_button').innerHTML = `<span>Verification failed. The phone number ${verifiedPhoneNumber} is not authorized to access this application.</span>`;
            }
        };

        // Cleanup function to remove the listener and script when the component unmounts
        return () => {
            window.phoneEmailListener = null;
            const script = document.querySelector('script[src="https://www.phone.email/sign_in_button_v1.js"]');
            if (script) {
                script.remove();
            }
        };
    }, []);

    return (
        <div className="pe_signin_button" data-client-id="13588479213508315677"></div>
    );
};

export default SignInButton;
