// Comprehensive tool comparison data from analysis

export const allTools = {
  // Primary recommended options (with CiviCRM for non-technical)
  recommended: [
    {
      id: 'plane-civicrm',
      name: 'Plane + CiviCRM',
      rank: 1,
      badge: 'Recommended',
      tagline: 'Fully Open Source',
      cost: { annual: [840, 1800], monthly: [70, 150] },
      breakdown: { plane: '$20-50/mo', civicrm: '$50-100/mo' },
      ratings: {
        engineering: 4,
        nonTech: 5,
        apiQuality: 5,
        github: 4,
        speed: 4,
        cost: 5
      },
      openSource: 'both',
      devOps: 'high',
      pros: [
        'Fully open source (both tools)',
        'Linear-like UX (fast, clean)',
        'Excellent APIs for Claude Code deadline queries',
        'Data sovereignty (self-hosted)',
        'Saves $1,200-2,200/year vs Linear',
        'Active development, growing community',
        'GitHub integration (bi-directional sync)'
      ],
      cons: [
        'DevOps burden (manage two systems)',
        'Less polished than Linear (newer project)',
        'Need to integrate two APIs',
        'Requires server maintenance'
      ],
      engineering: { tool: 'Plane', type: 'self-hosted' },
      nonTechnical: { tool: 'CiviCRM', type: 'purpose-built' },
      apiExample: `// Plane API - deadline queries
const response = await fetch(
  'https://plane.policyengine.org/api/v1/workspaces/pe/projects/eng/issues/',
  {
    headers: { 'X-Api-Key': process.env.PLANE_API_KEY },
    params: {
      target_date__lte: '2025-10-09',
      state__group__in: 'started,unstarted'
    }
  }
);`,
      useCases: ['Perfect for OSS advocates with DevOps capacity', 'Best balance of cost, features, and principles']
    },
    {
      id: 'jira-civicrm',
      name: 'Jira + CiviCRM',
      rank: 2,
      badge: 'Best Value',
      tagline: 'Free if OSS Approved',
      cost: { annual: [600, 1200], monthly: [50, 100] },
      breakdown: { jira: '$0 (if OSS)', civicrm: '$50-100/mo' },
      ratings: {
        engineering: 2,
        nonTech: 5,
        apiQuality: 4,
        github: 3,
        speed: 2,
        cost: 5
      },
      openSource: 'both',
      devOps: 'low',
      requiresApproval: true,
      pros: [
        'Potentially free (if OSS license approved)',
        'Powerful JQL for deadline queries',
        'Confluence included for documentation',
        'Mature, enterprise-grade',
        'Excellent for complex grant workflows',
        'Advanced reporting and dashboards'
      ],
      cons: [
        'Slow UI (notoriously frustrating for engineers)',
        'JQL learning curve (1-2 weeks)',
        'Must apply and wait for OSS license (1-2 weeks)',
        'Complex setup (6-8 hours)'
      ],
      engineering: { tool: 'Jira', type: 'managed' },
      nonTechnical: { tool: 'CiviCRM', type: 'purpose-built' },
      apiExample: `// Jira API - JQL queries
const grants = await jira.searchJira(
  'duedate >= now() AND duedate <= endOfWeek() AND status != Done ORDER BY duedate ASC',
  {
    fields: ['summary', 'duedate', 'assignee', 'status'],
    maxResults: 100
  }
);`,
      useCases: ['Best if budget matters and OSS approved', 'Teams comfortable with enterprise tools']
    },
    {
      id: 'linear-civicrm',
      name: 'Linear + CiviCRM',
      rank: 3,
      badge: 'Best UX',
      tagline: 'Premium Developer Experience',
      cost: { annual: [2000, 3000], monthly: [170, 250] },
      breakdown: { linear: '$120-150/mo', civicrm: '$50-100/mo' },
      ratings: {
        engineering: 5,
        nonTech: 5,
        apiQuality: 5,
        github: 5,
        speed: 5,
        cost: 2
      },
      openSource: 'civicrm-only',
      devOps: 'low',
      pros: [
        'Best engineering UX (5-10x faster than Jira)',
        'Cleanest API for Claude Code integration',
        'Seamless GitHub integration',
        'Keyboard-driven workflow',
        'Zero maintenance (fully managed)',
        'Most polished UI'
      ],
      cons: [
        'Proprietary (not open source)',
        'Highest cost ($1,200-2,200/year more than Plane)',
        'Need to integrate two APIs',
        'Vendor lock-in'
      ],
      engineering: { tool: 'Linear', type: 'managed' },
      nonTechnical: { tool: 'CiviCRM', type: 'purpose-built' },
      apiExample: `// Linear API - GraphQL
const issues = await linear.issues({
  filter: {
    dueDate: {
      gte: "2025-10-02",
      lte: "2025-10-09"
    },
    state: { type: { nin: ['completed', 'canceled'] } }
  },
  orderBy: 'dueDate'
});`,
      useCases: ['Best if speed and UX critical', 'Worth premium if team values developer velocity']
    },
    {
      id: 'github-civicrm',
      name: 'GitHub Projects + CiviCRM',
      rank: 4,
      tagline: 'Cheapest (Limited API)',
      cost: { annual: [600, 1200], monthly: [50, 100] },
      breakdown: { github: '$0', civicrm: '$50-100/mo' },
      ratings: {
        engineering: 3,
        nonTech: 5,
        apiQuality: 2,
        github: 5,
        speed: 3,
        cost: 5
      },
      openSource: 'civicrm-only',
      devOps: 'none',
      notRecommended: true,
      pros: [
        'Zero migration (already using)',
        'Native GitHub integration',
        'Lowest cost',
        'Simple setup'
      ],
      cons: [
        'Cannot filter by due date in API (core problem)',
        'Client-side filtering only (slow, complex)',
        'Doesn\'t solve AI agent automation needs',
        'Not recommended for your use case'
      ],
      engineering: { tool: 'GitHub Projects', type: 'native' },
      nonTechnical: { tool: 'CiviCRM', type: 'purpose-built' },
      apiExample: `// GitHub Projects API - Complex, no date filtering
query {
  organization(login: "PolicyEngine") {
    projectV2(number: 1) {
      items(first: 100) {
        nodes {
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldDateValue {
                date  # Must filter client-side!
              }
            }
          }
        }
      }
    }
  }
}`,
      useCases: ['Only if staying put despite limitations']
    }
  ],

  // Other tools considered (less relevant with CiviCRM)
  alternatives: [
    {
      id: 'monday',
      name: 'Monday.com',
      tagline: 'Visual Workflows',
      cost: { annual: 2160, monthly: 180 },
      ratings: {
        engineering: 2,
        nonTech: 5,
        apiQuality: 4,
        github: 2,
        speed: 2,
        cost: 3
      },
      openSource: 'none',
      pros: [
        'Highly visual (Kanban, Gantt, Calendar)',
        'Great for grants and non-technical work',
        'Good API with GraphQL',
        'Powerful automations',
        'Beautiful dashboards'
      ],
      cons: [
        'You tried it before and stopped (why?)',
        'Not built for developers',
        'Weak GitHub integration',
        'Can be overwhelming',
        'Expensive for features'
      ],
      apiExample: `// Monday.com API
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
      column_values { text }
    }
  }
}\`;`,
      lessRelevant: 'CiviCRM better for grants'
    },
    {
      id: 'asana',
      name: 'Asana',
      tagline: 'Traditional PM',
      cost: { annual: 1980, monthly: 165 },
      ratings: {
        engineering: 2,
        nonTech: 4,
        apiQuality: 3,
        github: 2,
        speed: 2,
        cost: 3
      },
      openSource: 'none',
      pros: [
        'Familiar interface',
        'Good for project management',
        'Tasks and subtasks',
        'Multiple views',
        'Templates'
      ],
      cons: [
        'API date filtering limited (client-side needed)',
        'Not built for developers',
        'Weak GitHub integration',
        'Slower than Linear/Plane'
      ],
      apiExample: `// Asana API - Limited date filtering
const tasks = await client.tasks.findAll({
  workspace: workspaceId,
  opt_fields: 'name,due_on,assignee'
});
// Filter by date client-side - API doesn't support!`,
      lessRelevant: 'Weak API, CiviCRM better for grants'
    },
    {
      id: 'notion',
      name: 'Notion',
      tagline: 'All-in-One Workspace',
      cost: { annual: 1440, monthly: 120 },
      ratings: {
        engineering: 3,
        nonTech: 5,
        apiQuality: 4,
        github: 2,
        speed: 3,
        cost: 4
      },
      openSource: 'none',
      pros: [
        'Excellent for documentation',
        'Perfect for grant proposals',
        'Flexible databases',
        'Great for long-form writing',
        'Good API for date queries'
      ],
      cons: [
        'Not optimized for bug tracking',
        'Slower than Linear for triage',
        'Weak GitHub integration',
        'Can get messy with too much flexibility'
      ],
      apiExample: `// Notion API - Database queries
const grants = await notion.databases.query({
  database_id: grantsDatabaseId,
  filter: {
    property: 'Deadline',
    date: { next_month: {} }
  }
});`,
      lessRelevant: 'CiviCRM better for grants, not ideal for engineering'
    },
    {
      id: 'shortcut',
      name: 'Shortcut',
      tagline: 'Middle Ground',
      cost: { annual: 1530, monthly: 128 },
      ratings: {
        engineering: 4,
        nonTech: 3,
        apiQuality: 4,
        github: 4,
        speed: 4,
        cost: 3
      },
      openSource: 'none',
      pros: [
        'Faster than Jira',
        'Good GitHub integration',
        'Free for up to 10 users',
        'Better docs than Linear'
      ],
      cons: [
        'Not as fast as Linear',
        'Less keyboard-driven',
        'Fewer integrations'
      ],
      lessRelevant: 'No clear advantage over Plane or Linear'
    }
  ],

  // CiviCRM details
  civicrm: {
    name: 'CiviCRM',
    purpose: 'Non-technical project management',
    cost: { monthly: [50, 100], note: 'Managed hosting; $0 if self-hosted' },
    openSource: true,
    builtIn: [
      'Grant application tracking',
      'Grant types and workflows',
      'Funder relationship management',
      'Financial reporting',
      'Paper co-author contacts',
      'Conference/event management',
      'Donor tracking'
    ],
    apiExample: `// CiviCRM REST API v4
const grants = await fetch(
  'https://policyengine.org/civicrm/ajax/api4/Grant/get',
  {
    method: 'POST',
    headers: { 'X-Civi-Auth': 'Bearer ' + process.env.CIVICRM_TOKEN },
    body: JSON.stringify({
      where: [
        ['application_received_date', '<=', nextMonth],
        ['status_id:name', 'NOT IN', ['Awarded', 'Rejected']]
      ],
      orderBy: { application_received_date: 'ASC' }
    })
  }
);`,
    why: 'Purpose-built for nonprofits, has everything you need for grants out-of-box'
  }
};

export const apiComparison = {
  title: 'API Deadline Query Comparison',
  description: 'How easy is it to ask "What deadlines are coming up?" via API',
  tools: [
    {
      name: 'Linear',
      rating: 5,
      linesOfCode: '5-10',
      serverFiltering: true,
      complexity: 'Low',
      example: {
        language: 'javascript',
        code: `const issues = await linear.issues({
  filter: {
    dueDate: {
      gte: "2025-10-02",
      lte: "2025-10-09"
    }
  },
  orderBy: 'dueDate'
});`
      },
      notes: 'Cleanest API, best developer experience, official TypeScript SDK'
    },
    {
      name: 'Plane',
      rating: 4,
      linesOfCode: '10-15',
      serverFiltering: true,
      complexity: 'Low',
      example: {
        language: 'javascript',
        code: `const issues = await fetch(
  'https://plane.policyengine.org/api/v1/issues/',
  {
    params: {
      target_date__lte: '2025-10-09',
      state__group__in: 'started'
    }
  }
);`
      },
      notes: 'Very similar to Linear, good API, supports date filtering'
    },
    {
      name: 'Jira',
      rating: 4,
      linesOfCode: '15-20',
      serverFiltering: true,
      complexity: 'Medium (JQL)',
      example: {
        language: 'javascript',
        code: `const issues = await jira.searchJira(
  'duedate >= now() AND duedate <= 7d AND status != Done ORDER BY duedate',
  { fields: ['summary', 'duedate', 'assignee'] }
);`
      },
      notes: 'Powerful JQL, mature ecosystem, but requires learning JQL syntax'
    },
    {
      name: 'Monday.com',
      rating: 4,
      linesOfCode: '10-20',
      serverFiltering: true,
      complexity: 'Medium',
      example: {
        language: 'javascript',
        code: `const query = \`query {
  boards(ids: [\${boardId}]) {
    items(query_params: {
      rules: [{
        column_id: "deadline",
        compare_value: ["\${today}", "\${nextWeek}"],
        operator: between
      }]
    }) { name }
  }
}\`;`
      },
      notes: 'GraphQL API, supports date filtering, need to know column IDs'
    },
    {
      name: 'Asana',
      rating: 3,
      linesOfCode: '40-50',
      serverFiltering: false,
      complexity: 'High (client-side)',
      example: {
        language: 'javascript',
        code: `// Must fetch all then filter client-side
const tasks = await client.tasks.findAll({ workspace: id });
const upcoming = tasks.data.filter(t => {
  return t.due_on && daysBetween(now, t.due_on) <= 7;
});`
      },
      notes: 'Limited API - requires client-side date filtering like GitHub Projects'
    },
    {
      name: 'GitHub Projects',
      rating: 2,
      linesOfCode: '100+',
      serverFiltering: false,
      complexity: 'Very High',
      example: {
        language: 'javascript',
        code: `// Fetch ALL items, extract nested field values, filter client-side
const allItems = await fetchAllProjectItems(projectId);
const upcoming = allItems.filter(item => {
  const dateField = item.fieldValues.nodes.find(
    fv => fv.field?.name === 'Due Date'
  )?.date;
  // Complex client-side logic...
});`
      },
      notes: 'Cannot filter by custom fields in query - this is your current pain point'
    },
    {
      name: 'Notion',
      rating: 4,
      linesOfCode: '30-40',
      serverFiltering: true,
      complexity: 'Medium (multiple DBs)',
      example: {
        language: 'javascript',
        code: `const deadlines = await notion.databases.query({
  database_id: tasksDbId,
  filter: {
    property: 'Due Date',
    date: { next_week: {} }
  }
});`
      },
      notes: 'Good API, but need to query multiple databases for different work types'
    },
    {
      name: 'CiviCRM',
      rating: 4,
      linesOfCode: '15-20',
      serverFiltering: true,
      complexity: 'Medium',
      example: {
        language: 'javascript',
        code: `const grants = await fetch(
  'https://policyengine.org/civicrm/ajax/api4/Grant/get',
  {
    body: JSON.stringify({
      where: [['application_received_date', '<=', nextMonth]],
      orderBy: { application_received_date: 'ASC' }
    })
  }
);`
      },
      notes: 'REST API v4, supports date filtering, built for nonprofits'
    }
  ]
};

export const useCases = [
  {
    title: 'Grant Application Workflow',
    scenarios: [
      {
        tool: 'Jira + CiviCRM',
        description: 'Create "Grant Application" issue type with custom workflow',
        workflow: 'Draft → Review → Submit → Under Review → Awarded/Rejected',
        features: ['Custom fields (Amount, Funder, Probability)', 'Confluence for proposal writing', 'Dashboard tracking'],
        rating: 5
      },
      {
        tool: 'Linear + Notion',
        description: 'Notion database for grants, Linear for related technical work',
        workflow: 'Kanban: Draft → Review → Submit → Under Review → Awarded',
        features: ['Rich database properties', 'Proposal drafting in Notion', 'Visual pipeline'],
        rating: 5
      },
      {
        tool: 'Plane + CiviCRM',
        description: 'CiviCRM for grants (purpose-built), Plane for any related technical tasks',
        workflow: 'CiviCRM built-in grant workflow',
        features: ['Native grant tracking in CiviCRM', 'Funder relationships', 'Financial reporting'],
        rating: 5
      },
      {
        tool: 'Linear Only',
        description: 'Track as issues with "grant" label',
        workflow: 'Basic issue with due date',
        features: ['Simple tracking', 'No rich metadata', 'No proposal writing'],
        rating: 2
      }
    ]
  },
  {
    title: 'AI Agent Query: "What deadlines are coming up?"',
    scenarios: [
      {
        tool: 'Jira + CiviCRM',
        codeLines: '5-10',
        example: `const all = await jira.searchJira(
  'duedate >= now() AND duedate <= 7d ORDER BY duedate',
  { fields: ['summary', 'duedate', 'issuetype'] }
);`,
        result: 'Single query across bugs, features, grants, papers',
        rating: 5
      },
      {
        tool: 'Linear + CiviCRM',
        codeLines: '30-40',
        example: `const [tech, grants] = await Promise.all([
  linear.issues({ filter: { dueDate: { lte: nextWeek } } }),
  fetch('civicrm/api4/Grant/get', { where: [...] })
]);
const all = [...tech.nodes, ...grants.values].sort(byDate);`,
        result: 'Combine two excellent APIs',
        rating: 5
      },
      {
        tool: 'Plane + CiviCRM',
        codeLines: '30-40',
        example: `const [tech, grants] = await Promise.all([
  fetch('plane.../issues/', { params: { target_date__lte: nextWeek } }),
  fetch('civicrm/api4/Grant/get', { where: [...] })
]);`,
        result: 'Similar to Linear + CiviCRM',
        rating: 5
      },
      {
        tool: 'GitHub Projects',
        codeLines: '100+',
        example: 'Fetch all items, parse nested custom fields, filter client-side',
        result: 'Complex, slow, doesn\'t scale',
        rating: 1
      }
    ]
  }
];

export const comparisonMatrix = {
  criteria: [
    { id: 'cost', name: 'Cost (15 users)', weight: 'high' },
    { id: 'engineering', name: 'Engineering Speed', weight: 'high' },
    { id: 'github', name: 'GitHub Integration', weight: 'high' },
    { id: 'api', name: 'Deadline API', weight: 'critical' },
    { id: 'grants', name: 'Grant Tracking', weight: 'high' },
    { id: 'papers', name: 'Paper Submissions', weight: 'medium' },
    { id: 'writing', name: 'Long-Form Writing', weight: 'medium' },
    { id: 'financial', name: 'Financial Reports', weight: 'medium' },
    { id: 'setup', name: 'Setup Time', weight: 'medium' },
    { id: 'learning', name: 'Learning Curve', weight: 'medium' },
    { id: 'switching', name: 'Context Switching', weight: 'low' },
    { id: 'ai', name: 'AI Agent Integration', weight: 'critical' }
  ],

  scores: {
    'plane-civicrm': { cost: 5, engineering: 4, github: 4, api: 5, grants: 5, papers: 5, writing: 5, financial: 5, setup: 4, learning: 4, switching: 4, ai: 5 },
    'jira-civicrm': { cost: 5, engineering: 2, github: 3, api: 4, grants: 5, papers: 4, writing: 5, financial: 5, setup: 2, learning: 2, switching: 5, ai: 4 },
    'linear-civicrm': { cost: 2, engineering: 5, github: 5, api: 5, grants: 5, papers: 5, writing: 5, financial: 4, setup: 4, learning: 5, switching: 4, ai: 5 },
    'github-civicrm': { cost: 5, engineering: 3, github: 5, api: 2, grants: 5, papers: 5, writing: 5, financial: 5, setup: 5, learning: 4, switching: 4, ai: 2 },
    'monday': { cost: 3, engineering: 2, github: 2, api: 4, grants: 5, papers: 4, writing: 2, financial: 5, setup: 3, learning: 3, switching: 5, ai: 4 },
    'linear-notion': { cost: 2, engineering: 5, github: 5, api: 5, grants: 5, papers: 5, writing: 5, financial: 4, setup: 4, learning: 4, switching: 3, ai: 5 }
  }
};

export const keyFindings = {
  problem: 'GitHub Projects API cannot filter by due date server-side, making AI agent deadline queries complex and slow',
  solution: 'Need a tool with good API for deadline filtering + CiviCRM for non-technical work',
  civicrm: 'CiviCRM (planned CRM) has built-in grant tracking, eliminating need for Notion/Monday/Jira for grants',
  focusArea: 'Choose engineering tool only - CiviCRM handles non-technical work',
  topPicks: [
    {
      name: 'Plane + CiviCRM',
      why: 'Fully open source, Linear-like UX, good APIs, low cost',
      ideal: 'Teams with DevOps capacity who value open source'
    },
    {
      name: 'Jira + CiviCRM',
      why: 'Both potentially free, good APIs, handles everything',
      ideal: 'Budget-conscious teams, if OSS license approved'
    },
    {
      name: 'Linear + CiviCRM',
      why: 'Best engineering UX, best APIs, fastest',
      ideal: 'Teams valuing speed over cost/open source'
    }
  ]
};

export const actionPlan = {
  week1: [
    { action: 'Apply for Jira OSS license', time: '10 minutes', url: 'https://www.atlassian.com/software/views/open-source-license-request' },
    { action: 'Trial Plane', time: '2-3 hours', cmd: 'docker-compose up' },
    { action: 'Trial Linear', time: '1 hour', note: '14-day free trial' },
    { action: 'Set up CiviCRM', time: 'Varies', note: 'Doing this anyway' }
  ],
  week2: [
    { action: 'Test Plane with real issues' },
    { action: 'Test Linear with real issues' },
    { action: 'Build test deadline query integrating with CiviCRM' },
    { action: 'Get team feedback (especially engineers)' }
  ],
  week3: [
    { action: 'Wait for Jira OSS response' },
    { action: 'Compare trial experiences' },
    { action: 'Test combined API deadline queries' }
  ],
  decision: {
    ifJiraApproved: 'Jira + CiviCRM (free wins)',
    ifOSSPriority: 'Plane + CiviCRM (fully open source)',
    ifSpeedPriority: 'Linear + CiviCRM (best UX)',
    dont: ['Stay with GitHub Projects alone (API limitations)', 'Monday.com (already tried)', 'Asana (weak API)']
  }
};
