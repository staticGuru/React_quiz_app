export default [
    {
        question: 'We can go for keys when there is possibility that our user could change the data?',
        answers: [
            'Keys',
            'Ref',
            'Both',
            'None of above'
        ],
        correct: 1,
        optionType:'word',
        answerType:'single',
        selectedAnswer:'',
        id:1
    },

    {
        question: 'Which is heavy?',
        answers: [
            'https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
            'https://images.unsplash.com/photo-1624719507903-7d8b41c7c9cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            'https://images.unsplash.com/photo-1561130294-5b4154683c41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1543285198-3af15c4592ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
        ],
        correct: 3,
        optionType:'image',
        answerType:'single',
        selectedAnswer:'',
        id:2
    },    
    {
        question: 'which is the useState array destructuring?',
        answers: [
            'setState()',
            'state()', 
            'getState()', 
            'None of the Above'
        ],    
        correct: [1,2],
        optionType:'Multiple Choice Questionnaires',
        answerType:'multiple',
        // optionType:'word',
        // answerType:'single',
        selectedAnswer:'',
        id:3
    },    
    {
        question: 'Arbitrary inputs of components are called?',
        answers: [
            'Keys',
            'Props', 
            'Elements', 
            'Ref'
        ],    
        correct: 2,
        optionType:'word',
        answerType:'single',
        selectedAnswer:'',
        id:4
    },
    {
        question: '_____ can be done while more than one element needs to be returned from a component?',
        answers: [
            'Abstraction',
            'Packing', 
            'Insulation', 
            'Wrapping'
        ],    
        correct: 4,
        optionType:'word',
        answerType:'single',
        selectedAnswer:'',
        id:5
    },
    {
        question: 'Which of the following needs to be updated to achieve dynamic UI updates?',
        answers: [
            'State',
            'Props', 
            'Components', 
            'None of the Above'
        ],    
        correct: 1,
        optionType:'word',
        answerType:'single',
        selectedAnswer:'',
        id:6
    },
    {
        question: 'What\'s your main reason for your score? Please be 100% honest: we need your feedback really to improve Hotjar.',
        answers: [
            'To keep track of event history',
            'To enhance components', 
            'Free up resources', 
            'None of the Above'
        ],    
        correct: 'I love react',
        optionType:'Open Ended Questionnaires',
        answerType:'single',
        selectedAnswer:'',
        id:7
    }
]