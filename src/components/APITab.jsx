import { Stack, Card, Title, Text, Badge, Table, Code, Alert, SimpleGrid, Tabs, Divider, Group } from '@mantine/core';
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import { apiDetailedComparison } from '../data/engineeringTools';
import { crmOptions } from '../data/crmOptions';

function APIExample({ tool, code, title, notes, rating, serverFiltering, linesOfCode }) {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Stack gap="sm">
        <div>
          <Group justify="space-between" mb="xs">
            <Title order={4}>{tool}</Title>
            <Badge color={rating >= 4 ? 'green' : rating >= 3 ? 'yellow' : 'red'} variant="filled">
              {'⭐'.repeat(rating)}
            </Badge>
          </Group>
          {title && <Text size="sm" c="dimmed">{title}</Text>}
        </div>

        <SimpleGrid cols={3} spacing="xs">
          <div>
            <Text size="xs" c="dimmed">Lines of Code</Text>
            <Text size="sm" fw={600}>{linesOfCode}</Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">Server Filtering</Text>
            <Badge color={serverFiltering ? 'green' : 'red'} variant="light" size="sm">
              {serverFiltering ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div>
            <Text size="xs" c="dimmed">Complexity</Text>
            <Text size="sm">{tool.complexity || 'N/A'}</Text>
          </div>
        </SimpleGrid>

        <Code block style={{ fontSize: '10px', padding: '12px', maxHeight: '300px', overflow: 'auto' }}>
          {code}
        </Code>

        {notes && (
          <Text size="xs" c="dimmed" style={{ fontStyle: 'italic' }}>
            {notes}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

function ComparisonTable() {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">API Quality Comparison</Title>
      <Text size="sm" c="dimmed" mb="md">
        Query: "Show all issues due in the next 7 days, ordered by priority"
      </Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Tool</Table.Th>
            <Table.Th>Lines of Code</Table.Th>
            <Table.Th>Server Filtering</Table.Th>
            <Table.Th>Complexity</Table.Th>
            <Table.Th>Rating</Table.Th>
            <Table.Th>Notes</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {apiDetailedComparison.results.map((result, idx) => (
            <Table.Tr key={idx} style={{
              backgroundColor: result.rating >= 4 ? '#F0FFF4' : result.rating <= 2 ? '#FFF5F5' : 'white'
            }}>
              <Table.Td>
                <Text size="sm" fw={600}>{result.tool}</Text>
              </Table.Td>
              <Table.Td>
                <Badge color={result.linesOfCode.includes('100') ? 'red' : result.linesOfCode.includes('5-10') ? 'green' : 'yellow'} variant="light">
                  {result.linesOfCode}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Badge color={result.serverFiltering ? 'green' : 'red'} variant="light">
                  {result.serverFiltering ? 'Yes' : 'No'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{result.complexity}</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{'⭐'.repeat(result.rating)}</Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs" c="dimmed">{result.notes}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

export default function APITab() {
  const topTools = apiDetailedComparison.results.filter(r => r.rating >= 4);
  const problemTools = apiDetailedComparison.results.filter(r => r.rating <= 2);

  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="sm">API Comparison: Deadline Queries</Title>
        <Text c="dimmed" mb="md">
          How to query "What deadlines are coming up?" via API - critical for Claude Code integration
        </Text>
        <Alert color="red" variant="light" icon={<IconAlertCircle />}>
          <Text size="sm" fw={600}>Your Current Problem</Text>
          <Text size="sm">
            GitHub Projects API cannot filter by due date server-side. You must fetch ALL issues (hundreds of items),
            parse nested custom field values, then filter client-side. This requires 100+ lines of complex code.
          </Text>
        </Alert>
      </div>

      <ComparisonTable />

      <div>
        <Title order={3} mb="md">✅ Solutions: Tools with Good APIs</Title>
        <SimpleGrid cols={1} spacing="md">
          {topTools.filter(t => t.example).map((tool, idx) => (
            <APIExample
              key={idx}
              tool={tool.tool}
              code={tool.example.code}
              title={tool.example.title}
              notes={tool.notes}
              rating={tool.rating}
              serverFiltering={tool.serverFiltering}
              linesOfCode={tool.linesOfCode}
            />
          ))}
        </SimpleGrid>
      </div>

      <div>
        <Title order={3} mb="md">❌ Problems: Tools with Weak APIs</Title>
        <Text size="sm" c="dimmed" mb="md">
          These tools require complex client-side filtering because they cannot filter by date in the API query.
        </Text>
        <Card padding="lg" radius="md" withBorder bg="red.0">
          <Stack gap="sm">
            {problemTools.map((tool, idx) => (
              <div key={idx}>
                <Text size="sm" fw={600}>{tool.tool}</Text>
                <Text size="xs" c="dimmed">{tool.notes}</Text>
                <Badge color="red" variant="light" size="sm" mt={4}>
                  {tool.linesOfCode} lines • Client-side filtering required
                </Badge>
              </div>
            ))}
          </Stack>
        </Card>
      </div>

      <Card padding="lg" radius="md" withBorder>
        <Title order={3} mb="md">CiviCRM API Example</Title>
        <Text size="sm" c="dimmed" mb="md">
          Query grants with upcoming deadlines
        </Text>
        <Code block style={{ fontSize: '10px', padding: '12px' }}>
          {crmOptions[0].apiExample.code}
        </Code>
        <Divider my="md" />
        <Text size="sm">
          <strong>Combined Query:</strong> You can query both your engineering tool API + CiviCRM API in parallel,
          then combine results to get a unified view of all deadlines (technical + grants/papers).
        </Text>
      </Card>

      <Card padding="lg" radius="md" withBorder bg="teal.0">
        <Title order={4} mb="md">Example: Claude Code Integration</Title>
        <Text size="sm" mb="sm">
          With good APIs (Linear, Plane, Jira), you can build a simple aggregator for Claude Code:
        </Text>
        <Code block style={{ fontSize: '10px', padding: '12px' }}>
{`// Aggregate all deadlines for Claude Code
async function getAllDeadlines() {
  const [technical, grants] = await Promise.all([
    // Engineering tool API (Linear/Plane/Jira)
    linear.issues({
      filter: { dueDate: { lte: addDays(new Date(), 30) } }
    }),

    // CiviCRM API
    fetch('https://policyengine.org/civicrm/ajax/api4/Grant/get', {
      method: 'POST',
      body: JSON.stringify({
        where: [['application_received_date', '<=', addDays(new Date(), 30)]]
      })
    }).then(r => r.json())
  ]);

  return {
    technical: technical.nodes,
    grants: grants.values,
    all: [...technical.nodes, ...grants.values].sort(byDate)
  };
}

// Result:
// Oct 5: [Bug] Fix auth error (@Sarah)
// Oct 6: [Grant] NSF POSE $1.5M (@Max)
// Oct 7: [Feature] UK carbon tax (@Mike)
// Oct 8: [Paper] AEA submission (@Max, @Nikhil)`}
        </Code>
      </Card>
    </Stack>
  );
}
