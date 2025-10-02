// Project Management Tool Options for PolicyEngine

export const options = [
  {
    id: 'plane-civicrm',
    name: 'Plane + CiviCRM',
    recommended: true,
    tagline: 'Fully Open Source',
    cost: {
      annual: [840, 1800],
      monthly: [70, 150],
      breakdown: {
        plane: [20, 50],
        civicrm: [50, 100]
      }
    },
    openSource: 'both',
    engineeringRating: 4,
    nonTech: 5,
    apiQuality: 5,
    devOps: 'high',
    pros: [
      'Fully open source (both tools)',
      'Linear-like UX (fast, clean)',
      'Good APIs for Claude Code',
      'Data sovereignty (self-hosted)',
      'Low cost (saves $1,200-2,200/year vs Linear)',
      'Aligns with OSS values'
    ],
    cons: [
      'DevOps burden (manage two systems)',
      'Less polished than Linear (newer project)',
      'Two APIs to integrate'
    ],
    engineering: {
      tool: 'Plane',
      description: 'Self-hosted, Linear-like UX',
      github: 'https://github.com/makeplane/plane'
    },
    nonTechnical: {
      tool: 'CiviCRM',
      description: 'Grants, funders, papers'
    }
  },
  {
    id: 'jira-civicrm',
    name: 'Jira + CiviCRM',
    tagline: 'Best Value (if OSS approved)',
    cost: {
      annual: [600, 1200],
      monthly: [50, 100],
      breakdown: {
        jira: [0, 0],
        civicrm: [50, 100]
      },
      note: 'Jira free if OSS license approved'
    },
    openSource: 'both',
    engineeringRating: 2,
    nonTech: 5,
    apiQuality: 4,
    devOps: 'low',
    pros: [
      'Lowest cost (Jira free + cheap CiviCRM)',
      'Both APIs work for deadline queries',
      'Open source CRM',
      'Saves $1,500-2,000/year vs Linear + CiviCRM',
      'Mature, established tools'
    ],
    cons: [
      'Jira slow for engineering daily use',
      'JQL learning curve',
      'Need to apply for OSS license'
    ],
    engineering: {
      tool: 'Jira',
      description: 'If free OSS license',
      requiresApproval: true
    },
    nonTechnical: {
      tool: 'CiviCRM',
      description: 'Grants, funders, papers'
    }
  },
  {
    id: 'linear-civicrm',
    name: 'Linear + CiviCRM',
    tagline: 'Best UX (Proprietary)',
    cost: {
      annual: [2000, 3000],
      monthly: [170, 250],
      breakdown: {
        linear: [120, 150],
        civicrm: [50, 100]
      }
    },
    openSource: 'civicrm-only',
    engineeringRating: 5,
    nonTech: 5,
    apiQuality: 5,
    devOps: 'low',
    pros: [
      'Best engineering UX (fastest, most polished)',
      'Best API for Claude Code',
      'No self-hosting (fully managed)',
      'Clean separation (tech vs non-tech)'
    ],
    cons: [
      'Proprietary (not open source)',
      'Highest cost ($1,200-2,200/year more than Plane)',
      'Two APIs to integrate'
    ],
    engineering: {
      tool: 'Linear',
      description: 'Proprietary, best-in-class'
    },
    nonTechnical: {
      tool: 'CiviCRM',
      description: 'Grants, funders, papers'
    }
  },
  {
    id: 'github-civicrm',
    name: 'GitHub Projects + CiviCRM',
    tagline: 'Simplest (Weak API)',
    cost: {
      annual: [600, 1200],
      monthly: [50, 100],
      breakdown: {
        github: [0, 0],
        civicrm: [50, 100]
      }
    },
    openSource: 'civicrm-only',
    engineeringRating: 3,
    nonTech: 5,
    apiQuality: 2,
    devOps: 'none',
    notRecommended: true,
    pros: [
      'Lowest cost',
      'No migration (already on GitHub)',
      'CiviCRM solves non-tech needs'
    ],
    cons: [
      'GitHub API problem remains (can\'t filter deadlines)',
      'Doesn\'t solve your core issue (AI agent deadline queries)',
      'Not recommended'
    ],
    engineering: {
      tool: 'GitHub Projects',
      description: 'Free, already using'
    },
    nonTechnical: {
      tool: 'CiviCRM',
      description: 'Grants, funders, papers'
    }
  }
];

export const context = {
  currentProblem: 'GitHub Projects API can\'t efficiently filter by due date, limiting AI agent automation',
  useCase: {
    technical: [
      'Bug tracking across repos',
      'Feature requests',
      'Code-related tasks',
      'Fast developer triage',
      'GitHub integration (PRs, commits)',
      'API access for AI agents (check deadlines)'
    ],
    nonTechnical: [
      'Grant applications and tracking',
      'Paper submissions (journals, conferences)',
      'Financial reports',
      'Blog post planning',
      'Research project coordination',
      'Partnership tracking'
    ]
  },
  keyRequirement: 'CiviCRM (planned CRM) has built-in grant tracking, so focus on engineering tool selection'
};
