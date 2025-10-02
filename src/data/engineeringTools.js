// Engineering/Issue Tracking Tools for PolicyEngine (10 seats)

export const engineeringTools = [
  {
    id: 'plane',
    name: 'Plane',
    tagline: 'Open Source Linear Clone',
    recommended: true,
    cost: {
      monthly: [20, 50],
      annual: [240, 600],
      selfHosted: [20, 50],
      cloud: 80,
      breakdown: 'Self-hosted: $20-50/mo infrastructure, Cloud: $8/seat × 10 = $80/mo',
      free: 'Free (5 users on cloud)'
    },
    openSource: true,
    license: 'AGPL-3.0',
    github: 'https://github.com/makeplane/plane',
    stars: '20k+',
    ratings: {
      speed: 4,
      githubIntegration: 4,
      apiQuality: 4,
      deadlineAPI: 5,
      developerUX: 4,
      cost: 5,
      maintenance: 2
    },
    features: [
      'Linear-like UI (keyboard-driven)',
      'Issues, projects, cycles',
      'GitHub bi-directional sync',
      'Multiple views (List, Kanban, Calendar)',
      'Custom properties',
      'API with date filtering',
      'Self-hosted or cloud'
    ],
    pros: [
      'Open source (MIT license)',
      'Nearly identical UX to Linear',
      'Supports server-side date filtering in API',
      'Much cheaper than Linear ($20-50 vs $80-100/mo)',
      'Active development (20k+ GitHub stars)',
      'Data sovereignty if self-hosted',
      'Good GitHub integration'
    ],
    cons: [
      'Requires self-hosting (DevOps burden)',
      'Less polished than Linear (newer)',
      'Smaller ecosystem',
      'May have bugs',
      'Need to maintain server'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Query issues with upcoming deadlines',
      code: `// REST API with date filtering
const response = await fetch(
  'https://plane.policyengine.org/api/v1/workspaces/pe/projects/eng/issues/',
  {
    headers: { 'X-Api-Key': process.env.PLANE_API_KEY },
    params: {
      target_date__gte: '2025-10-02',
      target_date__lte: '2025-10-09',
      state__group__in: 'started,unstarted'
    }
  }
);

const issues = await response.json();
// Returns only matching issues - server-filtered!`
    },
    deployment: 'docker-compose up (easiest) or Kubernetes',
    bestFor: ['OSS advocates with DevOps capacity', 'Want Linear UX at lower cost', 'Data sovereignty priority']
  },
  {
    id: 'linear',
    name: 'Linear',
    tagline: 'Best-in-Class Developer Tool',
    cost: {
      monthly: [80, 100],
      annual: [960, 1200],
      breakdown: '$8-10/seat × 10 users',
      trial: '14-day free trial'
    },
    openSource: false,
    ratings: {
      speed: 5,
      githubIntegration: 5,
      apiQuality: 5,
      deadlineAPI: 5,
      developerUX: 5,
      cost: 3,
      maintenance: 5
    },
    features: [
      'Fastest issue tracker (instant search)',
      'Keyboard-first workflow (Cmd+K)',
      'Seamless GitHub integration',
      'GraphQL API',
      'Official TypeScript SDK',
      'Cycles (sprints)',
      'Roadmaps',
      'Beautiful, minimal UI'
    ],
    pros: [
      'Best developer experience (5-10x faster than Jira)',
      'Cleanest API for deadline queries',
      'Official TypeScript SDK (@linear/sdk)',
      'Seamless GitHub integration (native)',
      'Zero maintenance (fully managed)',
      'Keyboard shortcuts for everything',
      'Industry standard for fast-moving teams'
    ],
    cons: [
      'Proprietary (not open source)',
        'Most expensive option ($960-1,200/year)',
      'Vendor lock-in',
      'Limited custom fields (compared to Jira)',
      'No long-form documentation (compared to Confluence)'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Query deadlines with GraphQL',
      code: `import { LinearClient } from '@linear/sdk';

const linear = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });

// Query upcoming deadlines - clean and simple
const issues = await linear.issues({
  filter: {
    dueDate: {
      gte: "2025-10-02",
      lte: "2025-10-09"
    },
    state: { type: { nin: ["completed", "canceled"] } }
  },
  orderBy: 'dueDate'
});

// Full TypeScript autocomplete and type safety
issues.nodes.forEach(issue => {
  console.log(\`\${issue.title} due \${issue.dueDate}\`);
});`
    },
    bestFor: ['Teams valuing speed and UX', 'Cost not primary concern', 'Want best-in-class tools']
  },
  {
    id: 'jira',
    name: 'Jira Software',
    tagline: 'Enterprise Standard',
    cost: {
      monthly: [0, 160],
      annual: [0, 1920],
      breakdown: 'Free if OSS approved, else $7.75-16/seat × 10 users',
      free: 'Free for open source projects (if approved)'
    },
    openSource: false,
    ossProgram: true,
    ratings: {
      speed: 2,
      githubIntegration: 3,
      apiQuality: 4,
      deadlineAPI: 4,
      developerUX: 2,
      cost: 5,
      maintenance: 4
    },
    features: [
      'Full Scrum/Kanban',
      'Advanced workflows',
      'JQL (powerful query language)',
      'Extensive reporting',
      'Confluence integration',
      'Time tracking',
      'Custom fields unlimited'
    ],
    pros: [
      'Free for open source projects (if approved)',
      'Powerful JQL for deadline queries',
      'Handles complex workflows',
      'Advanced reporting',
      'Confluence for documentation',
      'Mature, stable, enterprise-grade'
    ],
    cons: [
      'Notoriously slow UI (engineers hate it)',
      'JQL learning curve (1-2 weeks)',
      'Complex setup (6-8 hours)',
      'Overwhelming feature set',
      'Must apply for OSS license'
    ],
    apiExample: {
      language: 'javascript',
      title: 'JQL deadline queries',
      code: `const jiraClient = require('jira-client');
const jira = new jiraClient({
  protocol: 'https',
  host: 'policyengine.atlassian.net',
  username: process.env.JIRA_EMAIL,
  password: process.env.JIRA_API_TOKEN
});

// Query via JQL - powerful but requires learning JQL
const issues = await jira.searchJira(
  'duedate >= now() AND duedate <= endOfWeek() AND status != Done ORDER BY duedate ASC',
  {
    fields: ['summary', 'duedate', 'assignee', 'priority'],
    maxResults: 50
  }
);`
    },
    ossApplication: 'https://www.atlassian.com/software/views/open-source-license-request',
    bestFor: ['If OSS license approved (free)', 'Complex workflows needed', 'Cost most important']
  },
  {
    id: 'github-projects',
    name: 'GitHub Projects',
    tagline: 'Native GitHub Solution',
    cost: {
      monthly: 0,
      annual: 0,
      breakdown: 'Free for public repos'
    },
    openSource: false,
    ratings: {
      speed: 3,
      githubIntegration: 5,
      apiQuality: 2,
      deadlineAPI: 1,
      developerUX: 3,
      cost: 5,
      maintenance: 5
    },
    currentlyUsing: true,
    features: [
      'Native GitHub integration',
      'Project boards',
      'Custom fields',
      'Automation workflows',
      'Roadmap view',
      'Cross-repo boards'
    ],
    pros: [
      'Already using (zero migration)',
      'Free forever',
      'Native GitHub experience',
      'No context switching',
      'Simple setup',
      'GitHub Actions integration'
    ],
    cons: [
      'Cannot filter by due date in API (YOUR CORE PROBLEM)',
      'Must fetch all items then filter client-side',
      'Complex nested GraphQL structure',
      'No sprints/cycles',
      'Basic reporting',
      'Slower than Linear'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Complex API with no date filtering',
      code: `// GitHub Projects v2 - Cannot filter by date!
query {
  organization(login: "PolicyEngine") {
    projectV2(number: 1) {
      items(first: 100) {  // Must fetch ALL
        nodes {
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldDateValue {
                date  // Then filter client-side
              }
            }
          }
        }
      }
    }
  }
}

// Requires 50+ lines of client-side date filtering`
    },
    problem: 'This is your current pain point - why you\'re looking to migrate',
    bestFor: ['If API limitations acceptable', 'Want simplest solution', 'Budget critical']
  },
  {
    id: 'monday',
    name: 'Monday.com',
    tagline: 'Visual Project Management',
    cost: {
      monthly: [120, 190],
      annual: [1440, 2280],
      breakdown: 'Standard $12/seat × 10, Pro $19/seat × 10',
      minimum: 'Basic $9/seat (3-seat minimum)'
    },
    openSource: false,
    previouslyTried: true,
    ratings: {
      speed: 2,
      githubIntegration: 2,
      apiQuality: 4,
      deadlineAPI: 4,
      developerUX: 2,
      cost: 3,
      maintenance: 4
    },
    features: [
      'Highly visual (Kanban, Gantt, Timeline)',
      'Powerful automations',
      'GraphQL API',
      'Multiple views',
      'Budget tracking',
      'Dashboards'
    ],
    pros: [
      'Great for non-technical stakeholders',
      'GraphQL API with date filtering',
      'Beautiful visual workflows',
      'Powerful automations',
      'Good for mixed teams'
    ],
    cons: [
      'You already tried this and stopped (why?)',
      'Not built for developers (slow for engineering)',
      'Weak GitHub integration (third-party)',
      'Expensive ($120-190/mo)',
      'Overwhelming features'
    ],
    apiExample: {
      language: 'javascript',
      title: 'GraphQL deadline queries',
      code: `const mondayClient = require('monday-sdk-js')();

const query = \`query {
  boards(ids: [\${boardId}]) {
    items(query_params: {
      rules: [{
        column_id: "deadline",
        compare_value: ["\${today}", "\${nextWeek}"],
        operator: between
      }]
    }) {
      name
      column_values(ids: ["deadline", "person", "status"]) {
        text
      }
    }
  }
}\`;

const response = await mondayClient.api(query);`
    },
    question: 'Why did you stop using Monday.com before?',
    bestFor: ['Visual teams', 'Non-technical stakeholders important', 'If you liked it before']
  },
  {
    id: 'shortcut',
    name: 'Shortcut',
    tagline: 'Balanced Option',
    cost: {
      monthly: [85, 120],
      annual: [1020, 1440],
      breakdown: '$8.50/seat (Team), $12/seat (Business)',
      free: 'Free up to 10 users!'
    },
    openSource: false,
    ratings: {
      speed: 4,
      githubIntegration: 4,
      apiQuality: 4,
      deadlineAPI: 4,
      developerUX: 4,
      cost: 5,
      maintenance: 4
    },
    features: [
      'Faster than Jira',
      'Good GitHub integration',
      'Iterations (sprints)',
      'Built-in docs',
      'Stories + Epics'
    ],
    pros: [
      'Free for up to 10 users!',
      'Good balance of speed and features',
      'Better docs than Linear',
      'Good GitHub integration',
      'Faster than Jira'
    ],
    cons: [
      'Not as fast as Linear',
      'Less keyboard-driven',
      'Smaller ecosystem',
      'No clear advantage over Plane or Linear'
    ],
    apiExample: {
      language: 'javascript',
      title: 'REST API deadline queries',
      code: `const stories = await fetch(
  'https://api.app.shortcut.com/api/v3/search/stories',
  {
    method: 'POST',
    headers: {
      'Shortcut-Token': process.env.SHORTCUT_TOKEN
    },
    body: JSON.stringify({
      query: 'deadline:<=2025-10-09 !is:done',
      page_size: 25
    })
  }
);`
    },
    bestFor: ['Exactly 10 users (free!)', 'Want balance of features and speed'],
    hiddenGem: 'FREE for your team size (10 users)!'
  },
  {
    id: 'notion',
    name: 'Notion',
    tagline: 'Docs + Tasks',
    cost: {
      monthly: 80,
      annual: 960,
      breakdown: '$8/seat × 10 users'
    },
    openSource: false,
    ratings: {
      speed: 3,
      githubIntegration: 2,
      apiQuality: 4,
      deadlineAPI: 4,
      developerUX: 3,
      cost: 4,
      maintenance: 5
    },
    features: [
      'All-in-one workspace',
      'Excellent for documentation',
      'Flexible databases',
      'Great for writing',
      'Templates'
    ],
    pros: [
      'Best for documentation and writing',
      'Flexible databases (can track anything)',
      'Good API with date filtering',
      'Familiar to many users',
      'All-in-one (docs + tasks)'
    ],
    cons: [
      'Not optimized for bug tracking',
      'Slower than Linear for triage',
      'Weak GitHub integration',
      'Can get messy'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Database queries',
      code: `const tasks = await notion.databases.query({
  database_id: bugsDbId,
  filter: {
    property: 'Due Date',
    date: { next_week: {} }
  },
  sorts: [{ property: 'Due Date', direction: 'ascending' }]
});`
    },
    bestFor: ['Need docs + tasks together', 'Lighter engineering needs', 'Great for policy research']
  },
  {
    id: 'asana',
    name: 'Asana',
    tagline: 'Traditional PM',
    cost: {
      monthly: 110,
      annual: 1320,
      breakdown: 'Premium $10.99/seat × 10',
      free: 'Free tier (limited)'
    },
    openSource: false,
    ratings: {
      speed: 2,
      githubIntegration: 2,
      apiQuality: 3,
      deadlineAPI: 2,
      developerUX: 2,
      cost: 3,
      maintenance: 4
    },
    features: [
      'Tasks and subtasks',
      'Multiple views',
      'Templates',
      'Goals and OKRs',
      'Workload management'
    ],
    pros: [
      'Widely used, familiar',
      'Good for project management',
      'Templates for workflows',
      'Portfolio view'
    ],
    cons: [
      'API requires client-side date filtering',
      'Not built for developers',
      'Weak GitHub integration',
      'Slower than Linear/Plane',
      'Not optimized for either technical or research work'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Limited date filtering',
      code: `// Must fetch all then filter client-side
const tasks = await client.tasks.findAll({
  workspace: workspaceId,
  completed_since: 'now',
  opt_fields: 'name,due_on,assignee'
});

// Filter by date client-side - API doesn't support!
const upcoming = tasks.data.filter(task => {
  if (!task.due_on) return false;
  const days = daysBetween(new Date(), new Date(task.due_on));
  return days >= 0 && days <= 7;
});`
    },
    bestFor: ['Teams already comfortable with Asana', 'Lighter automation needs']
  }
];

export const apiDetailedComparison = {
  query: 'Show all issues due in the next 7 days, ordered by priority',
  results: [
    {
      tool: 'Linear',
      linesOfCode: '5-10',
      serverFiltering: true,
      complexity: 'Low',
      rating: 5,
      code: `const issues = await linear.issues({
  filter: {
    dueDate: { gte: today, lte: addDays(today, 7) }
  },
  orderBy: 'priority'
});`
    },
    {
      tool: 'Plane',
      linesOfCode: '10-15',
      serverFiltering: true,
      complexity: 'Low',
      rating: 4,
      code: `const issues = await fetch('plane.../issues/', {
  params: {
    target_date__gte: today,
    target_date__lte: nextWeek
  }
});`
    },
    {
      tool: 'Jira',
      linesOfCode: '15-20',
      serverFiltering: true,
      complexity: 'Medium (JQL)',
      rating: 4,
      code: `const issues = await jira.searchJira(
  'duedate >= now() AND duedate <= 7d ORDER BY priority DESC',
  { fields: ['summary', 'duedate', 'priority'] }
);`
    },
    {
      tool: 'Monday.com',
      linesOfCode: '20-30',
      serverFiltering: true,
      complexity: 'Medium',
      rating: 4,
      code: `// Need to know board IDs and column IDs
const query = \`query {
  boards(ids: [\${boardId}]) {
    items(query_params: {
      rules: [{
        column_id: "deadline",
        operator: between,
        compare_value: ["\${today}", "\${nextWeek}"]
      }]
    }) { ... }
  }
}\`;`
    },
    {
      tool: 'Notion',
      linesOfCode: '30-40',
      serverFiltering: true,
      complexity: 'Medium',
      rating: 4,
      code: `// Query database
const tasks = await notion.databases.query({
  database_id: tasksDbId,
  filter: {
    property: 'Due Date',
    date: { next_week: {} }
  }
});`
    },
    {
      tool: 'Asana',
      linesOfCode: '40-50',
      serverFiltering: false,
      complexity: 'High',
      rating: 2,
      code: `// Must fetch all then filter client-side
const allTasks = await client.tasks.findAll({ workspace: id });
const upcoming = allTasks.data.filter(t => {
  const days = daysBetween(new Date(), new Date(t.due_on));
  return days >= 0 && days <= 7;
}).sort(...);`
    },
    {
      tool: 'GitHub Projects',
      linesOfCode: '100+',
      serverFiltering: false,
      complexity: 'Very High',
      rating: 1,
      code: `// Complex nested GraphQL, fetch all, extract field values, filter client-side
// 100+ lines of complex code required`
    }
  ]
};

export const engineeringComparison = {
  title: 'Engineering Tool Comparison (Independent of CRM)',
  subtitle: 'Evaluating issue trackers for 4,672+ GitHub issues across 10 repositories',

  criteria: [
    { id: 'speed', name: 'Speed/UX', weight: 'critical', description: 'Daily triage speed' },
    { id: 'github', name: 'GitHub Integration', weight: 'critical', description: 'PRs, commits, sync' },
    { id: 'api', name: 'Deadline API', weight: 'critical', description: 'For Claude Code queries' },
    { id: 'devux', name: 'Developer Experience', weight: 'high', description: 'Keyboard shortcuts, etc.' },
    { id: 'cost', name: 'Cost (10 users)', weight: 'high', description: 'Annual cost' },
    { id: 'maintenance', name: 'Maintenance', weight: 'medium', description: 'Setup and ongoing' },
    { id: 'opensource', name: 'Open Source', weight: 'medium', description: 'OSS preference' }
  ],

  summary: {
    best: 'Plane (if have DevOps) or Linear (if want managed)',
    free: 'Shortcut (free for 10 users!) or Jira (if OSS approved)',
    avoid: 'GitHub Projects (API issue), Monday (already tried), Asana (weak API)'
  }
};

export const keyInsights = [
  {
    title: 'The API Problem',
    insight: 'GitHub Projects cannot filter by due date in API queries - you must fetch everything and filter client-side. This makes AI agent deadline queries slow and complex.',
    solutions: ['Linear, Plane, Jira, Monday all support server-side date filtering', 'Only GitHub Projects and Asana require client-side filtering']
  },
  {
    title: 'CiviCRM Game-Changer',
    insight: 'CiviCRM has built-in grant tracking, eliminating need for Notion/Monday/Asana for non-technical work',
    implication: 'Focus engineering tool selection on technical work only'
  },
  {
    title: 'Open Source Option',
    insight: 'Plane gives you Linear-like UX at 1/4 the cost, fully open source',
    tradeoff: 'Requires DevOps capacity to self-host'
  },
  {
    title: 'Hidden Gem',
    insight: 'Shortcut is FREE for up to 10 users (you have 10!)',
    consideration: 'Good middle ground - faster than Jira, cheaper than Linear'
  }
];
