import { useParams } from "react-router-dom";


const VerifyMail2 = () => {
    const { token } = useParams();

    return (
        <div>
            <h1>VerifyMail `${token}`</h1>

        </div>
    );
};


export default VerifyMail2;