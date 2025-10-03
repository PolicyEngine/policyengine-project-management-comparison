// CiviCRM Backend + Custom React Frontend Option

export const hybridApproach = {
  title: 'Hybrid: CiviCRM Backend + Custom React Frontend',
  tagline: 'Best of both worlds - proven backend, custom UX',

  concept: {
    backend: 'CiviCRM (headless) - handles data, logic, email',
    frontend: 'Custom React app - your design, integrated with PolicyEngine',
    integration: 'REST API v4 (modern, well-documented)',
    benefit: 'Avoid PHP, use CiviCRM proven backend, build UI you want'
  },

  whatYouGet: {
    fromCiviCRM: [
      'Proven data model (contacts, grants, emails)',
      'Grant tracking logic and workflows',
      'Email sending (CiviMail API)',
      'Contact deduplication',
      'Relationship management',
      'Financial reporting data',
      'REST API v4 (no PHP required for frontend)',
      '15+ years of nonprofit CRM expertise'
    ],
    youBuild: [
      'React frontend matching PolicyEngine design',
      'Custom admin UI for grants/contacts',
      'Integration with PolicyEngine app',
      'User-facing forms and dashboards',
      'Mobile-friendly interface',
      'Your own UX/UI decisions'
    ],
    avoidCompletely: [
      'PHP code (CiviCRM backend handles it)',
      'Building email infrastructure',
      'Building contact management from scratch',
      'Building grant workflow engine',
      'Years of debugging edge cases'
    ]
  },

  architecture: {
    title: 'Architecture: Headless CiviCRM',
    diagram: `
┌──────────────────────────────────────┐
│ PolicyEngine App (React)             │
│ - User accounts                      │
│ - Policy simulations                 │
└────────┬─────────────────────────────┘
         │ User signup webhook
         ▼
┌──────────────────────────────────────┐
│ CiviCRM Backend (Headless)           │
│ - Contact database                   │
│ - Grant workflows                    │
│ - Email engine (CiviMail)            │
│ - REST API v4                        │
└────────┬─────────────────────────────┘
         │ API calls
         ▼
┌──────────────────────────────────────┐
│ Custom React Admin (NEW)             │
│ - Grant management UI                │
│ - Contact management UI              │
│ - Email campaign UI                  │
│ - Dashboard & reporting              │
│ - PolicyEngine-styled                │
└──────────────────────────────────────┘
    `,

    apis: [
      { use: 'Create/update contacts', endpoint: '/civicrm/ajax/api4/Contact/save' },
      { use: 'Query grants', endpoint: '/civicrm/ajax/api4/Grant/get' },
      { use: 'Send email campaign', endpoint: '/civicrm/ajax/api4/Mailing/create' },
      { use: 'Search contacts', endpoint: '/civicrm/ajax/api4/Contact/get' },
      { use: 'Track donations', endpoint: '/civicrm/ajax/api4/Contribution/get' }
    ]
  },

  costComparison: {
    title: 'Cost: Custom Frontend vs Full Custom vs CiviCRM As-Is',
    options: [
      {
        name: 'CiviCRM As-Is (Default)',
        development: '0 weeks (just configure)',
        devCost: '$0',
        ongoing: '$600-1,200/year (hosting)',
        total: '$600-1,200 Year 1',
        phpRequired: true,
        customUI: false
      },
      {
        name: 'CiviCRM Backend + Custom React Frontend',
        development: '2-4 weeks',
        devCost: '$10,000-20,000 (or your team time)',
        ongoing: '$600-1,200/year (hosting) + maintenance',
        total: '$10,600-21,200 Year 1',
        phpRequired: false,
        customUI: true,
        recommended: 'If want custom UI, avoid PHP'
      },
      {
        name: 'Full Custom CRM',
        development: '2-3 months',
        devCost: '$48,000-72,000 (or your team time)',
        ongoing: '$9,000-18,000/year (maintenance)',
        total: '$57,000-90,000 Year 1',
        phpRequired: false,
        customUI: true,
        notRecommended: 'Too expensive vs hybrid'
      }
    ]
  },

  implementation: {
    week1: {
      title: 'Week 1: CiviCRM Backend Setup',
      tasks: [
        'Install CiviCRM (managed hosting recommended - no PHP needed for you)',
        'Configure contact types and custom fields',
        'Set up grant types and workflows',
        'Test REST API v4 access',
        'Set up API authentication (API keys)'
      ],
      deliverable: 'CiviCRM backend running, API accessible',
      time: '8-12 hours'
    },

    week2: {
      title: 'Week 2: React Frontend Foundation',
      tasks: [
        'Create React app (Vite + TypeScript)',
        'Set up API client for CiviCRM REST API v4',
        'Build authentication/authorization',
        'Create base layout (PolicyEngine styling)',
        'Implement contact list view'
      ],
      deliverable: 'Basic React app querying CiviCRM',
      time: '16-20 hours',
      code: {
        title: 'CiviCRM API Client',
        language: 'typescript',
        code: `// src/api/civicrm.ts - API client for CiviCRM
import axios from 'axios';

const CIVICRM_BASE = 'https://policyengine.org/civicrm/ajax/api4';

class CiviCRMClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(entity: string, action: string, params: any = {}) {
    const response = await axios.post(
      \`\${CIVICRM_BASE}/\${entity}/\${action}\`,
      params,
      {
        headers: {
          'X-Civi-Auth': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }

  // Contacts
  async getContacts(filters: any[] = []) {
    return this.request('Contact', 'get', {
      select: ['id', 'display_name', 'email', 'contact_type'],
      where: filters,
      limit: 100
    });
  }

  async createContact(contact: any) {
    return this.request('Contact', 'save', {
      records: [contact]
    });
  }

  // Grants
  async getGrants(filters: any[] = []) {
    return this.request('Grant', 'get', {
      select: ['*', 'grant_type_id:label', 'contact_id.display_name'],
      where: filters,
      orderBy: { application_received_date: 'ASC' }
    });
  }

  async createGrant(grant: any) {
    return this.request('Grant', 'save', {
      records: [grant]
    });
  }

  // Email campaigns
  async createMailing(mailing: any) {
    return this.request('Mailing', 'create', {
      values: mailing
    });
  }

  // Search (for Claude Code)
  async getUpcomingDeadlines(days: number = 30) {
    const endDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    const grants = await this.getGrants([
      ['application_received_date', '<=', endDate],
      ['status_id:name', 'NOT IN', ['Awarded', 'Rejected']]
    ]);

    return grants.values;
  }
}

export default CiviCRMClient;`
      }
    },

    week3: {
      title: 'Week 3: Core Features',
      tasks: [
        'Build grant management UI (list, create, edit)',
        'Build contact management UI (search, view, edit)',
        'Implement email campaign UI',
        'Add filters and search',
        'PolicyEngine-specific customizations'
      ],
      deliverable: 'Functional grant and contact management',
      time: '20-24 hours'
    },

    week4: {
      title: 'Week 4: Integration & Polish',
      tasks: [
        'Integrate with PolicyEngine app (user sync)',
        'Build dashboards (grant pipeline, deadlines)',
        'Add mobile responsiveness',
        'Testing and bug fixes',
        'Deploy and train team'
      ],
      deliverable: 'Production-ready custom frontend',
      time: '16-20 hours'
    },

    total: {
      time: '60-76 hours (2-4 weeks for 2 people)',
      cost: '$10,000-20,000 if contracted, or your team time',
      ongoing: '$600-1,200/year (CiviCRM hosting) + frontend maintenance'
    }
  },

  reactComponents: {
    title: 'Key React Components to Build',
    components: [
      {
        name: 'GrantList',
        purpose: 'Display grants with filters',
        apis: ['Grant/get'],
        features: ['Filter by status, funder, date', 'Sort by deadline, amount', 'Search'],
        lines: '~200 lines'
      },
      {
        name: 'GrantForm',
        purpose: 'Create/edit grants',
        apis: ['Grant/save', 'Contact/get (funders)'],
        features: ['Form validation', 'Funder autocomplete', 'File uploads'],
        lines: '~300 lines'
      },
      {
        name: 'ContactList',
        purpose: 'Search and manage contacts',
        apis: ['Contact/get', 'Contact/save'],
        features: ['Search', 'Bulk actions', 'Type filtering'],
        lines: '~250 lines'
      },
      {
        name: 'EmailCampaignBuilder',
        purpose: 'Create email campaigns',
        apis: ['Mailing/create', 'Group/get'],
        features: ['Template editor', 'Group selection', 'Scheduling'],
        lines: '~400 lines'
      },
      {
        name: 'Dashboard',
        purpose: 'Overview of deadlines and pipeline',
        apis: ['Grant/get', 'Contact/get', 'Mailing/get'],
        features: ['Upcoming deadlines', 'Grant pipeline value', 'Recent activity'],
        lines: '~300 lines'
      }
    ],
    total: '~1,450 lines of React code (2-4 weeks for experienced React devs)'
  },

  exampleComponent: {
    title: 'Example: Grant Management Component',
    code: `// src/components/GrantManager.tsx - Custom React frontend for CiviCRM grants
import { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Modal, TextInput, NumberInput, DateInput, Select } from '@mantine/core';
import { useCiviCRM } from '../hooks/useCiviCRM';

export function GrantManager() {
  const civicrm = useCiviCRM();
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch grants from CiviCRM API
  useEffect(() => {
    async function loadGrants() {
      setLoading(true);
      const result = await civicrm.getGrants([
        ['status_id:name', '!=', 'Rejected']
      ]);
      setGrants(result.values);
      setLoading(false);
    }
    loadGrants();
  }, []);

  // Create new grant via CiviCRM API
  const createGrant = async (grantData) => {
    await civicrm.createGrant({
      grant_type_id: grantData.type,
      amount_requested: grantData.amount,
      amount_total: grantData.amount,
      application_received_date: grantData.deadline,
      status_id: 1, // Submitted
      contact_id: grantData.funderId,
      // Custom fields
      'custom.probability': grantData.probability,
      'custom.policy_area': grantData.policyArea
    });

    // Refresh list
    loadGrants();
    setModalOpen(false);
  };

  return (
    <div>
      <Card>
        <Button onClick={() => setModalOpen(true)}>New Grant Application</Button>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Grant</Table.Th>
              <Table.Th>Funder</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Deadline</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {grants.map(grant => (
              <Table.Tr key={grant.id}>
                <Table.Td>{grant['grant_type_id:label']}</Table.Td>
                <Table.Td>{grant['contact_id.display_name']}</Table.Td>
                <Table.Td>$\{grant.amount_total?.toLocaleString()}</Table.Td>
                <Table.Td>{grant.application_received_date}</Table.Td>
                <Table.Td>
                  <Badge color={grant['status_id:name'] === 'Submitted' ? 'blue' : 'green'}>
                    {grant['status_id:label']}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="New Grant Application">
        <GrantForm onSubmit={createGrant} />
      </Modal>
    </div>
  );
}

// PolicyEngine-styled, React, TypeScript - NO PHP!
// Calls CiviCRM REST API v4 backend for all data operations`
  },

  pros: [
    'Use CiviCRM proven backend (15 years of nonprofit expertise)',
    'Avoid PHP entirely (REST API v4 is modern JSON)',
    'Build React frontend (your team expertise)',
    'Match PolicyEngine design system',
    'Tight integration with PolicyEngine app',
    'Custom UX decisions (admin UI, dashboards)',
    'Mobile-friendly (build responsive)',
    'Saves ~$30k-50k vs full custom (get backend free)'
  ],

  cons: [
    'Still need to host CiviCRM backend (~$50-100/mo or self-host)',
    'Need to learn CiviCRM data model and API',
    'More dev time than using CiviCRM as-is (2-4 weeks vs 2-3 weeks)',
    'Lose CiviCRM admin UI (must rebuild what you need)',
    'Ongoing maintenance of custom frontend',
    'CiviCRM upgrades may affect API (rare)'
  ],

  vsFullCustom: {
    title: 'Hybrid vs Full Custom CRM',
    comparison: [
      {
        aspect: 'Development Time',
        hybrid: '2-4 weeks',
        fullCustom: '2-3 months',
        winner: 'Hybrid (6-10 weeks faster)'
      },
      {
        aspect: 'Development Cost',
        hybrid: '$10,000-20,000',
        fullCustom: '$48,000-72,000',
        winner: 'Hybrid (saves $30k-50k)'
      },
      {
        aspect: 'Backend Logic',
        hybrid: 'CiviCRM (proven)',
        fullCustom: 'Build from scratch',
        winner: 'Hybrid (15 years of features)'
      },
      {
        aspect: 'Email Infrastructure',
        hybrid: 'CiviMail (included)',
        fullCustom: 'Build entire system',
        winner: 'Hybrid (saves 3-4 weeks)'
      },
      {
        aspect: 'Contact Deduplication',
        hybrid: 'CiviCRM (built-in)',
        fullCustom: 'Build complex logic',
        winner: 'Hybrid (hard to build right)'
      },
      {
        aspect: 'Frontend Control',
        hybrid: '100% custom',
        fullCustom: '100% custom',
        winner: 'Tie'
      },
      {
        aspect: 'Avoid PHP',
        hybrid: '✅ Yes (API only)',
        fullCustom: '✅ Yes',
        winner: 'Tie'
      }
    ]
  },

  vsCiviCRMAsIs: {
    title: 'Hybrid vs CiviCRM Default UI',
    comparison: [
      {
        aspect: 'Development Time',
        hybrid: '2-4 weeks',
        civicrm: '2-3 weeks (config only)',
        winner: 'CiviCRM (1-2 weeks faster)'
      },
      {
        aspect: 'UI/UX Quality',
        hybrid: 'PolicyEngine-styled, modern',
        civicrm: 'Functional but dated',
        winner: 'Hybrid (your design)'
      },
      {
        aspect: 'PHP Required',
        hybrid: 'No (API only)',
        civicrm: 'Yes (for customization)',
        winner: 'Hybrid'
      },
      {
        aspect: 'Maintenance',
        hybrid: 'Frontend + backend',
        civicrm: 'Backend only (UI maintained by community)',
        winner: 'CiviCRM (less maintenance)'
      },
      {
        aspect: 'PolicyEngine Integration',
        hybrid: 'Seamless (same codebase)',
        civicrm: 'Via API calls',
        winner: 'Hybrid (tighter integration)'
      },
      {
        aspect: 'Year 1 Cost',
        hybrid: '$10,600-21,200',
        civicrm: '$600-1,200',
        winner: 'CiviCRM ($10k cheaper)'
      }
    ]
  },

  recommendation: {
    title: 'When to Choose Hybrid Approach',
    choose: [
      'You want to avoid PHP completely',
      'You want PolicyEngine-styled UI',
      'You want tight integration with PolicyEngine app',
      'You have 2-4 weeks of React dev capacity',
      'You are comfortable maintaining a frontend',
      'Custom UX is worth $10k-20k to you'
    ],
    dontChoose: [
      'Budget is tight (CiviCRM as-is is $10k-20k cheaper)',
      'You do not have dev capacity (use CiviCRM UI)',
      'You are fine with CiviCRM default UI',
      'You want minimal maintenance'
    ],
    verdict: 'Hybrid is a smart middle ground if you value custom UI and want to avoid PHP, but costs $10k-20k more than CiviCRM as-is. Much better than full custom ($30k-50k cheaper).'
  },

  quickStart: {
    title: 'Quick Start: CiviCRM Headless Setup',
    steps: [
      {
        step: '1. Install CiviCRM (headless mode)',
        code: `# Use managed hosting (easiest - no PHP for you):
# - CiviHosting.com ($50-100/mo)
# - Tadpole Collective ($50-75/mo)

# Or self-host with Docker:
docker run -d \\
  --name civicrm \\
  -p 8080:80 \\
  -e CIVICRM_DB_HOST=your-db \\
  civicrm/civicrm:latest

# Access only via API (never use PHP UI)`
      },
      {
        step: '2. Generate API key',
        code: `# In CiviCRM (one-time setup):
# Administer → System Settings → API Keys
# Create API key for your React app
# Save as CIVICRM_API_KEY environment variable`
      },
      {
        step: '3. Test API access',
        code: `# Test query
curl -X POST https://policyengine.org/civicrm/ajax/api4/Contact/get \\
  -H "X-Civi-Auth: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"limit": 5}'

# Should return JSON with contacts`
      },
      {
        step: '4. Build React frontend',
        code: `# Create React app
npm create vite@latest policyengine-crm -- --template react-ts

# Install dependencies
npm install @mantine/core axios

# Build your UI using CiviCRM API!`
      }
    ]
  },

  codeExamples: {
    grantDashboard: {
      title: 'Example: Grant Pipeline Dashboard',
      code: `// PolicyEngine-styled grant dashboard consuming CiviCRM API
import { useEffect, useState } from 'react';
import { Card, SimpleGrid, Text, Badge } from '@mantine/core';
import { useCiviCRM } from '@/hooks/useCiviCRM';

export function GrantDashboard() {
  const civicrm = useCiviCRM();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      // Query CiviCRM for grant stats
      const grants = await civicrm.getGrants();

      const stats = {
        total: grants.values.length,
        totalValue: grants.values.reduce((sum, g) => sum + (g.amount_total || 0), 0),
        expectedValue: grants.values.reduce((sum, g) =>
          sum + (g.amount_total || 0) * (g['custom.probability'] || 50) / 100, 0
        ),
        byStatus: grants.values.reduce((acc, g) => {
          const status = g['status_id:label'];
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {})
      };

      setStats(stats);
    }
    loadStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <SimpleGrid cols={4}>
      <Card>
        <Text size="xs" c="dimmed">Total Grants</Text>
        <Text size="xl" fw={700}>{stats.total}</Text>
      </Card>
      <Card>
        <Text size="xs" c="dimmed">Total Value</Text>
        <Text size="xl" fw={700}>\${(stats.totalValue / 1_000_000).toFixed(1)}M</Text>
      </Card>
      <Card>
        <Text size="xs" c="dimmed">Expected Value</Text>
        <Text size="xl" fw={700}>\${(stats.expectedValue / 1_000_000).toFixed(1)}M</Text>
      </Card>
      <Card>
        <Text size="xs" c="dimmed">By Status</Text>
        {Object.entries(stats.byStatus).map(([status, count]) => (
          <Badge key={status} mr="xs">{status}: {count}</Badge>
        ))}
      </Card>
    </SimpleGrid>
  );
}

// React + TypeScript + Mantine UI
// PolicyEngine styled
// CiviCRM backend via REST API
// No PHP required!`
    }
  },

  finalThoughts: {
    title: 'Hybrid Approach: The Sweet Spot?',
    summary: 'CiviCRM backend (headless) + Custom React frontend might be your ideal solution',
    rationale: [
      'You are React/Python experts (not PHP)',
      'You value custom UI and PolicyEngine integration',
      'You get CiviCRM proven backend without the PHP/UI',
      'Saves $30k-50k vs full custom',
      'Costs $10k-20k more than CiviCRM as-is',
      'Worth it if custom UI important to your team'
    ],
    tradeoff: '$10k-20k for custom frontend vs using CiviCRM default UI',
    question: 'Is custom UI worth $10k-20k? If yes → Hybrid. If no → CiviCRM as-is.'
  }
};

export const updatedOptions = [
  {
    name: 'CiviCRM As-Is',
    cost: '$600-1,200/year',
    devTime: '0 weeks',
    total: '$600-1,200 Year 1',
    pros: ['Cheapest', 'Fastest', 'Zero development', 'Community-maintained UI'],
    cons: ['PHP for customization', 'Dated UI', 'Less integration with PE app'],
    recommended: 'If budget tight or want fastest path'
  },
  {
    name: 'CiviCRM Backend + React Frontend (HYBRID)',
    cost: '$10,600-21,200/year',
    devTime: '2-4 weeks',
    total: '$10,600-21,200 Year 1',
    pros: ['Custom React UI', 'No PHP needed', 'PolicyEngine integration', 'Proven backend', 'Saves $30k-50k vs full custom'],
    cons: ['$10k-20k dev cost', 'Frontend maintenance', 'More complex than as-is'],
    recommended: 'If want custom UI, avoid PHP, have React capacity',
    highlight: 'Sweet spot for PolicyEngine?'
  },
  {
    name: 'Full Custom CRM',
    cost: '$57,000-90,000/year',
    devTime: '2-3 months',
    total: '$57,000-90,000 Year 1',
    pros: ['Total control', 'Exactly your needs', 'Full stack ownership'],
    cons: ['Most expensive', 'Longest development', 'Ongoing maintenance burden', '$50k more than hybrid'],
    recommended: 'Not recommended - hybrid gives you custom frontend for much less'
  }
];
