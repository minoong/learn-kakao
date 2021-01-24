import React, { useEffect } from 'react';
import { login } from '../../lib/api/auth';

const KakaoLogin = () => {
  useEffect(() => {
    const test = async () => {
      const res = await login();
      console.log(res);
    };

    test();
  }, []);
  return <div>kakao</div>;
};

export default KakaoLogin;
