import { useState } from 'react';

const useToggleWatchLater = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleWatchLater = async (videoId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://adros-mrashed.runasp.net/api/Video/${videoId}/watchlater`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('Token')}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('فشل في تحديث حالة المشاهدة لاحقاً');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            console.error('Error toggling watch later:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        toggleWatchLater,
        isLoading,
        error
    };
};

export default useToggleWatchLater;