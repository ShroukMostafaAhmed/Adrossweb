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

            // If response has a data property, use that
            if (response.data && response.data.data) {
                plansData = response.data.data;
            }

            // Ensure we have an array
            if (Array.isArray(plansData)) {
                setPlans(plansData);
            } else if (plansData && typeof plansData === 'object') {
                // If it's a single object, wrap it in an array
                setPlans([plansData]);
            } else {
                // If no valid data, set empty array
                console.warn('API response is not an array:', plansData);
                setPlans([]);
            }

        } catch (err) {
            console.error('Error fetching subscription plans:', err);
            setError(err);
            setPlans([]); // Set empty array on error
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