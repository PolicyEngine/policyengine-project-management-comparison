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
      code: `// Plane REST API - Query issues due in next 7 days
const today = new Date().toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  .toISOString().split('T')[0];

const params = new URLSearchParams({
  target_date__gte: today,
  target_date__lte: nextWeek,
  state__group__in: 'started,unstarted'
});

const response = await fetch(
  \`https://plane.policyengine.org/api/v1/workspaces/pe/projects/eng/issues/?\${params}\`,
  {
    headers: {
      'X-Api-Key': process.env.PLANE_API_KEY,
      'Content-Type': 'application/json'
    }
  }
);

const issues = await response.json();

// Format for display
issues.results.forEach(issue => {
  console.log(\`\${issue.name} - Due: \${issue.target_date} - @\${issue.assignee?.display_name}\`);
});

// Server-filtered - only returns matching issues!`
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
      title: 'Query deadlines with GraphQL SDK',
      code: `// Linear API - Official TypeScript SDK
import { LinearClient } from '@linear/sdk';

const linear = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY
});

// Calculate date range
const today = new Date().toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  .toISOString().split('T')[0];

// Query upcoming deadlines - server-side filtering
const result = await linear.issues({
  filter: {
    dueDate: {
      gte: today,
      lte: nextWeek
    },
    state: {
      type: { nin: ["completed", "canceled"] }
    }
  },
  orderBy: 'dueDate'
});

// Full TypeScript autocomplete and type safety
result.nodes.forEach(issue => {
  console.log(\`[\${issue.priorityLabel}] \${issue.title}\`);
  console.log(\`  Due: \${issue.dueDate}\`);
  console.log(\`  Assignee: \${issue.assignee?.name || 'Unassigned'}\`);
  console.log(\`  Team: \${issue.team.name}\`);
  console.log(\`  URL: \${issue.url}\`);
  console.log('');
});

// Example output:
// [High] Fix authentication error
//   Due: 2025-10-05
//   Assignee: Sarah
//   Team: API
//   URL: https://linear.app/policyengine/issue/API-123`
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
      code: `// Jira API - Using jira-client library
const JiraClient = require('jira-client');

const jira = new JiraClient({
  protocol: 'https',
  host: 'policyengine.atlassian.net',
  username: process.env.JIRA_EMAIL,
  password: process.env.JIRA_API_TOKEN,
  apiVersion: '3',
  strictSSL: true
});

// JQL Query - powerful but requires learning syntax
// Query: Issues due in next 7 days, not done, ordered by due date
const result = await jira.searchJira(
  'duedate >= now() AND duedate <= 7d AND status not in (Done, Canceled) ORDER BY duedate ASC',
  {
    fields: ['summary', 'duedate', 'assignee', 'status', 'priority', 'issuetype'],
    maxResults: 100
  }
);

// Format results
result.issues.forEach(issue => {
  console.log(\`[\${issue.fields.issuetype.name}] \${issue.fields.summary}\`);
  console.log(\`  Due: \${issue.fields.duedate}\`);
  console.log(\`  Assignee: \${issue.fields.assignee?.displayName || 'Unassigned'}\`);
  console.log(\`  Priority: \${issue.fields.priority?.name}\`);
  console.log(\`  Status: \${issue.fields.status.name}\`);
  console.log(\`  URL: https://policyengine.atlassian.net/browse/\${issue.key}\`);
  console.log('');
});

// Example output:
// [Bug] Fix authentication error
//   Due: 2025-10-05
//   Assignee: Sarah Johnson
//   Priority: High
//   Status: In Progress
//   URL: https://policyengine.atlassian.net/browse/PE-123`
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
      title: 'Complex API requiring client-side filtering (YOUR CURRENT PROBLEM)',
      code: `// GitHub Projects v2 API - THE PROBLEM
// Cannot filter by date in query - must fetch ALL then filter client-side!

import { graphql } from '@octokit/graphql';

const graphqlWithAuth = graphql.defaults({
  headers: { authorization: \`token \${process.env.GITHUB_TOKEN}\` }
});

// Step 1: Fetch ALL items (cannot filter by date in query)
const result = await graphqlWithAuth(\`
  query {
    organization(login: "PolicyEngine") {
      projectV2(number: 1) {
        items(first: 100) {
          nodes {
            content {
              ... on Issue {
                title
                number
                repository { name }
              }
            }
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldDateValue {
                  date
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
\`);

// Step 2: Extract and filter client-side (complex!)
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const upcomingDeadlines = result.organization.projectV2.items.nodes
  .filter(item => {
    // Find the "Due Date" field value
    const dueDateField = item.fieldValues.nodes.find(
      fv => fv.field?.name === 'Due Date'
    );
    if (!dueDateField?.date) return false;

    // Parse and check date range
    const dueDate = new Date(dueDateField.date);
    return dueDate >= today && dueDate <= nextWeek;
  })
  .map(item => ({
    title: item.content.title,
    repo: item.content.repository.name,
    number: item.content.number,
    dueDate: item.fieldValues.nodes.find(fv => fv.field?.name === 'Due Date')?.date,
    status: item.fieldValues.nodes.find(fv => fv.field?.name === 'Status')?.name
  }))
  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

// 100+ lines total for what Linear does in 5!`
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
      code: `// Monday.com API - GraphQL with server-side date filtering
const mondaySdk = require('monday-sdk-js');
const monday = mondaySdk();

monday.setToken(process.env.MONDAY_API_TOKEN);

// Calculate dates
const today = new Date().toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  .toISOString().split('T')[0];

// Query with date filtering (need to know board/column IDs)
const query = \`query {
  boards(ids: [123456, 789012]) {
    name
    items(
      limit: 100,
      query_params: {
        rules: [{
          column_id: "deadline",
          compare_value: ["\${today}", "\${nextWeek}"],
          operator: between
        }, {
          column_id: "status",
          compare_value: ["Done"],
          operator: not_any_of
        }]
        order_by: [{ column_id: "deadline", direction: ASC }]
      }
    ) {
      id
      name
      column_values(ids: ["deadline", "person", "status", "priority"]) {
        id
        text
        value
      }
    }
  }
}\`;

const response = await monday.api(query);

// Parse results
response.data.boards.forEach(board => {
  board.items.forEach(item => {
    const deadline = item.column_values.find(cv => cv.id === 'deadline')?.text;
    const assignee = item.column_values.find(cv => cv.id === 'person')?.text;
    console.log(\`\${item.name} - Due: \${deadline} - @\${assignee}\`);
  });
});

// Works, but need to know board/column IDs upfront`
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
      title: 'REST API deadline queries (FREE for 10 users!)',
      code: `// Shortcut API - Search with deadline filtering
const today = new Date().toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  .toISOString().split('T')[0];

const response = await fetch(
  'https://api.app.shortcut.com/api/v3/search/stories',
  {
    method: 'POST',
    headers: {
      'Shortcut-Token': process.env.SHORTCUT_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: \`deadline:>= \${today} deadline:<= \${nextWeek} !is:done\`,
      page_size: 25
    })
  }
);

const data = await response.json();

// Format results
data.data.forEach(story => {
  console.log(\`[\${story.story_type}] \${story.name}\`);
  console.log(\`  Due: \${story.deadline}\`);
  console.log(\`  Owners: \${story.owner_ids.join(', ')}\`);
  console.log(\`  State: \${story.workflow_state_id}\`);
  console.log(\`  URL: \${story.app_url}\`);
  console.log('');
});

// Server-side filtering works!
// And it's FREE for 10 users!`
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
      title: 'Database queries with date filtering',
      code: `// Notion API - Query database with date filter
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

// Query bugs database for upcoming deadlines
const response = await notion.databases.query({
  database_id: process.env.NOTION_BUGS_DB_ID,
  filter: {
    and: [
      {
        property: 'Due Date',
        date: {
          on_or_after: new Date().toISOString().split('T')[0],
          on_or_before: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0]
        }
      },
      {
        property: 'Status',
        status: {
          does_not_equal: 'Done'
        }
      }
    ]
  },
  sorts: [
    {
      property: 'Due Date',
      direction: 'ascending'
    }
  ]
});

// Format results
response.results.forEach(page => {
  const title = page.properties.Title.title[0]?.plain_text || 'Untitled';
  const dueDate = page.properties['Due Date'].date?.start;
  const assignee = page.properties.Assignee.people[0]?.name || 'Unassigned';

  console.log(\`\${title} - Due: \${dueDate} - @\${assignee}\`);
});

// Server-side filtering works, good for docs + tasks`
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
      title: 'Limited date filtering - requires client-side processing',
      code: `// Asana API - Must filter dates client-side (like GitHub Projects)
const asana = require('asana');

const client = asana.Client.create().useAccessToken(
  process.env.ASANA_TOKEN
);

// Step 1: Fetch ALL tasks (cannot filter by date in API)
const result = await client.tasks.findAll({
  workspace: process.env.ASANA_WORKSPACE_ID,
  completed_since: 'now',
  opt_fields: 'name,due_on,assignee,projects,memberships'
});

// Step 2: Filter by date CLIENT-SIDE (the problem!)
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const upcomingDeadlines = result.data
  .filter(task => {
    if (!task.due_on) return false;
    const dueDate = new Date(task.due_on);
    return dueDate >= today && dueDate <= nextWeek;
  })
  .sort((a, b) => new Date(a.due_on) - new Date(b.due_on));

// Format results
upcomingDeadlines.forEach(task => {
  console.log(\`\${task.name}\`);
  console.log(\`  Due: \${task.due_on}\`);
  console.log(\`  Assignee: \${task.assignee?.name || 'Unassigned'}\`);
  console.log('');
});

// Similar problem to GitHub Projects - no server-side date filtering
// Results in 40-50 lines of code for simple query`
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
