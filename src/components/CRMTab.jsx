import { Stack, Card, Title, Text, Badge, Table, Code, Alert, SimpleGrid, List } from '@mantine/core';
import { IconCheck, IconX, IconAlertCircle } from '@tabler/icons-react';
import { crmOptions, crmKeyFindings } from '../data/crmOptions';

function CRMCard({ crm }) {
  const cost = crm.cost.annual
    ? `$${crm.cost.annual[0]?.toLocaleString()}-${crm.cost.annual[1]?.toLocaleString()}/year`
    : crm.cost.selfHosted === 0
    ? 'FREE (self-hosted)'
    : `$${crm.cost.monthly[0]}-${crm.cost.monthly[1]}/mo`;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <div>
          <Title order={3} mb={4}>{crm.name}</Title>
          <Text size="sm" c="dimmed" mb="xs">{crm.tagline}</Text>
          <Badge color={crm.recommended ? 'green' : 'blue'} variant="light">
            {cost}
          </Badge>
          {crm.openSource && (
            <Badge color="green" variant="dot" ml="xs">Open Source</Badge>
          )}
        </div>

        <SimpleGrid cols={2} spacing="sm">
          <div>
            <Text size="sm" fw={600} c="green" mb={4}>Pros</Text>
            <List size="xs" spacing={2}>
              {crm.pros.slice(0, 5).map((pro, idx) => (
                <List.Item key={idx} icon={<IconCheck size={12} color="green" />}>
                  {pro}
                </List.Item>
              ))}
            </List>
          </div>
          <div>
            <Text size="sm" fw={600} c="red" mb={4}>Cons</Text>
            <List size="xs" spacing={2}>
              {crm.cons.slice(0, 5).map((con, idx) => (
                <List.Item key={idx} icon={<IconX size={12} color="red" />}>
                  {con}
                </List.Item>
              ))}
            </List>
          </div>
        </SimpleGrid>

        {crm.apiExample && (
          <div>
            <Text size="xs" fw={600} mb={4}>{crm.apiExample.title}</Text>
            <Code block style={{ fontSize: '10px', padding: '8px', maxHeight: '150px', overflow: 'auto' }}>
              {crm.apiExample.code}
            </Code>
          </div>
        )}

        <Text size="xs" style={{ fontStyle: 'italic', color: '#666' }}>
          <strong>Best for:</strong> {crm.bestFor.join(', ')}
        </Text>
      </Stack>
    </Card>
  );
}

export default function CRMTab() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="sm">CRM Options for Non-Technical Work</Title>
        <Text c="dimmed">
          Evaluating CRM systems for grants, papers, fundraising, and partner management
        </Text>
      </div>

      <Alert color="green" variant="light" icon={<IconAlertCircle />}>
        <Text size="sm" fw={600} mb={4}>Recommendation: CiviCRM</Text>
        <Text size="sm">
          <strong>CiviCRM is purpose-built for nonprofits with grant tracking out-of-the-box.</strong> It's open source,
          has a good API for Claude Code integration, and can be self-hosted ($0) or managed hosted ($50-100/mo).
        </Text>
        <Text size="sm" mt={8}>
          Alternatives like HubSpot are more modern but expensive and not specialized for grants.
        </Text>
      </Alert>

      <Stack gap="md">
        {crmOptions.map(crm => (
          <CRMCard key={crm.id} crm={crm} />
        ))}
      </Stack>

      <Card padding="lg" radius="md" withBorder bg="teal.0">
        <Title order={4} mb="md">Why CiviCRM?</Title>
        <Table>
          <Table.Tbody>
            {Object.entries(crmKeyFindings).map(([key, value], idx) => (
              <Table.Tr key={idx}>
                <Table.Td width="150">
                  <Text size="sm" fw={600} tt="capitalize">{key}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{value}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}
