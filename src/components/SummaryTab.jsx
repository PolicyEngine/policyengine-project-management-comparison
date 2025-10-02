import { Stack, Card, Title, Text, Badge, Group, List, Table, Divider, Alert, SimpleGrid, ThemeIcon } from '@mantine/core';
import { IconTrophy, IconAlertCircle, IconCheck, IconX, IconStar } from '@tabler/icons-react';
import { combinations, costComparison } from '../data/combinations';

function CombinationCard({ combo }) {
  const costRange = `$${combo.cost.annual[0].toLocaleString()}-${combo.cost.annual[1].toLocaleString()}/year`;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        backgroundColor: combo.rank === 1 ? '#F0FFF4' : combo.notRecommended ? '#FFF5F5' : 'white'
      }}
    >
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Group gap="xs" mb={4}>
              {combo.rank <= 3 && (
                <ThemeIcon color={combo.rank === 1 ? 'yellow' : 'blue'} variant="light" size="sm">
                  {combo.rank === 1 ? <IconTrophy size={16} /> : <IconStar size={16} />}
                </ThemeIcon>
              )}
              <Title order={3}>{combo.name}</Title>
            </Group>
            <Text size="sm" c="dimmed" mb="xs">{combo.tagline}</Text>
            {combo.badge && (
              <Badge color={combo.rank === 1 ? 'green' : combo.rank === 2 ? 'blue' : 'gray'} variant="light">
                {combo.badge}
              </Badge>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <Badge color={combo.rank === 1 ? "green" : "blue"} size="lg" variant="filled">
              {costRange}
            </Badge>
            {combo.surprise && (
              <Text size="xs" c="teal" fw={700} mt={4}>
                {combo.surprise}
              </Text>
            )}
          </div>
        </Group>

        <SimpleGrid cols={2} spacing="md">
          <div>
            <Text size="xs" c="dimmed" mb={4}>Engineering Tool</Text>
            <Text size="sm" fw={600}>{combo.engineering}</Text>
          </div>
          <div>
            <Text size="xs" c="dimmed" mb={4}>CRM/Non-Technical</Text>
            <Text size="sm" fw={600}>{combo.crm}</Text>
          </div>
        </SimpleGrid>

        <Divider />

        <SimpleGrid cols={2} spacing="md">
          <div>
            <Text size="sm" fw={600} mb="xs" c="green">Pros</Text>
            <List size="sm" spacing={4}>
              {combo.pros.slice(0, 4).map((pro, idx) => (
                <List.Item key={idx} icon={<IconCheck size={14} color="green" />}>
                  <Text size="xs">{pro}</Text>
                </List.Item>
              ))}
            </List>
          </div>
          <div>
            <Text size="sm" fw={600} mb="xs" c="red">Cons</Text>
            <List size="sm" spacing={4}>
              {combo.cons.slice(0, 4).map((con, idx) => (
                <List.Item key={idx} icon={<IconX size={14} color="red" />}>
                  <Text size="xs">{con}</Text>
                </List.Item>
              ))}
            </List>
          </div>
        </SimpleGrid>

        {combo.actionRequired && (
          <Alert color="blue" variant="light" icon={<IconAlertCircle />}>
            <Text size="xs" fw={600}>Action Required:</Text>
            <Text size="xs">{combo.actionRequired}</Text>
          </Alert>
        )}

        <Text size="sm" style={{ fontStyle: 'italic', color: '#666' }}>
          <strong>Best for:</strong> {combo.bestFor}
        </Text>
      </Stack>
    </Card>
  );
}

function CostChart() {
  const sorted = [...costComparison.tools].sort((a, b) => a.range[0] - b.range[0]);

  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">Annual Cost Comparison (10 Users)</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Combination</Table.Th>
            <Table.Th>Annual Cost</Table.Th>
            <Table.Th>Note</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sorted.map((tool, idx) => (
            <Table.Tr key={idx}>
              <Table.Td>
                <Text size="sm" fw={idx < 3 ? 600 : 400}>{tool.name}</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" fw={idx < 3 ? 600 : 400}>
                  ${tool.range[0].toLocaleString()}-${tool.range[1].toLocaleString()}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="xs" c="dimmed">{tool.note}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}

export default function SummaryTab() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={2} mb="sm">Best Combinations: Engineering Tool + CRM</Title>
        <Text c="dimmed" mb="md">
          Recommended pairings for PolicyEngine's needs: technical issue tracking (4,672+ GitHub issues) + non-technical work (grants, papers, fundraising)
        </Text>
        <Alert color="teal" variant="light" icon={<IconAlertCircle />}>
          <Text size="sm" fw={600}>Key Finding:</Text>
          <Text size="sm">
            CiviCRM has built-in grant tracking → Focus on choosing engineering tool only
          </Text>
        </Alert>
      </div>

      <Stack gap="md">
        {combinations.filter(c => c.rank <= 4).map(combo => (
          <CombinationCard key={combo.id} combo={combo} />
        ))}
      </Stack>

      <SimpleGrid cols={1} spacing="xl">
        <CostChart />

        <Card padding="lg" radius="md" withBorder bg="blue.0">
          <Title order={4} mb="md">Quick Decision Guide</Title>
          <List spacing="sm">
            <List.Item>
              <strong>If you have DevOps capacity + value OSS:</strong> Plane + CiviCRM ($840-1,800/year)
            </List.Item>
            <List.Item>
              <strong>If you want a free modern tool:</strong> Shortcut + CiviCRM ($600-1,200/year) - Shortcut FREE for 10!
            </List.Item>
            <List.Item>
              <strong>If Jira OSS approved + budget critical:</strong> Jira + CiviCRM ($600-1,200/year)
            </List.Item>
            <List.Item>
              <strong>If speed/UX is top priority:</strong> Linear + CiviCRM ($1,560-2,400/year)
            </List.Item>
            <List.Item>
              <strong>Don't choose:</strong> GitHub Projects (API can't filter deadlines), Monday (already tried)
            </List.Item>
          </List>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
