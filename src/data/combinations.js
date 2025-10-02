// Best combinations of Engineering Tool + CRM (10 users)

export const combinations = [
  {
    id: 'plane-civicrm',
    rank: 1,
    badge: 'Recommended',
    name: 'Plane + CiviCRM',
    tagline: 'Fully Open Source Stack',
    engineering: 'Plane',
    crm: 'CiviCRM',
    cost: {
      monthly: [70, 150],
      annual: [840, 1800],
      breakdown: {
        engineering: 'Plane: $20-50/mo (self-hosted)',
        crm: 'CiviCRM: $50-100/mo (managed hosting)',
        total: '$70-150/mo'
      }
    },
    openSource: 'both',
    ratings: {
      overall: 5,
      engineering: 4,
      grants: 5,
      api: 5,
      cost: 5,
      maintenance: 3
    },
    pros: [
      'Fully open source (both tools)',
      'Linear-like UX for engineering',
      'Excellent APIs for Claude Code',
      'Purpose-built grant tracking (CiviCRM)',
      'Lowest cost ($840-1,800/year)',
      'Data sovereignty (self-hosted)',
      'Best alignment with OSS values'
    ],
    cons: [
      'DevOps burden (maintain two systems)',
      'Plane less polished than Linear',
      'Two APIs to integrate'
    ],
    bestFor: 'OSS advocates with DevOps capacity',
    vs: {
      linear: 'Saves $1,200-2,200/year, open source, but requires self-hosting',
      jira: 'Better UX, modern stack, but costs $240-600/year more'
    }
  },
  {
    id: 'jira-civicrm',
    rank: 2,
    badge: 'Best Value',
    name: 'Jira + CiviCRM',
    tagline: 'Potentially Free',
    engineering: 'Jira',
    crm: 'CiviCRM',
    cost: {
      monthly: [50, 100],
      annual: [600, 1200],
      breakdown: {
        engineering: 'Jira: $0 (if OSS license approved)',
        crm: 'CiviCRM: $50-100/mo',
        total: '$50-100/mo (or $77.50-180/mo if Jira not approved)'
      },
      ifNotApproved: {
        monthly: [127.50, 210],
        annual: [1530, 2520],
        note: 'Jira Standard: $7.75/user, Premium: $15.25/user'
      }
    },
    openSource: 'civicrm',
    requiresApproval: true,
    ratings: {
      overall: 4,
      engineering: 2,
      grants: 5,
      api: 4,
      cost: 5,
      maintenance: 4
    },
    pros: [
      'Potentially $0 for Jira (OSS license)',
      'Saves $1,500-2,700/year vs Linear',
      'Powerful JQL for complex queries',
      'Confluence included (documentation)',
      'Mature, enterprise-grade',
      'Handles complex grant workflows'
    ],
    cons: [
      'Jira notoriously slow for engineers',
      'JQL learning curve (1-2 weeks)',
      'Must apply and wait for OSS approval',
      'Complex setup (6-8 hours)'
    ],
    bestFor: 'Budget-conscious teams, if OSS approved',
    vs: {
      plane: 'Potentially cheaper ($0 vs $240-600/year for Plane infra), but much slower UX',
      linear: 'Saves $1,400-2,600/year, but slower and more complex'
    },
    actionRequired: 'Apply at https://www.atlassian.com/software/views/open-source-license-request'
  },
  {
    id: 'shortcut-civicrm',
    rank: 2.5,
    badge: 'Hidden Gem',
    name: 'Shortcut + CiviCRM',
    tagline: 'FREE Engineering Tool (10 users)',
    engineering: 'Shortcut',
    crm: 'CiviCRM',
    cost: {
      monthly: [50, 100],
      annual: [600, 1200],
      breakdown: {
        engineering: 'Shortcut: $0 (free for 10 users)',
        crm: 'CiviCRM: $50-100/mo',
        total: '$50-100/mo'
      }
    },
    openSource: 'civicrm',
    ratings: {
      overall: 4,
      engineering: 4,
      grants: 5,
      api: 4,
      cost: 5,
      maintenance: 4
    },
    pros: [
      'Shortcut FREE for 10 users!',
      'Faster than Jira, good GitHub integration',
      'Good API with date filtering',
      'Same cost as Jira option (just CiviCRM)',
      'No OSS approval needed',
      'Better docs than Linear'
    ],
    cons: [
      'Not as fast/polished as Linear',
      'Less well-known than other options',
      'Not open source'
    ],
    bestFor: 'Teams wanting free modern tool, exactly 10 users',
    vs: {
      jira: 'Same cost ($0 engineering tool), better UX, no approval needed',
      plane: 'No self-hosting needed, but not open source'
    },
    surprise: 'You have exactly 10 users - Shortcut is FREE for you!'
  },
  {
    id: 'linear-civicrm',
    rank: 3,
    badge: 'Premium',
    name: 'Linear + CiviCRM',
    tagline: 'Best Developer Experience',
    engineering: 'Linear',
    crm: 'CiviCRM',
    cost: {
      monthly: [130, 200],
      annual: [1560, 2400],
      breakdown: {
        engineering: 'Linear: $80-100/mo ($8-10/seat × 10)',
        crm: 'CiviCRM: $50-100/mo',
        total: '$130-200/mo'
      }
    },
    openSource: 'civicrm',
    ratings: {
      overall: 5,
      engineering: 5,
      grants: 5,
      api: 5,
      cost: 2,
      maintenance: 5
    },
    pros: [
      'Best engineering UX (5-10x faster than Jira)',
      'Best API (official TypeScript SDK)',
      'Seamless GitHub integration',
      'Zero maintenance (fully managed)',
      'Keyboard-driven workflow',
      'Most polished UI'
    ],
    cons: [
      'Most expensive ($1,560-2,400/year)',
      '$720-1,560/year more than Plane',
      'Proprietary (not open source)',
      'Vendor lock-in'
    ],
    bestFor: 'Teams valuing speed/UX, cost not primary concern',
    vs: {
      plane: 'Better polish and zero maintenance, but $720-1,560/year more',
      jira: '$960-2,400/year more, but 5-10x faster for daily use'
    },
    roi: 'If team saves 2-3 hours/month on faster workflows, pays for itself'
  },
  {
    id: 'github-civicrm',
    rank: 5,
    name: 'GitHub Projects + CiviCRM',
    tagline: 'Status Quo (Not Recommended)',
    engineering: 'GitHub Projects',
    crm: 'CiviCRM',
    cost: {
      monthly: [50, 100],
      annual: [600, 1200],
      breakdown: {
        engineering: 'GitHub Projects: $0',
        crm: 'CiviCRM: $50-100/mo',
        total: '$50-100/mo'
      }
    },
    openSource: 'civicrm',
    notRecommended: true,
    ratings: {
      overall: 2,
      engineering: 3,
      grants: 5,
      api: 2,
      cost: 5,
      maintenance: 5
    },
    pros: [
      'Cheapest option',
      'No migration needed',
      'Native GitHub integration'
    ],
    cons: [
      'Doesn\'t solve your core problem (API filtering)',
      'Complex client-side deadline queries',
      'Not recommended for your needs'
    ],
    bestFor: 'Only if staying put despite limitations',
    problem: 'This is what you have now - API can\'t filter by deadline'
  },
  {
    id: 'linear-notion',
    rank: 4,
    name: 'Linear + Notion',
    tagline: 'Before CiviCRM Discovery',
    engineering: 'Linear',
    crm: 'Notion',
    cost: {
      monthly: [160, 180],
      annual: [1920, 2160],
      breakdown: {
        engineering: 'Linear: $80-100/mo',
        crm: 'Notion: $80/mo ($8/seat × 10)',
        total: '$160-180/mo'
      }
    },
    openSource: 'none',
    ratings: {
      overall: 4,
      engineering: 5,
      grants: 4,
      api: 5,
      cost: 2,
      maintenance: 5
    },
    lessRelevant: true,
    why: 'CiviCRM better than Notion for grants (purpose-built)',
    pros: [
      'Best engineering UX (Linear)',
      'Great for documentation (Notion)',
      'Both have excellent APIs'
    ],
    cons: [
      'CiviCRM better for grants than Notion',
      'Expensive ($1,920-2,160/year)',
      'Notion not a real CRM',
      'Less relevant now'
    ]
  }
];

export const costComparison = {
  title: 'Annual Cost Comparison (10 users)',
  tools: [
    { name: 'Shortcut + CiviCRM', range: [600, 1200], note: 'Shortcut FREE for 10!' },
    { name: 'Jira + CiviCRM (OSS)', range: [600, 1200], note: 'If Jira OSS approved' },
    { name: 'Plane + CiviCRM', range: [840, 1800], note: 'Self-hosted Plane' },
    { name: 'GitHub + CiviCRM', range: [600, 1200], note: 'Not recommended (API)' },
    { name: 'Jira + CiviCRM (paid)', range: [1530, 2520], note: 'If OSS not approved' },
    { name: 'Linear + CiviCRM', range: [1560, 2400], note: 'Premium option' },
    { name: 'Monday + CiviCRM', range: [2040, 2880], note: 'Less relevant' },
    { name: 'Linear + Notion', range: [1920, 2160], note: 'Before CiviCRM' }
  ],
  savings: {
    planeVsLinear: [720, 1560],
    shortcutVsLinear: [960, 1800],
    jiraOSSVsLinear: [960, 1800]
  }
};

export const decisionTree = {
  question1: {
    q: 'Do you have DevOps capacity to self-host?',
    yes: {
      next: 'question2a'
    },
    no: {
      next: 'question2b'
    }
  },
  question2a: {
    q: 'Do you strongly value open source?',
    context: '(You have DevOps capacity)',
    yes: {
      result: 'Plane + CiviCRM',
      why: 'Fully OSS, Linear-like UX, low cost'
    },
    no: {
      next: 'question3'
    }
  },
  question2b: {
    q: 'Have you applied for Jira OSS license?',
    context: '(You don\'t want to self-host)',
    yes: {
      next: 'question4'
    },
    no: {
      action: 'Apply now (takes 10 min, potentially saves $1,560/year)',
      then: 'question4'
    }
  },
  question3: {
    q: 'Is speed/UX worth $720-1,560/year premium?',
    yes: {
      result: 'Linear + CiviCRM',
      why: 'Best UX, fully managed'
    },
    no: {
      result: 'Plane + CiviCRM',
      why: 'Still great UX, saves money'
    }
  },
  question4: {
    q: 'If Jira OSS approved, can you accept slower UX for free?',
    yes: {
      result: 'Jira + CiviCRM',
      why: 'Free saves $960-1,800/year'
    },
    no: {
      next: 'question5'
    }
  },
  question5: {
    q: 'Notice: Shortcut is FREE for 10 users. Try it?',
    yes: {
      result: 'Shortcut + CiviCRM',
      why: 'Free, fast, good API, no approval needed'
    },
    no: {
      result: 'Linear + CiviCRM',
      why: 'Premium experience worth the cost'
    }
  }
};

export const topRecommendations = [
  {
    rank: 1,
    combo: 'Plane + CiviCRM',
    cost: '$840-1,800/year',
    why: 'Best if: OSS values + have DevOps',
    quickWins: ['Fully open source', 'Linear-like UX', 'Lowest long-term cost']
  },
  {
    rank: 2,
    combo: 'Shortcut + CiviCRM',
    cost: '$600-1,200/year',
    why: 'Best if: Want free modern tool',
    quickWins: ['Shortcut FREE for 10 users!', 'No self-hosting', 'Good API'],
    surprise: '⭐ Hidden gem - you have exactly 10 users!'
  },
  {
    rank: 3,
    combo: 'Jira + CiviCRM',
    cost: '$600-1,200/year (if OSS)',
    why: 'Best if: OSS approved + budget critical',
    quickWins: ['Potentially free', 'Mature tools', 'Good APIs'],
    requirement: 'Must apply for OSS license'
  },
  {
    rank: 4,
    combo: 'Linear + CiviCRM',
    cost: '$1,560-2,400/year',
    why: 'Best if: Speed/UX is top priority',
    quickWins: ['Fastest UX', 'Best API', 'Zero maintenance']
  }
];

export const summaryMatrix = {
  headers: ['Option', 'Cost/Year', 'Engineering UX', 'API Quality', 'Open Source', 'DevOps', 'Recommended For'],
  rows: [
    ['Plane + CiviCRM', '$840-1,800', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '✅ Both', 'High', '🏆 OSS + DevOps capacity'],
    ['Shortcut + CiviCRM', '$600-1,200', '⭐⭐⭐⭐', '⭐⭐⭐⭐', '⚠️ CiviCRM only', 'None', '⭐ FREE for 10 users!'],
    ['Jira + CiviCRM (OSS)', '$600-1,200', '⭐⭐', '⭐⭐⭐⭐', '✅ Both', 'Low', 'Budget + OSS approved'],
    ['Linear + CiviCRM', '$1,560-2,400', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⚠️ CiviCRM only', 'None', 'Premium UX priority'],
    ['GitHub + CiviCRM', '$600-1,200', '⭐⭐⭐', '⭐⭐', '⚠️ CiviCRM only', 'None', '❌ Not recommended']
  ]
};

export const actionPlan = {
  immediate: [
    {
      action: 'Apply for Jira OSS license',
      time: '10 minutes',
      url: 'https://www.atlassian.com/software/views/open-source-license-request',
      why: 'No downside - potentially saves $1,560/year'
    },
    {
      action: 'Try Shortcut',
      time: '30 minutes',
      url: 'https://shortcut.com',
      why: 'FREE for 10 users - worth testing immediately'
    }
  ],
  week1: [
    {
      task: 'Trial Plane (Docker)',
      time: '2-3 hours',
      cmd: 'docker-compose up',
      evaluate: 'UX, speed, GitHub integration'
    },
    {
      task: 'Trial Linear',
      time: '1 hour',
      note: '14-day free trial',
      evaluate: 'Worth the premium?'
    },
    {
      task: 'Test Shortcut thoroughly',
      time: '2-4 hours',
      evaluate: 'Is free tier enough?'
    }
  ],
  week2: [
    {
      task: 'Build deadline query integration',
      details: 'Test API with each tool + CiviCRM',
      deliverable: 'Working Claude Code deadline aggregator'
    },
    {
      task: 'Get team feedback',
      who: 'Especially engineers',
      questions: ['Speed for daily triage?', 'GitHub integration quality?', 'Worth the cost?']
    }
  ],
  week3: [
    {
      task: 'Wait for Jira OSS decision'
    },
    {
      task: 'Compare total costs'
    },
    {
      task: 'Make final decision'
    }
  ],
  decision: {
    criteria: [
      'If OSS values + DevOps → Plane + CiviCRM',
      'If Jira OSS approved + budget matters → Jira + CiviCRM',
      'If speed/UX critical → Linear + CiviCRM',
      'If want easy free option → Shortcut + CiviCRM'
    ]
  }
};
