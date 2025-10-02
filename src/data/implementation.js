// CiviCRM Implementation Guide for PolicyEngine

export const decisiveFactors = {
  title: 'Why CiviCRM is the Clear Choice (Not Custom)',
  revelation: 'PolicyEngine needs user database sync + email campaigns + contact management + grant tracking',
  customCost: {
    development: '2-3 months full-time ($48,000-72,000)',
    ongoing: '5-10 hours/month ($9,000-18,000/year)',
    total: '$57,000-90,000 first year'
  },
  civiCRMCost: {
    setup: '2-3 weeks part-time',
    hosting: '$600-1,200/year (or $0 self-hosted)',
    mailchimpSavings: 'Save $420-1,200/year (cancel Mailchimp)',
    netCost: '$0-600/year',
    total: 'Near zero with Mailchimp savings'
  },
  savings: '$50,000-85,000+ first year by using CiviCRM',

  requirements: [
    {
      need: 'User Database Sync',
      custom: 'Build from scratch (1-2 weeks)',
      civicrm: 'REST API + webhooks (2-3 days)'
    },
    {
      need: 'Email Campaigns (Mailchimp replacement)',
      custom: 'Build entire email system (3-4 weeks)',
      civicrm: 'CiviMail built-in (import lists, done)'
    },
    {
      need: 'Contact Management',
      custom: 'Build CRM system (2-3 weeks)',
      civicrm: 'Core feature (configure, done)'
    },
    {
      need: 'Grant Tracking',
      custom: 'Build grant module (1 week)',
      civicrm: 'Built-in (configure workflows)'
    },
    {
      need: 'Ongoing Maintenance',
      custom: '5-10 hours/month',
      civicrm: '1-2 hours/month'
    }
  ]
};

export const userSyncImplementation = {
  title: 'PolicyEngine User → CiviCRM Sync Implementation',
  overview: 'Automatically sync PolicyEngine app users to CiviCRM contacts for unified contact management',

  approach: 'Webhook-based real-time sync + initial batch import',

  step1: {
    title: 'Step 1: CiviCRM Contact Type Setup',
    time: '30 minutes',
    tasks: [
      'Create "PolicyEngine User" contact subtype',
      'Add custom fields: user_id (external), signup_date, last_active, simulations_run, subscription_tier',
      'Set external_identifier as unique key for deduplication'
    ],
    code: {
      title: 'CiviCRM Admin UI Configuration',
      steps: [
        'Administer → Customize Data and Screens → Contact Types → Add Contact Type',
        'Name: "PolicyEngine User", Parent: Individual',
        'Administer → Customize Data and Screens → Custom Fields → New Field Group',
        'Fields: policyengine_user_id (integer), signup_date (date), last_active (datetime), simulations_run (integer), subscription_tier (select)'
      ]
    }
  },

  step2: {
    title: 'Step 2: Initial Batch Import',
    time: '2-3 hours',
    tasks: [
      'Export existing users from PolicyEngine database',
      'Transform to CiviCRM format',
      'Batch import via API',
      'Verify and deduplicate'
    ],
    code: {
      language: 'javascript',
      title: 'Batch import existing users',
      code: `// batch-import-users.js - One-time import of existing PolicyEngine users
const { Pool } = require('pg');
const fetch = require('node-fetch');

const pgPool = new Pool({
  connectionString: process.env.POLICYENGINE_DB_URL
});

async function batchImportUsers() {
  // Fetch all users from PolicyEngine database
  const result = await pgPool.query(\`
    SELECT
      id,
      email,
      first_name,
      last_name,
      created_at,
      last_login,
      (SELECT COUNT(*) FROM simulations WHERE user_id = users.id) as simulation_count
    FROM users
    WHERE email IS NOT NULL
    ORDER BY id
  \`);

  const users = result.rows;
  console.log(\`Found \${users.length} users to import\`);

  // Batch import (100 at a time for API efficiency)
  const BATCH_SIZE = 100;

  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    const batch = users.slice(i, i + BATCH_SIZE);

    const contacts = batch.map(user => ({
      contact_type: 'Individual',
      contact_sub_type: 'PolicyEngine_User',
      external_identifier: \`policyengine_user_\${user.id}\`,
      first_name: user.first_name || 'Unknown',
      last_name: user.last_name || 'User',
      email: user.email,
      source: 'PolicyEngine App - Initial Import',
      'custom.policyengine_user_id': user.id,
      'custom.signup_date': user.created_at?.split('T')[0],
      'custom.last_active': user.last_login,
      'custom.simulations_run': user.simulation_count || 0,
      'custom.subscription_tier': 'free' // Default
    }));

    try {
      const response = await fetch(
        'https://policyengine.org/civicrm/ajax/api4/Contact/save',
        {
          method: 'POST',
          headers: {
            'X-Civi-Auth': 'Bearer ' + process.env.CIVICRM_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            records: contacts,
            match: ['external_identifier'], // Upsert - avoid duplicates
            defaults: {
              contact_type: 'Individual'
            }
          })
        }
      );

      const data = await response.json();
      console.log(\`Imported batch \${i / BATCH_SIZE + 1}: \${data.values?.length || 0} contacts\`);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(\`Error importing batch \${i / BATCH_SIZE + 1}:\`, error);
    }
  }

  console.log('Import complete!');
}

// Run it
batchImportUsers().then(() => process.exit(0));`
    }
  },

  step3: {
    title: 'Step 3: Real-time Sync Webhook',
    time: '3-4 hours',
    tasks: [
      'Add webhook endpoint to policyengine-api',
      'Trigger on user create/update',
      'Upsert to CiviCRM via API',
      'Handle errors and retries'
    ],
    code: {
      language: 'python',
      title: 'Add to policyengine-api/webhooks/civicrm_sync.py',
      code: `# policyengine-api webhook: Sync user changes to CiviCRM
import requests
from datetime import datetime
from flask import current_app
from policyengine_api.models import User

CIVICRM_API_URL = "https://policyengine.org/civicrm/ajax/api4/Contact/save"

def sync_user_to_civicrm(user: User, action='update'):
    """Sync a PolicyEngine user to CiviCRM contact"""

    # Calculate simulation count
    simulation_count = user.simulations.count()

    # Prepare contact data
    contact_data = {
        "records": [{
            "contact_type": "Individual",
            "contact_sub_type": "PolicyEngine_User",
            "external_identifier": f"policyengine_user_{user.id}",
            "first_name": user.first_name or "Unknown",
            "last_name": user.last_name or "User",
            "email": user.email,
            "source": "PolicyEngine App",
            "custom.policyengine_user_id": user.id,
            "custom.signup_date": user.created_at.strftime("%Y-%m-%d"),
            "custom.last_active": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "custom.simulations_run": simulation_count,
            "custom.subscription_tier": user.subscription_tier or "free"
        }],
        "match": ["external_identifier"],  # Upsert based on PE user ID
        "defaults": {
            "contact_type": "Individual"
        }
    }

    try:
        response = requests.post(
            CIVICRM_API_URL,
            headers={
                "X-Civi-Auth": f"Bearer {current_app.config['CIVICRM_API_KEY']}",
                "Content-Type": "application/json"
            },
            json=contact_data,
            timeout=10
        )

        response.raise_for_status()
        data = response.json()

        current_app.logger.info(
            f"Synced user {user.id} to CiviCRM contact {data['values'][0]['id']}"
        )

        return data['values'][0]['id']

    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Failed to sync user {user.id} to CiviCRM: {e}")
        # Queue for retry (use Celery or similar)
        raise


# Hook into user model signals
from flask_sqlalchemy import event

@event.listens_for(User, 'after_insert')
def user_created(mapper, connection, target):
    """Trigger when new user signs up"""
    # Run async to not block user signup
    from policyengine_api.tasks import celery
    celery.send_task('sync_user_to_civicrm', args=[target.id, 'create'])

@event.listens_for(User, 'after_update')
def user_updated(mapper, connection, target):
    """Trigger when user updates profile"""
    celery.send_task('sync_user_to_civicrm', args=[target.id, 'update'])`
    }
  },

  step4: {
    title: 'Step 4: Bidirectional Sync (Optional)',
    time: '2-3 hours',
    tasks: [
      'Set up CiviCRM webhook to notify PolicyEngine of changes',
      'Handle contact updates in CiviCRM → sync back to PolicyEngine',
      'Useful if team updates contacts in CiviCRM'
    ],
    code: {
      language: 'javascript',
      title: 'CiviCRM → PolicyEngine webhook',
      code: `// CiviCRM Webhook: Contact updated
// Configure in CiviCRM: Administer → System → Webhooks

// Endpoint: POST https://api.policyengine.org/webhooks/civicrm/contact-updated

// policyengine-api/routes/webhooks.py
@app.route('/webhooks/civicrm/contact-updated', methods=['POST'])
def civicrm_contact_updated():
    data = request.json

    # Extract PolicyEngine user ID from external_identifier
    external_id = data.get('external_identifier', '')
    if not external_id.startswith('policyengine_user_'):
        return {'status': 'ignored'}, 200

    user_id = int(external_id.replace('policyengine_user_', ''))

    # Update user in PolicyEngine database
    user = User.query.get(user_id)
    if user:
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        # Don't sync email back (security - PE is source of truth for auth)
        db.session.commit()

    return {'status': 'synced', 'user_id': user_id}, 200`
    }
  }
};

export const mailchimpMigration = {
  title: 'Mailchimp → CiviMail Migration Plan',
  overview: 'Replace Mailchimp with CiviMail (included in CiviCRM) to unify email campaigns with contact management',

  benefits: [
    'Save $420-1,200/year (cancel Mailchimp subscription)',
    'Unified contacts (users, donors, funders in one system)',
    'Segment by any criteria (users who ran UBI sims, donors $100+, etc.)',
    'No external service dependency',
    'Better privacy (self-hosted option)'
  ],

  currentState: {
    tool: 'Mailchimp',
    estimatedCost: '$35-100/month for ~10k contacts',
    annualCost: '$420-1,200/year',
    lists: 'Unknown number of lists',
    campaigns: 'Historical campaigns',
    subscribers: '~10k estimated'
  },

  migration: {
    phase1: {
      title: 'Phase 1: Export from Mailchimp',
      time: '1 hour',
      steps: [
        {
          step: 'Export all lists',
          details: 'Mailchimp → Audience → View Contacts → Export Audience',
          output: 'CSV files with: Email, First Name, Last Name, Tags, Subscription Date, Status'
        },
        {
          step: 'Export campaign templates',
          details: 'Mailchimp → Templates → Copy HTML of key templates',
          note: 'Save your top 5-10 templates'
        },
        {
          step: 'Export campaign history',
          details: 'Mailchimp → Reports → Export campaign stats',
          note: 'For reference, won\'t import'
        }
      ],
      code: {
        title: 'Export Mailchimp via API (alternative)',
        language: 'javascript',
        code: `// If you want programmatic export
const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

// Get all lists
const lists = await mailchimp.get('/lists');

// Export each list
for (const list of lists.lists) {
  const members = await mailchimp.get(\`/lists/\${list.id}/members\`, {
    count: 1000
  });

  // Save to CSV
  const csv = members.members.map(m =>
    \`"\${m.email_address}","\${m.merge_fields.FNAME}","\${m.merge_fields.LNAME}","\${m.timestamp_signup}","\${m.status}"\`
  ).join('\\n');

  fs.writeFileSync(\`mailchimp_\${list.name}.csv\`, csv);
}`
      }
    },

    phase2: {
      title: 'Phase 2: Prepare Data for CiviCRM',
      time: '1-2 hours',
      steps: [
        {
          step: 'Clean and deduplicate data',
          details: 'Remove duplicates across lists, normalize email addresses'
        },
        {
          step: 'Map Mailchimp tags → CiviCRM groups',
          details: 'Mailchimp tags become CiviCRM groups (e.g., "Blog Subscribers", "Newsletter", "Policy Researchers")'
        },
        {
          step: 'Format CSV for CiviCRM import',
          details: 'Columns: email, first_name, last_name, source, groups'
        }
      ],
      code: {
        title: 'Transform Mailchimp export for CiviCRM',
        language: 'python',
        code: `# transform_mailchimp.py - Prepare data for CiviCRM import
import pandas as pd
import re

# Load Mailchimp export
df = pd.read_csv('mailchimp_export.csv')

# Clean emails
df['email'] = df['email'].str.lower().str.strip()

# Deduplicate (keep most recent)
df = df.sort_values('signup_date', ascending=False)
df = df.drop_duplicates(subset=['email'], keep='first')

# Map Mailchimp tags to CiviCRM groups
# Tags column might be: "Newsletter,Blog,Policy"
df['groups'] = df['tags'].apply(lambda x:
    ','.join([f"Mailchimp_{tag}" for tag in str(x).split(',') if tag])
)

# Add source
df['source'] = 'Mailchimp Import'
df['contact_type'] = 'Individual'

# Export for CiviCRM
df[['email', 'first_name', 'last_name', 'groups', 'source', 'signup_date']].to_csv(
    'civicrm_import.csv',
    index=False
)

print(f"Prepared {len(df)} contacts for CiviCRM import")
print(f"Groups: {df['groups'].unique()}")`
      }
    },

    phase3: {
      title: 'Phase 3: Import to CiviCRM',
      time: '1 hour',
      steps: [
        {
          step: 'Create groups in CiviCRM',
          details: 'Contacts → Manage Groups → New Group for each Mailchimp list'
        },
        {
          step: 'Import contacts via UI',
          details: 'Contacts → Import Contacts → Upload CSV → Map fields',
          note: 'Or use API for large imports'
        },
        {
          step: 'Verify import',
          details: 'Check contact counts, group memberships, deduplicate if needed'
        }
      ],
      code: {
        title: 'API import (for large datasets)',
        language: 'javascript',
        code: `// import-to-civicrm.js - API import for 10k+ contacts
const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');

async function importToCiviCRM() {
  const contacts = [];

  // Read CSV
  fs.createReadStream('civicrm_import.csv')
    .pipe(csv())
    .on('data', (row) => contacts.push(row))
    .on('end', async () => {
      console.log(\`Importing \${contacts.length} contacts...\`);

      // Batch import (100 at a time)
      for (let i = 0; i < contacts.length; i += 100) {
        const batch = contacts.slice(i, i + 100);

        const response = await fetch(
          'https://policyengine.org/civicrm/ajax/api4/Contact/save',
          {
            method: 'POST',
            headers: {
              'X-Civi-Auth': 'Bearer ' + process.env.CIVICRM_API_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              records: batch.map(contact => ({
                contact_type: 'Individual',
                email: contact.email,
                first_name: contact.first_name,
                last_name: contact.last_name,
                source: contact.source,
                'api.Email.create': {
                  email: contact.email,
                  is_primary: 1
                }
              })),
              match: ['email']  // Dedupe by email
            })
          }
        );

        const data = await response.json();
        console.log(\`Batch \${i/100 + 1}: Imported \${data.values?.length || 0}\`);

        // Add to groups
        if (contact.groups) {
          // Add group memberships via separate API call
          // (CiviCRM groups are separate entities)
        }

        await new Promise(r => setTimeout(r, 500)); // Rate limit
      }
    });
}

importToCiviCRM();`
      }
    },

    phase4: {
      title: 'Phase 4: Recreate Email Templates',
      time: '2-3 hours',
      steps: [
        {
          step: 'Create email templates in CiviMail',
          details: 'Mailings → Message Templates → New Template',
          note: 'Use your top 5-10 Mailchimp templates'
        },
        {
          step: 'Set up mailing groups',
          details: 'Map Mailchimp lists → CiviCRM groups (Newsletter, Blog, Policy Updates, etc.)'
        },
        {
          step: 'Test send',
          details: 'Send test campaign to small group to verify formatting'
        }
      ],
      example: {
        title: 'Example: Newsletter template in CiviMail',
        description: 'CiviMail supports HTML templates with tokens (like Mailchimp merge tags)',
        tokens: '{contact.first_name}, {contact.last_name}, {domain.address}, {action.unsubscribeUrl}'
      }
    }
  },

  goLive: {
    title: 'Phase 5: Go Live',
    time: '1 hour',
    steps: [
      'Send first campaign via CiviMail to test group',
      'Verify delivery, open rates, unsubscribes',
      'Once confident: Cancel Mailchimp subscription',
      'Update all signup forms to add to CiviCRM groups instead'
    ],
    savings: '$420-1,200/year by canceling Mailchimp'
  },

  totalTime: '8-12 hours over 1-2 weeks',
  totalSavings: '$420-1,200/year',

  apiIntegration: {
    title: 'Send Campaign via CiviCRM API',
    code: {
      language: 'javascript',
      code: `// Send email campaign via CiviMail API
const campaign = await fetch(
  'https://policyengine.org/civicrm/ajax/api4/Mailing/create',
  {
    method: 'POST',
    headers: {
      'X-Civi-Auth': 'Bearer ' + process.env.CIVICRM_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: {
        name: 'Monthly Newsletter - October 2025',
        subject: 'PolicyEngine Update: New UBI Analysis',
        body_html: '<p>Hi {contact.first_name},</p><p>We just published...</p>',
        from_name: 'PolicyEngine',
        from_email: 'hello@policyengine.org',
        replyto_email: 'hello@policyengine.org',
        // Send to group
        groups: {
          include: ['Newsletter_Subscribers'],
          exclude: ['Unsubscribed']
        },
        // Schedule or send immediately
        scheduled_date: '2025-10-15 09:00:00'
      }
    })
  }
);

console.log(\`Campaign created: \${campaign.values[0].id}\`);

// Approve and send (if not auto-scheduled)
await fetch(
  \`https://policyengine.org/civicrm/ajax/api4/Mailing/submit\`,
  {
    method: 'POST',
    body: JSON.stringify({
      where: [['id', '=', campaign.values[0].id]]
    })
  }
);`
    }
  }
};

export const implementationTimeline = {
  title: '6-Week Implementation Plan',

  week1: {
    title: 'Week 1: CiviCRM Setup',
    tasks: [
      'Install CiviCRM (managed hosting or self-hosted)',
      'Configure basic settings',
      'Set up contact types and custom fields',
      'Create initial groups (Newsletter, Blog, etc.)'
    ],
    deliverable: 'CiviCRM running with contact types configured',
    time: '8-12 hours'
  },

  week2: {
    title: 'Week 2: User Database Sync',
    tasks: [
      'Build batch import script',
      'Import existing PolicyEngine users',
      'Verify import, deduplicate',
      'Build real-time sync webhook'
    ],
    deliverable: 'PolicyEngine users syncing to CiviCRM automatically',
    time: '8-12 hours'
  },

  week3: {
    title: 'Week 3: Mailchimp Migration',
    tasks: [
      'Export Mailchimp data',
      'Transform and clean data',
      'Import to CiviCRM',
      'Verify all subscribers imported'
    ],
    deliverable: 'Mailchimp lists in CiviCRM',
    time: '6-8 hours'
  },

  week4: {
    title: 'Week 4: Email Templates & Testing',
    tasks: [
      'Recreate email templates in CiviMail',
      'Send test campaigns',
      'Set up automation rules',
      'Train team on CiviMail'
    ],
    deliverable: 'CiviMail ready for campaigns',
    time: '6-8 hours'
  },

  week5: {
    title: 'Week 5: Grant Tracking Setup',
    tasks: [
      'Configure grant workflows',
      'Import existing grants',
      'Link grants to funders (contacts)',
      'Set up grant reports/dashboards'
    ],
    deliverable: 'Grant tracking operational',
    time: '4-6 hours'
  },

  week6: {
    title: 'Week 6: Go Live & Polish',
    tasks: [
      'Send first campaign via CiviMail',
      'Monitor delivery and engagement',
      'Cancel Mailchimp subscription',
      'Update website/app signup forms to use CiviCRM',
      'Document for team'
    ],
    deliverable: 'Fully operational, Mailchimp cancelled',
    time: '4-6 hours'
  },

  totalTime: '36-52 hours over 6 weeks',
  totalCost: '$600-1,200/year (CiviCRM hosting) - $420-1,200/year (Mailchimp savings) = $0-600/year net',
  vs: 'Custom CRM: $57,000-90,000 first year'
};

export const architectureDiagram = {
  title: 'Final Architecture: CiviCRM as Central Hub',

  components: [
    {
      name: 'PolicyEngine App',
      role: 'Source of truth for users',
      integration: 'Webhook → CiviCRM on user create/update'
    },
    {
      name: 'CiviCRM',
      role: 'Unified contact & campaign management',
      manages: [
        'PolicyEngine users (synced)',
        'Donors & supporters',
        'Funders & foundations',
        'Partner organizations',
        'Email campaigns (replaces Mailchimp)',
        'Grant applications',
        'Paper submissions',
        'Financial reports'
      ]
    },
    {
      name: 'Linear/Plane',
      role: 'Engineering issue tracking',
      integration: 'API queries for technical deadlines'
    },
    {
      name: 'Claude Code',
      role: 'AI agent queries',
      queries: [
        'Upcoming deadlines (engineering + grants)',
        'Grant pipeline status',
        'Contact lookups',
        'Campaign scheduling'
      ]
    }
  ],

  dataFlow: {
    userSignup: 'PolicyEngine App → Webhook → CiviCRM (new contact)',
    emailCampaign: 'CiviCRM → Send via CiviMail → Track opens/clicks',
    grantDeadline: 'CiviCRM Grant → API → Claude Code',
    techDeadline: 'Linear/Plane → API → Claude Code',
    allDeadlines: '[Linear API, CiviCRM API] → Combine → Claude Code'
  }
};

export const finalVerdict = {
  title: 'Final Verdict: Don\'t Build Custom CRM',

  reasons: [
    {
      factor: 'User database sync needed',
      custom: 'Build from scratch (1-2 weeks)',
      civicrm: 'REST API + webhooks (2-3 days)',
      winner: 'CiviCRM'
    },
    {
      factor: 'Email campaigns (Mailchimp replacement)',
      custom: 'Build entire email system (3-4 weeks)',
      civicrm: 'CiviMail included (import, done)',
      winner: 'CiviCRM',
      savings: '$420-1,200/year'
    },
    {
      factor: 'Contact management',
      custom: 'Build CRM (2-3 weeks)',
      civicrm: 'Core feature',
      winner: 'CiviCRM'
    },
    {
      factor: 'Grant tracking',
      custom: 'Build it (1 week)',
      civicrm: 'Built-in',
      winner: 'CiviCRM'
    },
    {
      factor: 'Total development',
      custom: '2-3 months ($48k-72k)',
      civicrm: '2-3 weeks setup',
      winner: 'CiviCRM',
      savings: '$50,000-85,000'
    },
    {
      factor: 'Ongoing maintenance',
      custom: '5-10 hours/month',
      civicrm: '1-2 hours/month',
      winner: 'CiviCRM'
    }
  ],

  recommendation: 'Use CiviCRM - saves $50k+ and handles everything you need',

  onlyBuildCustomIf: [
    'You don\'t need email campaigns (keeping Mailchimp)',
    'You don\'t need contact management (just grant tracking)',
    'You have unlimited dev time and love building everything'
  ],

  realityCheck: 'CiviCRM + user sync + Mailchimp migration = 2-3 weeks setup, then you\'re done. Custom CRM = 2-3 months build + ongoing maintenance forever.'
};
