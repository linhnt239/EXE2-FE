import React, { useEffect, useState } from 'react';

import { usePWAInstall } from 'react-use-pwa-install';

function PWAButton() {
    const install = usePWAInstall();

    return (
        <>
            {/* {install && ( */}
            <button onClick={install} className="bg-red-400 p-4">
                Install App
            </button>
            {/* )} */}
        </>
    );
}

export default PWAButton;
