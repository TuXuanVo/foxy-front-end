import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import mapApi from '../apis/mapApi';
import Navbar from '../components/Navbar';
import NavbarLayout from '../components/NavbarLayout';
import { useAppDispatch } from '../hooks/redux';
import { userFindFriendsAround, userUpdateLocation } from '../redux/actions/userActions';
import { selectUser } from '../redux/reducers/userSlice';
import { NextPageWithLayout } from '../types/global';
import { toastError } from '../utils/toast';
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const MapContainer: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();
    const sUser = useSelector(selectUser);
    const [isFocus, setIsFocus] = useState(false);
    const [friends, setFriends] = useState<IStranger[] | any>([]);

    const handlePermission = async () => {
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(async function (position) {
                    try {
                        await dispatch(
                            userUpdateLocation({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            }),
                        );
                        setFriends(await dispatch(userFindFriendsAround()).unwrap());
                    } catch (error: any) {
                        toastError(error.error);
                    }
                });
            } else {
                toastError('Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh');
            }
        });
    };

    function initGeolocation() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            toastError('Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh');
        }
    }

    const errorCallback = () => {};

    const successCallback = async (position: any) => {
        await dispatch(
            userUpdateLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }),
        );
        setFriends(await dispatch(userFindFriendsAround()).unwrap());
    };

    const handleFocus = () => {
        setIsFocus((pre) => !pre);
    };

    useEffect(() => {
        initGeolocation();
        return () => {
            setFriends([]);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Map
                me={sUser.data?.lastLocation || undefined}
                isFocus={isFocus}
                handleFocus={handleFocus}
                friends={friends}
                setFriends={setFriends}
            />
        </>
    );
};
MapContainer.protected = true;
MapContainer.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>;
export default MapContainer;
