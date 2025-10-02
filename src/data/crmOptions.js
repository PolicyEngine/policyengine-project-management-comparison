// CRM Options for PolicyEngine (10 seats)

export const crmOptions = [
  {
    id: 'civicrm',
    name: 'CiviCRM',
    tagline: 'Purpose-Built for Nonprofits',
    recommended: true,
    cost: {
      monthly: [50, 100],
      annual: [600, 1200],
      breakdown: 'Managed hosting (or $0 if self-hosted + infrastructure)',
      selfHosted: 0
    },
    openSource: true,
    license: 'AGPL-3.0',
    ratings: {
      grants: 5,
      contacts: 5,
      api: 4,
      ease: 3,
      customization: 4,
      cost: 5
    },
    builtInFeatures: [
      'Grant application tracking',
      'Grant types and workflows',
      'Grant amount tracking',
      'Funder relationship management',
      'Financial reporting',
      'Paper co-author contact management',
      'Conference/event management',
      'Donor/supporter tracking',
      'Email campaigns',
      'Multi-currency support'
    ],
    pros: [
      'Purpose-built for nonprofits (grant tracking out-of-box)',
      'Open source (AGPL)',
      'Strong community and ecosystem',
      'Comprehensive grant management',
      'Good API (REST v4)',
      'Can self-host ($0 software cost)',
      'Drupal/WordPress/Joomla integration'
    ],
    cons: [
      'Complex UI (steeper learning curve)',
      'Requires PHP knowledge for customization',
      'Less modern UX than commercial tools',
      'Self-hosting requires technical capacity'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Query grants with upcoming deadlines (REST API v4)',
      code: `// CiviCRM REST API v4 - Query grants due in next 30 days
const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toISOString().split('T')[0];

const response = await fetch(
  'https://policyengine.org/civicrm/ajax/api4/Grant/get',
  {
    method: 'POST',
    headers: {
      'X-Civi-Auth': 'Bearer ' + process.env.CIVICRM_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      select: [
        'id',
        'grant_type_id:label',
        'amount_total',
        'amount_requested',
        'application_received_date',
        'status_id:label',
        'contact_id.display_name'
      ],
      where: [
        ['application_received_date', '<=', endDate],
        ['status_id:name', 'NOT IN', ['Awarded', 'Rejected']]
      ],
      orderBy: { application_received_date: 'ASC' },
      limit: 50
    })
  }
);

const data = await response.json();

// Format results
data.values.forEach(grant => {
  console.log(\`[\${grant['grant_type_id:label']}] \${grant['contact_id.display_name']}\`);
  console.log(\`  Amount: $\${grant.amount_total?.toLocaleString()}\`);
  console.log(\`  Deadline: \${grant.application_received_date}\`);
  console.log(\`  Status: \${grant['status_id:label']}\`);
  console.log('');
});

// Example output:
// [Foundation Grant] PolicyEngine Foundation
//   Amount: $1,500,000
//   Deadline: 2025-10-15
//   Status: Submitted`
    },
    bestFor: ['Nonprofits needing grant tracking', 'Open source advocates', 'Teams with PHP/DevOps capacity']
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    tagline: 'Modern, User-Friendly',
    cost: {
      monthly: [0, 450],
      annual: [0, 5400],
      breakdown: 'Free tier available, Starter $15/seat/mo (2-seat min), Professional $90/seat/mo',
      free: 'Free tier: Limited but functional'
    },
    openSource: false,
    ratings: {
      grants: 3,
      contacts: 5,
      api: 5,
      ease: 5,
      customization: 4,
      cost: 3
    },
    builtInFeatures: [
      'Contact management (funders, partners)',
      'Deal pipeline (can adapt for grants)',
      'Email tracking and campaigns',
      'Task management',
      'Meeting scheduling',
      'Reporting dashboards',
      'Forms and landing pages'
    ],
    grantTracking: 'Via custom "Deals" pipeline - not purpose-built but workable',
    pros: [
      'Excellent modern UX (easiest to learn)',
      'Free tier available',
      'Best API (GraphQL and REST)',
      'Marketing/email tools included',
      'No self-hosting needed',
      'Great for funder relationship management',
      'Integrates with everything'
    ],
    cons: [
      'Not purpose-built for grants (need customization)',
      'Can get expensive at scale',
      'Not open source',
      'Overkill if only need grants tracking',
      'Marketing features you won\'t use'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Query "deals" (adapted as grants)',
      code: `const deals = await hubspot.crm.deals.searchApi.doSearch({
  filterGroups: [{
    filters: [{
      propertyName: 'closedate',
      operator: 'LTE',
      value: addDays(new Date(), 30).getTime()
    }, {
      propertyName: 'dealstage',
      operator: 'NOT_IN',
      values: ['closedwon', 'closedlost']
    }]
  }],
  sorts: [{ propertyName: 'closedate', direction: 'ASCENDING' }]
});`
    },
    bestFor: ['Teams wanting modern UX', 'Need CRM + marketing tools', 'Willing to adapt deals for grants']
  },
  {
    id: 'odoo',
    name: 'Odoo CRM',
    tagline: 'All-in-One ERP',
    cost: {
      monthly: [249, 374],
      annual: [2988, 4488],
      breakdown: 'Standard $24.90/user/mo, Custom $37.40/user/mo (10 users)',
      community: 'Free (Community Edition, self-hosted)'
    },
    openSource: true,
    license: 'LGPL-3.0 (Community), Proprietary (Enterprise)',
    ratings: {
      grants: 3,
      contacts: 4,
      api: 4,
      ease: 3,
      customization: 5,
      cost: 3
    },
    builtInFeatures: [
      'CRM (contacts, opportunities)',
      'Project management',
      'Accounting/invoicing',
      'Inventory management',
      'HR management',
      'Email marketing',
      'Website builder',
      'Can create custom grant tracking module'
    ],
    grantTracking: 'Via Projects or custom module',
    pros: [
      'All-in-one solution (CRM + accounting + projects)',
      'Open source option available',
      'Highly customizable',
      'Good API',
      'Can build custom grant module',
      'Includes financial management'
    ],
    cons: [
      'Overkill (ERP features you don\'t need)',
      'Complex setup',
      'Expensive for Enterprise',
      'Not specialized for nonprofits',
      'Steep learning curve'
    ],
    apiExample: {
      language: 'python',
      title: 'Query opportunities (via XML-RPC or REST)',
      code: `import xmlrpc.client

models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')
opportunities = models.execute_kw(
    db, uid, password,
    'crm.lead', 'search_read',
    [[['date_deadline', '<=', next_month], ['stage_id.name', '!=', 'Won']]],
    {'fields': ['name', 'date_deadline', 'expected_revenue']}
)`
    },
    bestFor: ['Teams needing full ERP', 'Want accounting + CRM integrated', 'Have customization capacity']
  },
  {
    id: 'suitecrm',
    name: 'SuiteCRM',
    tagline: 'Open Source Alternative',
    cost: {
      monthly: [0, 50],
      annual: [0, 600],
      breakdown: 'Free (self-hosted) or managed hosting $30-50/mo',
      selfHosted: 0
    },
    openSource: true,
    license: 'AGPL-3.0',
    ratings: {
      grants: 3,
      contacts: 4,
      api: 3,
      ease: 3,
      customization: 4,
      cost: 5
    },
    builtInFeatures: [
      'Contact management',
      'Opportunity tracking',
      'Email integration',
      'Calendar',
      'Reporting',
      'Custom modules possible'
    ],
    grantTracking: 'Via custom module or adapted opportunities',
    pros: [
      'Open source (SugarCRM fork)',
      'Free if self-hosted',
      'Familiar CRM interface',
      'Good for general business contacts',
      'REST API available'
    ],
    cons: [
      'Not purpose-built for nonprofits/grants',
      'Requires customization for grant tracking',
      'Less active development than CiviCRM',
      'API less powerful than modern alternatives'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Query opportunities via REST API',
      code: `const response = await fetch(
  'https://suite.policyengine.org/Api/V8/module/Opportunities',
  {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token },
    params: {
      'filter[date_closed][$lte]': nextMonth,
      'filter[sales_stage][$ne]': 'Closed Won'
    }
  }
);`
    },
    bestFor: ['Teams wanting general CRM', 'Open source requirement', 'Lighter grant needs']
  },
  {
    id: 'airtable',
    name: 'Airtable',
    tagline: 'Flexible Database',
    cost: {
      monthly: [200, 450],
      annual: [2400, 5400],
      breakdown: 'Plus $20/seat (10 seats = $200), Pro $45/seat ($450)'
    },
    openSource: false,
    ratings: {
      grants: 4,
      contacts: 3,
      api: 5,
      ease: 5,
      customization: 5,
      cost: 2
    },
    builtInFeatures: [
      'Flexible databases (tables)',
      'Forms for data entry',
      'Automations',
      'Calendar and Gantt views',
      'Formulas and rollups',
      'Attachments'
    ],
    grantTracking: 'Create custom grant database - very flexible',
    pros: [
      'Extremely flexible (can model anything)',
      'Excellent API for Claude Code',
      'Beautiful, intuitive UI',
      'Great for grant databases',
      'Powerful automations',
      'Formula fields (e.g., expected value = amount × probability)'
    ],
    cons: [
      'Not a CRM (no contact relationship features)',
      'Expensive ($200-450/mo for 10 users)',
      'Not open source',
      'Can\'t manage email campaigns/donor relationships',
      'More database than CRM'
    ],
    apiExample: {
      language: 'javascript',
      title: 'Query grants table',
      code: `const records = await base('Grants').select({
  filterByFormula: 'AND(
    IS_AFTER({Deadline}, TODAY()),
    IS_BEFORE({Deadline}, DATEADD(TODAY(), 30, "days")),
    {Status} != "Awarded"
  )',
  sort: [{ field: 'Deadline', direction: 'asc' }]
}).all();`
    },
    bestFor: ['Teams wanting flexible grant database', 'Don\'t need full CRM features', 'Value ease of use over cost']
  },
  {
    id: 'custom-db',
    name: 'Custom Database',
    tagline: 'Build Your Own',
    cost: {
      monthly: 0,
      annual: 0,
      breakdown: 'Development time + $0 (your infrastructure)',
      devTime: '1-2 weeks initial, ongoing maintenance'
    },
    openSource: true,
    ratings: {
      grants: 4,
      contacts: 3,
      api: 5,
      ease: 2,
      customization: 5,
      cost: 5
    },
    builtInFeatures: [
      'Whatever you build',
      'Can integrate directly with PolicyEngine models',
      'Custom API designed for Claude Code'
    ],
    grantTracking: 'Build exactly what you need',
    pros: [
      'Full control over data model',
      'PolicyEngine integration (shared codebase)',
      'API designed for Claude Code from start',
      'Your infrastructure (already have PostgreSQL)',
      'Open source (your code)',
      'No external dependencies',
      'Can add PolicyEngine-specific features (link grants to policy simulations)'
    ],
    cons: [
      'Development time (1-2 weeks)',
      'Ongoing maintenance burden',
      'Missing mature CRM features',
      'No email campaigns/donor management',
      'Opportunity cost (why not use CiviCRM?)'
    ],
    apiExample: {
      language: 'python',
      title: 'Django REST API for grants',
      code: `# models.py
class Grant(models.Model):
    name = models.CharField(max_length=200)
    funder = models.ForeignKey(Funder)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    deadline = models.DateField()
    probability = models.IntegerField()

# API endpoint
@api_view(['GET'])
def upcoming_deadlines(request):
    days = int(request.GET.get('days', 30))
    grants = Grant.objects.filter(
        deadline__lte=date.today() + timedelta(days=days),
        status__in=['draft', 'submitted']
    ).order_by('deadline')
    return Response(GrantSerializer(grants, many=True).data)`
    },
    bestFor: ['Full control requirement', 'PolicyEngine-specific integration', 'Team has dev capacity']
  }
];

export const crmComparison = {
  criteria: [
    { id: 'grants', name: 'Grant Tracking', weight: 'critical', description: 'Built-in grant management' },
    { id: 'contacts', name: 'Contact Management', weight: 'high', description: 'Funder/partner relationships' },
    { id: 'api', name: 'API Quality', weight: 'critical', description: 'For Claude Code integration' },
    { id: 'ease', name: 'Ease of Use', weight: 'medium', description: 'Learning curve' },
    { id: 'customization', name: 'Customization', weight: 'medium', description: 'Adapt to needs' },
    { id: 'cost', name: 'Cost (10 users)', weight: 'high', description: 'Annual cost' }
  ],

  summary: {
    recommended: 'CiviCRM',
    why: 'Purpose-built for nonprofits with grant tracking, open source, good API',
    alternatives: {
      modern: 'HubSpot (if want modern UX, free tier available)',
      flexible: 'Airtable (if just need grant database, not full CRM)',
      control: 'Custom DB (if want PolicyEngine integration)'
    }
  }
};

export const crmKeyFindings = {
  civicrm: 'Has built-in grant tracking - exactly what you need',
  hubspot: 'Modern UX but overkill (marketing features), expensive',
  odoo: 'All-in-one ERP but complex, expensive',
  airtable: 'Great for databases but not a CRM',
  custom: 'Full control but development burden'
};
