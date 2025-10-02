import { Stack, Card, Title, Text, Badge, Table, Code, Alert, SimpleGrid, Group } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { engineeringTools } from '../data/engineeringTools';

export default function ToolsOnlyTab() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="sm">Engineering Tools (Independent Evaluation)</Title>
        <Text c="dimmed" mb="md">
          Comparing issue tracking tools for 4,672+ GitHub issues, independent of CRM choice
        </Text>
        <Alert color="orange" variant="light" icon={<IconAlertCircle />}>
          <Text size="sm">
            <strong>Your current problem:</strong> GitHub Projects API cannot filter by due date server-side,
            making AI agent deadline queries require 100+ lines of complex client-side code.
          </Text>
        </Alert>
      </div>

      <Card padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Comparison Table</Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tool</Table.Th>
              <Table.Th>Cost (10 users/year)</Table.Th>
              <Table.Th>Speed</Table.Th>
              <Table.Th>GitHub</Table.Th>
              <Table.Th>API Quality</Table.Th>
              <Table.Th>OSS</Table.Th>
              <Table.Th>Deadline API</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {engineeringTools.map((tool) => (
              <Table.Tr key={tool.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>{tool.name}</Text>
                  {tool.free && <Text size="xs" c="green">{tool.free}</Text>}
                </Table.Td>
                <Table.Td>
                  <Text size="sm">
                    {tool.cost.annual ? `$${tool.cost.annual[0]?.toLocaleString() || tool.cost.annual}-${tool.cost.annual[1]?.toLocaleString() || tool.cost.annual}` :
                     tool.cost.monthly === 0 ? 'FREE' : `$${tool.cost.monthly * 12}`}
                  </Text>
                </Table.Td>
                <Table.Td>{'⭐'.repeat(tool.ratings.speed)}</Table.Td>
                <Table.Td>{'⭐'.repeat(tool.ratings.githubIntegration)}</Table.Td>
                <Table.Td>{'⭐'.repeat(tool.ratings.apiQuality)}</Table.Td>
                <Table.Td>
                  <Badge color={tool.openSource ? 'green' : 'gray'} variant="light" size="sm">
                    {tool.openSource ? 'Yes' : 'No'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={tool.ratings.deadlineAPI >= 4 ? 600 : 400}>
                    {'⭐'.repeat(tool.ratings.deadlineAPI)}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <SimpleGrid cols={1} spacing="md">
        {engineeringTools.map(tool => (
          <Card key={tool.id} padding="md" radius="md" withBorder>
            <Stack gap="sm">
              <Group justify="space-between">
                <Title order={4}>{tool.name}</Title>
                <Badge>{tool.tagline}</Badge>
              </Group>

              {tool.apiExample && (
                <div>
                  <Text size="xs" fw={600} mb={4}>{tool.apiExample.title}</Text>
                  <Code block style={{ fontSize: '10px', padding: '8px', maxHeight: '200px', overflow: 'auto' }}>
                    {tool.apiExample.code}
                  </Code>
                </div>
              )}

              <Text size="xs" c="dimmed">
                <strong>Best for:</strong> {tool.bestFor.join(', ')}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
