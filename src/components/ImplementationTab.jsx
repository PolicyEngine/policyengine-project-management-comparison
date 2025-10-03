import { Stack, Card, Title, Text, Badge, Timeline, Code, Alert, SimpleGrid, List, Divider, Table } from '@mantine/core';
import { IconAlertCircle, IconCheck, IconDatabase, IconMail, IconUsers, IconRocket, IconCode } from '@tabler/icons-react';
import { decisiveFactors, userSyncImplementation, mailchimpMigration, implementationTimeline, finalVerdict } from '../data/implementation';
import { hybridApproach, updatedOptions } from '../data/customFrontend';

function DecisionCard() {
  return (
    <Card padding="lg" radius="md" withBorder bg="red.0">
      <Stack gap="md">
        <Title order={3}>🚨 Critical Decision: Don't Build Custom CRM</Title>
        <Text size="sm" fw={600}>{decisiveFactors.revelation}</Text>

        <Divider />

        <SimpleGrid cols={2} spacing="md">
          <div>
            <Text size="sm" fw={700} mb="xs">Custom CRM Cost</Text>
            <Badge color="red" size="lg" variant="filled">
              {decisiveFactors.customCost.total}
            </Badge>
            <Text size="xs" mt={4}>{decisiveFactors.customCost.development}</Text>
            <Text size="xs">{decisiveFactors.customCost.ongoing}</Text>
          </div>
          <div>
            <Text size="sm" fw={700} mb="xs">CiviCRM Cost</Text>
            <Badge color="green" size="lg" variant="filled">
              {decisiveFactors.civiCRMCost.netCost}
            </Badge>
            <Text size="xs" mt={4}>{decisiveFactors.civiCRMCost.hosting}</Text>
            <Text size="xs">Saves {decisiveFactors.civiCRMCost.mailchimpSavings}</Text>
          </div>
        </SimpleGrid>

        <Alert color="green" icon={<IconCheck />}>
          <Text size="sm" fw={600}>Savings: {decisiveFactors.savings}</Text>
        </Alert>
      </Stack>
    </Card>
  );
}

function RequirementsTable() {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">Requirements: Custom vs CiviCRM</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Need</Table.Th>
            <Table.Th>Custom CRM</Table.Th>
            <Table.Th>CiviCRM</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {decisiveFactors.requirements.map((req, idx) => (
            <Table.Tr key={idx}>
              <Table.Td><Text size="sm" fw={600}>{req.need}</Text></Table.Td>
              <Table.Td><Text size="sm" c="red">{req.custom}</Text></Table.Td>
              <Table.Td><Text size="sm" c="green">{req.civicrm}</Text></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

function UserSyncSection() {
  return (
    <Stack gap="md">
      <Title order={3}>
        <IconUsers size={24} style={{ verticalAlign: 'middle', marginRight: 8 }} />
        User Database Sync Implementation
      </Title>
      <Text c="dimmed">
        Sync PolicyEngine app users to CiviCRM automatically for unified contact management
      </Text>

      <Timeline active={4} bulletSize={24} lineWidth={2}>
        <Timeline.Item bullet={<IconDatabase size={12} />} title={userSyncImplementation.step1.title}>
          <Text size="sm" c="dimmed" mb="xs">Time: {userSyncImplementation.step1.time}</Text>
          <List size="sm">
            {userSyncImplementation.step1.tasks.map((task, idx) => (
              <List.Item key={idx}>{task}</List.Item>
            ))}
          </List>
        </Timeline.Item>

        <Timeline.Item bullet={<IconDatabase size={12} />} title={userSyncImplementation.step2.title}>
          <Text size="sm" c="dimmed" mb="xs">Time: {userSyncImplementation.step2.time}</Text>
          <Code block style={{ fontSize: '9px', padding: '8px', maxHeight: '200px', overflow: 'auto' }}>
            {userSyncImplementation.step2.code.code}
          </Code>
        </Timeline.Item>

        <Timeline.Item bullet={<IconDatabase size={12} />} title={userSyncImplementation.step3.title}>
          <Text size="sm" c="dimmed" mb="xs">Time: {userSyncImplementation.step3.time}</Text>
          <Code block style={{ fontSize: '9px', padding: '8px', maxHeight: '250px', overflow: 'auto' }}>
            {userSyncImplementation.step3.code.code}
          </Code>
        </Timeline.Item>

        <Timeline.Item bullet={<IconCheck size={12} />} title="Result">
          <Badge color="green" variant="light">
            PolicyEngine users automatically sync to CiviCRM
          </Badge>
        </Timeline.Item>
      </Timeline>
    </Stack>
  );
}

function MailchimpMigrationSection() {
  return (
    <Stack gap="md">
      <Title order={3}>
        <IconMail size={24} style={{ verticalAlign: 'middle', marginRight: 8 }} />
        Mailchimp → CiviMail Migration
      </Title>
      <Text c="dimmed">
        Replace Mailchimp with CiviMail (included in CiviCRM) and save $420-1,200/year
      </Text>

      <SimpleGrid cols={2} spacing="md">
        <Card padding="md" radius="md" withBorder>
          <Text size="sm" fw={600} mb="xs">Current: Mailchimp</Text>
          <Text size="lg" fw={700} c="red">${mailchimpMigration.currentState.annualCost}</Text>
          <Text size="xs" c="dimmed">{mailchimpMigration.currentState.estimatedCost}</Text>
        </Card>
        <Card padding="md" radius="md" withBorder bg="green.0">
          <Text size="sm" fw={600} mb="xs">After: CiviMail</Text>
          <Text size="lg" fw={700} c="green">$0/year</Text>
          <Text size="xs" c="dimmed">Included in CiviCRM</Text>
        </Card>
      </SimpleGrid>

      <Card padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Migration Process</Title>
        <Timeline active={5} bulletSize={20} lineWidth={2}>
          <Timeline.Item title={mailchimpMigration.migration.phase1.title}>
            <Text size="xs" c="dimmed">Time: {mailchimpMigration.migration.phase1.time}</Text>
            <List size="sm">
              {mailchimpMigration.migration.phase1.steps.map((step, idx) => (
                <List.Item key={idx}>
                  <Text size="xs">{step.step}</Text>
                  <Text size="xs" c="dimmed">{step.details}</Text>
                </List.Item>
              ))}
            </List>
          </Timeline.Item>

          <Timeline.Item title={mailchimpMigration.migration.phase2.title}>
            <Text size="xs" c="dimmed">Time: {mailchimpMigration.migration.phase2.time}</Text>
            <List size="sm">
              {mailchimpMigration.migration.phase2.steps.map((step, idx) => (
                <List.Item key={idx}>
                  <Text size="xs">{step.step}</Text>
                </List.Item>
              ))}
            </List>
          </Timeline.Item>

          <Timeline.Item title={mailchimpMigration.migration.phase3.title}>
            <Text size="xs" c="dimmed">Time: {mailchimpMigration.migration.phase3.time}</Text>
            <List size="sm">
              {mailchimpMigration.migration.phase3.steps.map((step, idx) => (
                <List.Item key={idx}>
                  <Text size="xs">{step.step}</Text>
                </List.Item>
              ))}
            </List>
          </Timeline.Item>

          <Timeline.Item title={mailchimpMigration.migration.phase4.title}>
            <Text size="xs" c="dimmed">Time: {mailchimpMigration.migration.phase4.time}</Text>
          </Timeline.Item>

          <Timeline.Item title={mailchimpMigration.goLive.title} bullet={<IconRocket size={12} />}>
            <Badge color="green" variant="filled">
              Save {mailchimpMigration.goLive.savings} by canceling Mailchimp
            </Badge>
          </Timeline.Item>
        </Timeline>

        <Divider my="md" />

        <Text size="sm">
          <strong>Total Time:</strong> {mailchimpMigration.totalTime}
        </Text>
        <Text size="sm">
          <strong>Annual Savings:</strong> {mailchimpMigration.totalSavings}
        </Text>
      </Card>
    </Stack>
  );
}

function ImplementationTimelineSection() {
  const weeks = [
    implementationTimeline.week1,
    implementationTimeline.week2,
    implementationTimeline.week3,
    implementationTimeline.week4,
    implementationTimeline.week5,
    implementationTimeline.week6
  ];

  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">6-Week Implementation Timeline</Title>
      <Text size="sm" c="dimmed" mb="md">
        Total: {implementationTimeline.totalTime} over 6 weeks
      </Text>

      <Timeline active={6} bulletSize={20} lineWidth={2}>
        {weeks.map((week, idx) => (
          <Timeline.Item key={idx} title={week.title}>
            <List size="sm" spacing={4}>
              {week.tasks.map((task, tidx) => (
                <List.Item key={tidx}>
                  <Text size="xs">{task}</Text>
                </List.Item>
              ))}
            </List>
            <Badge color="blue" variant="light" size="sm" mt="xs">
              {week.deliverable}
            </Badge>
            <Text size="xs" c="dimmed" mt={4}>Time: {week.time}</Text>
          </Timeline.Item>
        ))}
      </Timeline>

      <Divider my="md" />

      <Alert color="green" icon={<IconCheck />}>
        <Text size="sm" fw={600}>Total Cost: {implementationTimeline.totalCost}</Text>
        <Text size="sm">vs Custom CRM: {implementationTimeline.vs}</Text>
      </Alert>
    </Card>
  );
}

function FinalVerdictSection() {
  return (
    <Card padding="lg" radius="md" withBorder bg="teal.0">
      <Stack gap="md">
        <Title order={3}>{finalVerdict.title}</Title>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Factor</Table.Th>
              <Table.Th>Custom CRM</Table.Th>
              <Table.Th>CiviCRM</Table.Th>
              <Table.Th>Winner</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {finalVerdict.reasons.map((reason, idx) => (
              <Table.Tr key={idx}>
                <Table.Td><Text size="sm" fw={600}>{reason.factor}</Text></Table.Td>
                <Table.Td><Text size="sm" c="red">{reason.custom}</Text></Table.Td>
                <Table.Td><Text size="sm" c="green">{reason.civicrm}</Text></Table.Td>
                <Table.Td>
                  <Badge color="green" variant="light">{reason.winner}</Badge>
                  {reason.savings && (
                    <Text size="xs" c="green" mt={4}>Save: {reason.savings}</Text>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Divider />

        <Alert color="green" icon={<IconCheck />}>
          <Text size="sm" fw={700} mb={4}>{finalVerdict.recommendation}</Text>
          <Text size="sm">{finalVerdict.realityCheck}</Text>
        </Alert>

        <div>
          <Text size="sm" fw={600} mb="xs">Only build custom if:</Text>
          <List size="sm">
            {finalVerdict.onlyBuildCustomIf.map((condition, idx) => (
              <List.Item key={idx}>
                <Text size="xs" c="dimmed">{condition}</Text>
              </List.Item>
            ))}
          </List>
          <Text size="xs" c="red" mt="sm" style={{ fontStyle: 'italic' }}>
            None of these apply to PolicyEngine → Use CiviCRM
          </Text>
        </div>
      </Stack>
    </Card>
  );
}

function HybridOption() {
  return (
    <Card padding="lg" radius="md" withBorder bg="blue.0">
      <Stack gap="md">
        <div>
          <Badge color="blue" size="lg" mb="xs">💡 Smart Middle Ground</Badge>
          <Title order={3}>{hybridApproach.title}</Title>
          <Text size="sm" c="dimmed">{hybridApproach.tagline}</Text>
        </div>

        <SimpleGrid cols={3} spacing="md">
          <div>
            <Text size="xs" fw={700} mb={4}>Backend</Text>
            <Text size="xs">{hybridApproach.concept.backend}</Text>
          </div>
          <div>
            <Text size="xs" fw={700} mb={4}>Frontend</Text>
            <Text size="xs">{hybridApproach.concept.frontend}</Text>
          </div>
          <div>
            <Text size="xs" fw={700} mb={4}>Integration</Text>
            <Text size="xs">{hybridApproach.concept.integration}</Text>
          </div>
        </SimpleGrid>

        <Alert color="green" icon={<IconCheck />}>
          <Text size="sm" fw={600}>{hybridApproach.concept.benefit}</Text>
        </Alert>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Approach</Table.Th>
              <Table.Th>Dev Time</Table.Th>
              <Table.Th>Year 1 Cost</Table.Th>
              <Table.Th>PHP Required</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {updatedOptions.map((opt, idx) => (
              <Table.Tr key={idx} style={{
                backgroundColor: opt.highlight ? '#E6FFFA' : 'white'
              }}>
                <Table.Td>
                  <Text size="sm" fw={600}>{opt.name}</Text>
                  {opt.highlight && <Badge color="teal" size="xs" mt={4}>{opt.highlight}</Badge>}
                </Table.Td>
                <Table.Td><Text size="sm">{opt.devTime}</Text></Table.Td>
                <Table.Td><Text size="sm">{opt.cost}</Text></Table.Td>
                <Table.Td>
                  <Badge color={opt.cons.some(c => c.includes('PHP')) ? 'red' : 'green'} variant="light" size="sm">
                    {opt.cons.some(c => c.includes('PHP')) ? 'Yes' : 'No'}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <div>
          <Text size="sm" fw={600} mb="xs">What You Get from CiviCRM Backend:</Text>
          <SimpleGrid cols={2} spacing={4}>
            {hybridApproach.whatYouGet.fromCiviCRM.slice(0, 8).map((item, idx) => (
              <Text key={idx} size="xs" c="green">✅ {item}</Text>
            ))}
          </SimpleGrid>
        </div>

        <div>
          <Text size="sm" fw={600} mb="xs">What You Build (React):</Text>
          <SimpleGrid cols={2} spacing={4}>
            {hybridApproach.whatYouGet.youBuild.slice(0, 6).map((item, idx) => (
              <Text key={idx} size="xs" c="blue">🔨 {item}</Text>
            ))}
          </SimpleGrid>
        </div>

        <Code block style={{ fontSize: '10px', padding: '12px', maxHeight: '250px', overflow: 'auto' }}>
          {hybridApproach.exampleComponent.code}
        </Code>

        <Text size="sm" style={{ fontStyle: 'italic' }}>
          <strong>Recommendation:</strong> {hybridApproach.recommendation.verdict}
        </Text>
      </Stack>
    </Card>
  );
}

export default function ImplementationTab() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="sm">Implementation Options</Title>
        <Text c="dimmed" mb="md">
          Three approaches: CiviCRM as-is, CiviCRM backend + custom React frontend, or full custom CRM
        </Text>
      </div>

      <HybridOption />

      <Card padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>
            <IconCode size={24} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Building React Frontend for CiviCRM
          </Title>
          <Text c="dimmed">
            If you choose the hybrid approach: CiviCRM backend (headless) + custom React frontend
          </Text>

          <Alert color="blue" icon={<IconAlertCircle />}>
            <Text size="sm" fw={600} mb={4}>Development Estimate: 2-4 weeks</Text>
            <Text size="sm">
              Build ~1,450 lines of React code (5 main components). Use CiviCRM REST API v4 for all data operations.
              No PHP required - pure React + TypeScript.
            </Text>
          </Alert>

          <div>
            <Text size="sm" fw={600} mb="xs">Core Components to Build:</Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Component</Table.Th>
                  <Table.Th>Purpose</Table.Th>
                  <Table.Th>Complexity</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {hybridApproach.reactComponents.components.map((comp, idx) => (
                  <Table.Tr key={idx}>
                    <Table.Td>
                      <Text size="sm" fw={600}>{comp.name}</Text>
                      <Text size="xs" c="dimmed">{comp.lines}</Text>
                    </Table.Td>
                    <Table.Td><Text size="xs">{comp.purpose}</Text></Table.Td>
                    <Table.Td>
                      <List size="xs">
                        {comp.features.map((f, fidx) => (
                          <List.Item key={fidx}>{f}</List.Item>
                        ))}
                      </List>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <Text size="xs" c="dimmed" mt="xs">
              Total: {hybridApproach.reactComponents.total}
            </Text>
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs">CiviCRM API Client (TypeScript)</Text>
            <Code block style={{ fontSize: '9px', padding: '8px', maxHeight: '300px', overflow: 'auto' }}>
              {hybridApproach.implementation.week2.code.code}
            </Code>
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs">Example: Grant Dashboard Component</Text>
            <Code block style={{ fontSize: '9px', padding: '8px', maxHeight: '250px', overflow: 'auto' }}>
              {hybridApproach.codeExamples.grantDashboard.code}
            </Code>
          </div>

          <Divider />

          <SimpleGrid cols={2} spacing="md">
            <div>
              <Text size="sm" fw={700} c="green" mb="xs">Pros of Hybrid</Text>
              <List size="xs" spacing={2}>
                {hybridApproach.pros.slice(0, 6).map((pro, idx) => (
                  <List.Item key={idx} icon={<IconCheck size={12} color="green" />}>
                    {pro}
                  </List.Item>
                ))}
              </List>
            </div>
            <div>
              <Text size="sm" fw={700} c="red" mb="xs">Cons of Hybrid</Text>
              <List size="xs" spacing={2}>
                {hybridApproach.cons.slice(0, 6).map((con, idx) => (
                  <List.Item key={idx} icon={<IconAlertCircle size={12} />}>
                    <Text size="xs">{con}</Text>
                  </List.Item>
                ))}
              </List>
            </div>
          </SimpleGrid>

          <Alert color="teal" icon={<IconCheck />}>
            <Text size="sm" fw={600}>Decision Guide:</Text>
            <Text size="sm" mt={4}>
              <strong>Choose Hybrid if:</strong> You want to avoid PHP, want PolicyEngine-styled UI,
              have 2-4 weeks React dev capacity, and custom UX is worth $10k-20k.
            </Text>
            <Text size="sm" mt={8}>
              <strong>Choose CiviCRM as-is if:</strong> Budget tight, want fastest path, fine with default UI,
              minimal dev time available.
            </Text>
          </Alert>
        </Stack>
      </Card>

      <DecisionCard />

      <RequirementsTable />

      <UserSyncSection />

      <MailchimpMigrationSection />

      <ImplementationTimelineSection />

      <FinalVerdictSection />

      <Card padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Example: Unified Deadline Query (Linear + CiviCRM)</Title>
        <Text size="sm" mb="sm">
          After implementation, Claude Code can query all deadlines in one place:
        </Text>
        <Code block style={{ fontSize: '10px', padding: '12px' }}>
{`// Query everything: bugs, features, grants, papers
const [technical, grants] = await Promise.all([
  // Linear/Plane API
  linear.issues({
    filter: { dueDate: { lte: addDays(new Date(), 30) } }
  }),

  // CiviCRM API
  fetch('https://policyengine.org/civicrm/ajax/api4/Grant/get', {
    method: 'POST',
    body: JSON.stringify({
      where: [['application_received_date', '<=', addDays(new Date(), 30)]],
      orderBy: { application_received_date: 'ASC' }
    })
  }).then(r => r.json())
]);

// Combine results
const allDeadlines = [
  ...technical.nodes.map(i => ({ type: 'tech', title: i.title, due: i.dueDate })),
  ...grants.values.map(g => ({ type: 'grant', title: g.grant_type_id, due: g.application_received_date }))
].sort((a, b) => new Date(a.due) - new Date(b.due));

// Output:
// Oct 5: [Bug] Fix auth error
// Oct 6: [Grant] NSF POSE $1.5M
// Oct 7: [Feature] UK carbon tax
// Oct 15: [Grant] Ford Foundation $250K`}
        </Code>
      </Card>

      <Card padding="lg" radius="md" withBorder bg="blue.0">
        <Title order={4} mb="md">📋 Next Steps</Title>
        <Timeline active={3} bulletSize={20}>
          <Timeline.Item title="Immediate">
            <List size="sm">
              <List.Item>Apply for Jira OSS license (if considering Jira)</List.Item>
              <List.Item>Trial Shortcut (FREE for 10 users!)</List.Item>
              <List.Item>Trial Linear or set up Plane</List.Item>
            </List>
          </Timeline.Item>

          <Timeline.Item title="Week 1-2">
            <List size="sm">
              <List.Item>Choose engineering tool (Plane/Shortcut/Linear/Jira)</List.Item>
              <List.Item>Set up CiviCRM (managed hosting recommended)</List.Item>
              <List.Item>Configure contact types and custom fields</List.Item>
            </List>
          </Timeline.Item>

          <Timeline.Item title="Week 3-4">
            <List size="sm">
              <List.Item>Build user database sync webhook</List.Item>
              <List.Item>Batch import existing PolicyEngine users</List.Item>
              <List.Item>Export and import Mailchimp data</List.Item>
            </List>
          </Timeline.Item>

          <Timeline.Item title="Week 5-6">
            <List size="sm">
              <List.Item>Set up CiviMail templates</List.Item>
              <List.Item>Configure grant tracking</List.Item>
              <List.Item>Send test campaigns</List.Item>
              <List.Item>Cancel Mailchimp (save $420-1,200/year)</List.Item>
            </List>
          </Timeline.Item>
        </Timeline>
      </Card>
    </Stack>
  );
}
