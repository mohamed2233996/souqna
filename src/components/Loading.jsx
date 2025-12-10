import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading = () => {
      const { t } = useTranslation();
    
    return (
        <div className='text-center'>
            <p className="font-bold text-xl  animate-bounce">{t("loading")}...</p>
        </div>
    );
}

export default Loading;
