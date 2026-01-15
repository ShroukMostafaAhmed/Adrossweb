import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSubscriptionPlans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/api/Subscriptions/all');


            let plansData = response.data;

            if (response.data && response.data.data) {
                plansData = response.data.data;
            }

            if (Array.isArray(plansData)) {
                setPlans(plansData);
            } else if (plansData && typeof plansData === 'object') {
                setPlans([plansData]);
            } else {
               
                console.warn('API response is not an array:', plansData);
                setPlans([]);
            }

        } catch (err) {
            console.error('Error fetching subscription plans:', err);
            setError(err);
            setPlans([]); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return {
        plans,
        loading,
        error,
        refetch: fetchPlans

    };
}