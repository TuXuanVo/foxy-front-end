import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContextType } from '../../types/context/user';
import { useAppDispatch } from '../../hooks/redux';
import Button from '../../components/Button';
import ArrowRightCircleIcon from '../../components/Icons/ArrowRightCircleIcon';
import ArrowLeft from '../../components/Icons/ArrowLeft';
import Title from '../../components/Home/Title';
import Key from '../../components/Icons/KeyIcon';
import Cookies from 'js-cookie';
import APP_PATH from '../../constant/appPath';
import { userVerifyOTP } from '../../redux/actions/userActions';
import { toastError } from '../../utils/toast';
import InputOTP from '../../components/Auth/InputOTP';
import { UserContext } from '../../context/userContext';

const OTP: NextPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const cookies = Cookies.get();
    const userEmail = cookies.userEmail;

    const [otp, setOtp] = useState('');

    const { phone } = useContext(UserContext) as UserContextType;

    const handleChangeOtp = (value: string) => {
        setOtp(value);
    };

    if (!phone && !userEmail) {
        router.push(APP_PATH.ROOT);
    }

    const handleSubmit = async () => {
        let body = {
            phone: phone || undefined,
            email: userEmail || undefined,
        };
        try {
            await dispatch(
                userVerifyOTP({
                    ...body,
                    otp,
                }),
            ).unwrap();

            Cookies.remove('userEmail');
            router.push(APP_PATH.SURF);
        } catch (error: any) {
            console.log(error);
            toastError(error.error);
        }
    };

    return (
        <>
            <section className="container bg-white">
                <div className="relative min-h-screen with-button">
                    <Title
                        className="mb-8"
                        content={
                            <button className="p-2" onClick={() => router.back()}>
                                <ArrowLeft />
                            </button>
                        }
                    />
                    <div className="space-y-6">
                        <div className="w-24 h-24 p-4 rounded-3xl image-container bg-neutral-5">
                            <Key />
                        </div>
                        <div>
                            <h4 className="mb-1">M?? x??c th???c</h4>
                            <p className="mb-6 text-caption-1 leading-caption-1 text-neutral-40">
                                Vui l??ng nh???p m?? OTP ???????c g???i v??? s??? ??i???n tho???i c???a b???n, ????? ho??n th??nh ????ng nh???p.
                            </p>
                            <InputOTP onChange={handleChangeOtp} />
                        </div>
                    </div>
                    <Button
                        className="absolute left-0 bottom-4"
                        title="Ti???p t???c"
                        Icon={<ArrowRightCircleIcon />}
                        block
                        onClick={handleSubmit}
                    />
                </div>
            </section>
        </>
    );
};

export default OTP;
