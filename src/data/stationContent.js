// Comprehensive IT Scavenger Hunt Station Content
// Each station includes collaborative challenges and individual puzzles

export const stationContent = {
  hardware: {
    name: 'PC Assembly Challenge',
    description: 'Build a complete PC from components and discover hidden facts about computer hardware',
    icon: '🖥️',
    estimatedTime: 20,
    collaborative: [
      {
        id: 'hardware-collab-1',
        title: 'PC Component Assembly',
        description: 'Work together to assemble the PC components in the correct order. Look for random fact cards hidden around the workstation - you\'ll need at least 3 facts to proceed!',
        type: 'hands-on',
        materials: 'PC components: motherboard, CPU, RAM, hard drive, power supply, cables, screws',
        checkpoints: [
          'Install CPU into motherboard socket',
          'Insert RAM into correct slots',
          'Connect power supply to motherboard',
          'Connect hard drive with SATA cable',
          'Connect monitor cable',
          'Find 3 hidden fact cards around the station'
        ],
        hint: 'Ground yourself first! Look carefully around the station for fact cards.'
      },
      {
        id: 'hardware-collab-2',
        title: 'Power On Test',
        description: 'Once assembled, power on the desktop. If successful, scan the QR code that appears on screen to unlock individual questions.',
        type: 'validation',
        successCriteria: 'Desktop boots to desktop screen showing QR code',
        hint: 'If it doesn\'t power on, check all power connections and ensure RAM is properly seated.'
      }
    ],
    individual: [
      {
        id: 'hardware-ind-1',
        title: 'RAM Knowledge',
        question: 'What does RAM stand for?',
        type: 'dropdown',
        options: [
          'Random Access Memory',
          'Read Access Memory', 
          'Rapid Access Memory',
          'Remote Access Memory',
          'Real Access Memory',
          'Random Address Memory',
          'Read Address Memory'
        ],
        correct: 'Random Access Memory',
        hint: 'Think about how data is accessed - not sequentially, but...'
      },
      {
        id: 'hardware-ind-2', 
        title: 'Monitor Connection',
        question: 'What type of cable most commonly connects a desktop computer to a modern monitor?',
        type: 'dropdown',
        options: [
          'HDMI',
          'USB-C',
          'VGA',
          'DVI',
          'Ethernet',
          'DisplayPort',
          'Audio Jack',
          'Power Cable',
          'Thunderbolt'
        ],
        correct: 'HDMI',
        hint: 'Look at what cable you used to connect the monitor during assembly!'
      },
      {
        id: 'hardware-ind-3',
        title: 'Animal Components',
        question: 'Which computer component has an animal name?',
        type: 'dropdown', 
        options: [
          'Mouse',
          'RAM',
          'CPU',
          'Motherboard',
          'Hard Drive',
          'Power Supply',
          'Monitor',
          'Keyboard',
          'Graphics Card'
        ],
        correct: 'Mouse',
        hint: 'This input device scurries around your desk!'
      },
      {
        id: 'hardware-ind-4',
        title: 'Storage Sizes',
        question: 'Select 3 valid data storage size units:',
        type: 'multi-dropdown',
        options: [
          'Kilobyte',
          'Megabyte', 
          'Gigabyte',
          'Terabyte',
          'Nanobyte',
          'Decibyte',
          'Voltbyte',
          'Ampbyte',
          'Pixelbyte'
        ],
        correct: ['Kilobyte', 'Megabyte', 'Gigabyte', 'Terabyte'],
        requiredSelections: 3,
        hint: 'Think about the prefixes: kilo, mega, giga, tera...'
      },
      {
        id: 'hardware-ind-5',
        title: 'CPU Function',
        question: 'What is the primary function of the CPU (Central Processing Unit)?',
        type: 'dropdown',
        options: [
          'Execute instructions and perform calculations',
          'Store data permanently',
          'Display graphics on screen',
          'Provide power to components',
          'Connect to the internet',
          'Store temporary data',
          'Cool the computer',
          'Play audio sounds'
        ],
        correct: 'Execute instructions and perform calculations',
        hint: 'Think of the CPU as the "brain" of the computer - what does a brain do?'
      }
    ]
  },
  ai: {
    name: 'Artificial Intelligence',
    description: 'Explore machine learning concepts and AI applications in real-world scenarios',
    icon: '🤖',
    estimatedTime: 15,
    collaborative: [
      {
        id: 'ai-collab-1',
        title: 'AI Ethics Dilemma',
        description: 'A self-driving car must choose between hitting one person or five people. As a team, discuss and agree on what factors should influence this decision.',
        type: 'discussion',
        expectedOutcomes: ['Safety priority', 'Legal framework', 'Moral considerations', 'Technical limitations'],
        hint: 'Consider both utilitarian and deontological ethical frameworks'
      },
      {
        id: 'ai-collab-2',
        title: 'Chatbot Decision Tree',
        description: 'Design a simple decision tree for a customer service chatbot. Map out the first 3 levels of conversation flow.',
        type: 'design',
        materials: 'Whiteboard or paper provided',
        hint: 'Start with greeting, then branch into common customer needs'
      }
    ],
    individual: [
      {
        id: 'ai-ind-1',
        title: 'Machine Learning Classification',
        question: 'A spam filter that learns from examples of spam and non-spam emails uses which type of learning?',
        type: 'multiple-choice',
        options: [
          'Supervised Learning',
          'Unsupervised Learning', 
          'Reinforcement Learning',
          'Deep Learning'
        ],
        correct: 'Supervised Learning',
        hint: 'The key word is "examples" - the system learns from labeled data'
      },
      {
        id: 'ai-ind-2',
        title: 'Neural Network Basics',
        question: 'What is the minimum number of layers in a neural network?',
        type: 'multiple-choice',
        options: ['1', '2', '3', '4'],
        correct: '3',
        hint: 'Input layer, hidden layer, output layer - think of the basic structure'
      },
      {
        id: 'ai-ind-3',
        title: 'AI Application',
        question: 'Which company developed the GPT (Generative Pre-trained Transformer) language model?',
        type: 'text',
        correct: ['OpenAI', 'openai'],
        hint: 'This company was co-founded by Elon Musk and Sam Altman'
      }
    ]
  },

  web: {
    name: 'Web Development',
    description: 'Build and debug web applications using HTML, CSS, and JavaScript',
    icon: '🌐',
    estimatedTime: 18,
    collaborative: [
      {
        id: 'web-collab-1',
        title: 'Website Architecture Planning',
        description: 'You\'re building an e-commerce website. As a group, identify and prioritize the top 5 essential pages/features.',
        type: 'brainstorm',
        hint: 'Think about the user journey from discovery to purchase'
      },
      {
        id: 'web-collab-2',
        title: 'Responsive Design Challenge',
        description: 'Discuss and agree on how to make a website look good on both mobile phones and desktop computers.',
        type: 'discussion',
        hint: 'Consider screen sizes, touch interfaces, and performance'
      }
    ],
    individual: [
      {
        id: 'web-ind-1',
        title: 'HTML Debugging',
        question: 'Find the error in this HTML code:\\n\\n```html\\n<div>\\n  <h1>Welcome!</h1>\\n  <button onclick="alert(\'Hello\')>Click Me</button>\\n</div>\\n```',
        type: 'text',
        correct: ['missing closing quote', 'missing quote', 'quote', 'closing quote'],
        hint: 'Look carefully at the onclick attribute syntax'
      },
      {
        id: 'web-ind-2',
        title: 'CSS Selectors',
        question: 'Which CSS selector targets all paragraphs inside a div with class "content"?',
        type: 'multiple-choice',
        options: [
          '.content p',
          'div.content > p',
          '#content p',
          'p .content'
        ],
        correct: '.content p',
        hint: 'Think about descendant selectors - class selector followed by element'
      },
      {
        id: 'web-ind-3',
        title: 'JavaScript Fundamentals',
        question: 'What will this JavaScript code output?\\n\\nlet x = "5";\\nlet y = 3;\\nconsole.log(x + y);',
        type: 'text',
        correct: ['53', '"53"'],
        hint: 'JavaScript performs string concatenation when one operand is a string'
      }
    ]
  },

  security: {
    name: 'Cybersecurity',
    description: 'Identify vulnerabilities and protect systems from digital threats',
    icon: '🔒',
    estimatedTime: 20,
    collaborative: [
      {
        id: 'sec-collab-1',
        title: 'Incident Response Plan',
        description: 'A company discovers their customer database has been hacked. Create a 5-step incident response plan.',
        type: 'planning',
        hint: 'Think: Identify, Contain, Eradicate, Recover, Learn'
      },
      {
        id: 'sec-collab-2',
        title: 'Password Policy Design',
        description: 'Design a company password policy that balances security with usability. Agree on requirements.',
        type: 'policy',
        hint: 'Consider length, complexity, rotation, and user experience'
      }
    ],
    individual: [
      {
        id: 'sec-ind-1',
        title: 'Phishing Detection',
        question: 'Which of these email characteristics is the STRONGEST indicator of phishing?',
        type: 'multiple-choice',
        options: [
          'Urgent language ("Act now!")',
          'Misspelled domain (gmai1.com instead of gmail.com)',
          'Request for personal information',
          'Generic greeting ("Dear Customer")'
        ],
        correct: 'Misspelled domain (gmai1.com instead of gmail.com)',
        hint: 'Look for technical deception rather than social engineering tactics'
      },
      {
        id: 'sec-ind-2',
        title: 'Encryption Basics',
        question: 'What does HTTPS stand for?',
        type: 'text',
        correct: ['HyperText Transfer Protocol Secure', 'Hypertext Transfer Protocol Secure', 'hypertext transfer protocol secure'],
        hint: 'It\'s HTTP with an added security layer'
      },
      {
        id: 'sec-ind-3',
        title: 'Access Control',
        question: 'In cybersecurity, what does the principle of "least privilege" mean?',
        type: 'multiple-choice',
        options: [
          'Users should have minimum necessary access',
          'Passwords should be as short as possible',
          'Security software should run with minimal resources',
          'Only administrators should have network access'
        ],
        correct: 'Users should have minimum necessary access',
        hint: 'Think about limiting access to what\'s essential for the job'
      }
    ]
  },

  network: {
    name: 'Network Administration',
    description: 'Configure networks and troubleshoot connectivity issues',
    icon: '🌐',
    estimatedTime: 16,
    collaborative: [
      {
        id: 'net-collab-1',
        title: 'Network Topology Design',
        description: 'Design a network for a small office (20 computers, 1 server, WiFi). Draw the layout and justify your choices.',
        type: 'design',
        hint: 'Consider switches, routers, access points, and cable management'
      },
      {
        id: 'net-collab-2',
        title: 'Troubleshooting Strategy',
        description: 'Half the office can\'t access the internet. Create a step-by-step troubleshooting plan.',
        type: 'procedure',
        hint: 'Use the OSI model layers - start with physical, work up'
      }
    ],
    individual: [
      {
        id: 'net-ind-1',
        title: 'IP Address Classes',
        question: 'What class is the IP address 172.16.0.1?',
        type: 'multiple-choice',
        options: ['Class A', 'Class B', 'Class C', 'Class D'],
        correct: 'Class B',
        hint: 'Class B addresses start from 128.x.x.x to 191.x.x.x'
      },
      {
        id: 'net-ind-2',
        title: 'OSI Model',
        question: 'Which OSI layer is responsible for routing between networks?',
        type: 'multiple-choice',
        options: [
          'Layer 2 - Data Link',
          'Layer 3 - Network',
          'Layer 4 - Transport',
          'Layer 5 - Session'
        ],
        correct: 'Layer 3 - Network',
        hint: 'This is where routers operate and IP addresses are used'
      },
      {
        id: 'net-ind-3',
        title: 'Network Devices',
        question: 'What device operates at Layer 2 and learns MAC addresses?',
        type: 'text',
        correct: ['switch', 'Switch', 'network switch'],
        hint: 'This device creates collision domains and maintains a MAC address table'
      }
    ]
  },

  hardware: {
    name: 'Hardware Engineering',
    description: 'Understand computer components and system architecture',
    icon: '💻',
    estimatedTime: 14,
    collaborative: [
      {
        id: 'hw-collab-1',
        title: 'PC Build Planning',
        description: 'Plan a computer build for a gaming setup with a $1500 budget. Allocate budget percentages to each component.',
        type: 'budgeting',
        hint: 'Consider GPU (~40%), CPU (~25%), RAM (~10%), Storage (~15%), other (~10%)'
      },
      {
        id: 'hw-collab-2',
        title: 'Troubleshooting Hardware',
        description: 'A computer won\'t turn on. No lights, no fans. Create a diagnostic checklist.',
        type: 'diagnosis',
        hint: 'Start with power supply, check connections, test components systematically'
      }
    ],
    individual: [
      {
        id: 'hw-ind-1',
        title: 'Component Identification',
        question: 'Which component is primarily responsible for 3D graphics rendering?',
        type: 'multiple-choice',
        options: ['CPU', 'GPU', 'RAM', 'SSD'],
        correct: 'GPU',
        hint: 'This component has thousands of small cores for parallel processing'
      },
      {
        id: 'hw-ind-2',
        title: 'Memory Types',
        question: 'What does RAM stand for?',
        type: 'text',
        correct: ['Random Access Memory', 'random access memory'],
        hint: 'It\'s called "random" because you can access any location directly'
      },
      {
        id: 'hw-ind-3',
        title: 'Storage Technology',
        question: 'Which storage type is fastest?',
        type: 'multiple-choice',
        options: ['HDD', 'SATA SSD', 'NVMe SSD', 'Optical Drive'],
        correct: 'NVMe SSD',
        hint: 'This connects directly to the motherboard via PCIe lanes'
      }
    ]
  },

  support: {
    name: 'IT Support & Customer Service',
    description: 'Resolve technical issues and provide excellent customer service',
    icon: '🎧',
    estimatedTime: 12,
    collaborative: [
      {
        id: 'sup-collab-1',
        title: 'Difficult Customer Scenario',
        description: 'Role-play: An angry customer says their computer "doesn\'t work" but won\'t provide details. Develop a response strategy.',
        type: 'roleplay',
        hint: 'Use active listening, ask specific questions, stay calm and professional'
      },
      {
        id: 'sup-collab-2',
        title: 'Knowledge Base Creation',
        description: 'Create a troubleshooting guide for "Computer is running slowly". Include top 5 causes and solutions.',
        type: 'documentation',
        hint: 'Think about software, hardware, and user behavior factors'
      }
    ],
    individual: [
      {
        id: 'sup-ind-1',
        title: 'Customer Communication',
        question: 'When explaining a technical solution to a non-technical user, you should:',
        type: 'multiple-choice',
        options: [
          'Use as much technical jargon as possible',
          'Speak slowly and use simple analogies',
          'Assume they understand basic concepts',
          'Just tell them what buttons to click'
        ],
        correct: 'Speak slowly and use simple analogies',
        hint: 'Think about how to bridge the knowledge gap effectively'
      },
      {
        id: 'sup-ind-2',
        title: 'Ticket Prioritization',
        question: 'Which issue should be highest priority?',
        type: 'multiple-choice',
        options: [
          'CEO can\'t access email',
          'Printer is out of paper',
          'Server hosting company database is down',
          'One employee\'s mouse isn\'t working'
        ],
        correct: 'Server hosting company database is down',
        hint: 'Consider impact vs. urgency - how many people are affected?'
      },
      {
        id: 'sup-ind-3',
        title: 'Remote Support',
        question: 'What\'s the first step when providing remote technical support?',
        type: 'text',
        correct: ['verify the problem', 'understand the issue', 'ask questions', 'gather information'],
        hint: 'You need to fully understand the situation before attempting solutions'
      }
    ]
  },

  data: {
    name: 'Data Science & Analytics',
    description: 'Analyze data patterns and extract meaningful insights',
    icon: '📊',
    estimatedTime: 17,
    collaborative: [
      {
        id: 'data-collab-1',
        title: 'Data Analysis Challenge',
        description: 'You have sales data showing declining revenue. As a group, identify 5 potential data points to investigate.',
        type: 'analysis',
        hint: 'Consider time patterns, customer segments, product categories, geography, marketing'
      },
      {
        id: 'data-collab-2',
        title: 'Privacy vs Insights',
        description: 'Discuss how to analyze user behavior data while protecting customer privacy. Find the balance.',
        type: 'ethics',
        hint: 'Think about anonymization, aggregation, consent, and regulatory compliance'
      }
    ],
    individual: [
      {
        id: 'data-ind-1',
        title: 'Data Visualization',
        question: 'Which chart type is best for showing the relationship between two numerical variables?',
        type: 'multiple-choice',
        options: ['Pie Chart', 'Bar Chart', 'Scatter Plot', 'Line Chart'],
        correct: 'Scatter Plot',
        hint: 'Think about showing correlation between two continuous variables'
      },
      {
        id: 'data-ind-2',
        title: 'Statistical Concepts',
        question: 'What does a correlation coefficient of -0.8 indicate?',
        type: 'multiple-choice',
        options: [
          'Strong positive relationship',
          'Strong negative relationship',
          'Weak positive relationship',
          'No relationship'
        ],
        correct: 'Strong negative relationship',
        hint: 'The sign indicates direction, the magnitude indicates strength'
      },
      {
        id: 'data-ind-3',
        title: 'Database Query',
        question: 'In SQL, which command is used to retrieve data from a database?',
        type: 'text',
        correct: ['SELECT', 'select', 'Select'],
        hint: 'This is the most basic SQL command for querying data'
      }
    ]
  },

  actuarial: {
    name: 'Actuarial Science & Risk Analysis',
    description: 'Calculate risks and probabilities for insurance and financial planning',
    icon: '📈',
    estimatedTime: 19,
    collaborative: [
      {
        id: 'act-collab-1',
        title: 'Insurance Risk Assessment',
        description: 'Design car insurance risk factors. Rank these factors by importance: age, gender, location, driving record, car type.',
        type: 'ranking',
        hint: 'Consider statistical correlations with accident rates and claim costs'
      },
      {
        id: 'act-collab-2',
        title: 'Pandemic Risk Modeling',
        description: 'Discuss factors that would affect life insurance pricing during a pandemic. Identify top 5 variables.',
        type: 'modeling',
        hint: 'Think about mortality rates, age groups, health conditions, geography, behavior'
      }
    ],
    individual: [
      {
        id: 'act-ind-1',
        title: 'Probability Calculation',
        question: 'If the probability of rain today is 30% and tomorrow is 40%, what\'s the probability it rains both days? (Assume independence)',
        type: 'multiple-choice',
        options: ['70%', '35%', '12%', '10%'],
        correct: '12%',
        hint: 'For independent events, multiply the probabilities: 0.30 × 0.40'
      },
      {
        id: 'act-ind-2',
        title: 'Risk vs Return',
        question: 'An investment has 90% chance of 5% return and 10% chance of -20% return. What\'s the expected return?',
        type: 'text',
        correct: ['2.5%', '2.5', '0.025'],
        hint: 'Expected value = (0.90 × 5%) + (0.10 × -20%)'
      },
      {
        id: 'act-ind-3',
        title: 'Insurance Concepts',
        question: 'What is the deductible in an insurance policy?',
        type: 'multiple-choice',
        options: [
          'The monthly payment amount',
          'The amount you pay before insurance covers costs',
          'The maximum insurance will pay',
          'The percentage of costs you always pay'
        ],
        correct: 'The amount you pay before insurance covers costs',
        hint: 'This is your out-of-pocket expense before coverage kicks in'
      }
    ]
  }
}

// Utility functions for content management
export const getStationById = (stationId) => stationContent[stationId]

export const getAllStations = () => Object.keys(stationContent).map(id => ({
  id,
  ...stationContent[id]
}))

export const getCollaborativeChallenges = (stationId) => 
  stationContent[stationId]?.collaborative || []

export const getIndividualPuzzles = (stationId) => 
  stationContent[stationId]?.individual || []

export const calculateStationScore = (answers, stationId) => {
  const puzzles = getIndividualPuzzles(stationId)
  let correct = 0
  
  puzzles.forEach(puzzle => {
    const userAnswer = answers[puzzle.id]
    if (!userAnswer) return
    
    if (puzzle.type === 'multiple-choice') {
      if (userAnswer === puzzle.correct) correct++
    } else if (puzzle.type === 'text') {
      const correctAnswers = Array.isArray(puzzle.correct) ? puzzle.correct : [puzzle.correct]
      if (correctAnswers.some(answer => 
        userAnswer.toLowerCase().trim() === answer.toLowerCase().trim()
      )) {
        correct++
      }
    }
  })
  
  return Math.round((correct / puzzles.length) * 100)
}