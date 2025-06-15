import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';


export const handlers = [
    http.get('/api/questionnaire', () => {
        return HttpResponse.json({
            success: true,
            message: 'Questions retrieved successfully',
            data: {
                questions: [
                    {
                        question: 'What is your age?',
                        type: 'ChoiceType',
                        options: [
                            { display: 'Under 18', value: 'under_18', isRejection: true },
                            { display: '18-25', value: '18_25', isRejection: false },
                            { display: '26-35', value: '26_35', isRejection: false },
                            { display: 'Over 35', value: 'over_35', isRejection: false },
                        ],
                    },
                    {
                        question: 'Do you have any medical conditions?',
                        type: 'ChoiceType',
                        options: [
                            { display: 'Yes', value: true, isRejection: true },
                            { display: 'No', value: false, isRejection: false },
                        ],
                    },
                    {
                        question: 'What is your fitness level?',
                        type: 'ChoiceType',
                        options: [
                            { display: 'Beginner', value: 'beginner', isRejection: false },
                            { display: 'Intermediate', value: 'intermediate', isRejection: false },
                            { display: 'Advanced', value: 'advanced', isRejection: false },
                        ],
                    },
                ],
            },
        })
    }),
    
    http.get('/undefined/api/questionnaire', () => {
        return HttpResponse.json({
            success: true,
            message: 'Questions retrieved successfully',
            data: {
                questions: [
                    {
                        question: 'What is your age?',
                        type: 'ChoiceType',
                        options: [
                            { display: 'Under 18', value: 'under_18', isRejection: true },
                            { display: '18-25', value: '18_25', isRejection: false },
                            { display: '26-35', value: '26_35', isRejection: false },
                            { display: 'Over 35', value: 'over_35', isRejection: false },
                        ],
                    },
                    {
                        question: 'Do you have any medical conditions?',
                        type: 'ChoiceType',
                        options: [
                            { display: 'Yes', value: true, isRejection: true },
                            { display: 'No', value: false, isRejection: false },
                        ],
                    },
                    {
                        question: 'What is your fitness level?',
                        type: 'ChoiceType',
                        options: [
                            { display: 'Beginner', value: 'beginner', isRejection: false },
                            { display: 'Intermediate', value: 'intermediate', isRejection: false },
                            { display: 'Advanced', value: 'advanced', isRejection: false },
                        ],
                    },
                ],
            },
        })
    }),
]

const server = setupServer(...handlers)
export { server }

