import React from 'react';

import { useSelector } from 'react-redux';

import { UserRoleIndex } from '../models/userRole';
import { RootState } from '../store';
import { UserState } from '../store/user';

export const useRole = (userRoleIndex: UserRoleIndex) => {
    const { role, isAuth } = useSelector<RootState, UserState>((state) => state.user);
    const [isAllowed, setIsAllowed] = React.useState(true);

    React.useEffect(() => {
        if (isAuth && userRoleIndex > (role?.index || 0)) {
            setIsAllowed(false);
        }
    }, [role, userRoleIndex, isAuth]);

    return [isAllowed];
};
