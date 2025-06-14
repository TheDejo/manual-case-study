import useSWR from 'swr';
import { constants } from '@/config/constants';
import { QuestionnaireResponse } from '@/utils/types';

const {
    API_ROUTES: { questionnaire },
} = constants;

const useGetQuestions = (
    shouldFetch: boolean = true
): {
    data?: QuestionnaireResponse;
    mutate: () => void;
    isLoading: boolean;
} => {
    const fetcher = async () => {
        try {
            const response = await fetch(questionnaire);
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            throw error;
        }
    };

    const { data, mutate, isLoading } = useSWR(shouldFetch ? [questionnaire] : null, fetcher);

    return {
        data,
        isLoading,
        mutate,
    };
};

export default useGetQuestions;
