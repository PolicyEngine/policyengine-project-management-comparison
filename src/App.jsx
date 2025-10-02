import '@mantine/core/styles.css';
import { MantineProvider, Container, Title, Text, Card, Group, Badge, Stack, List, Divider, SimpleGrid, ThemeIcon } from '@mantine/core';
import { IconCheck, IconX, IconTrophy } from '@tabler/icons-react';
import { options, context } from './data/options';

const theme = {
  colors: {
    primary: [
      '#E6FFFA',
      '#B2F5EA',
      '#81E6D9',
      '#4FD1C5',
      '#38B2AC',
      '#319795',
      '#2C7A7B',
      '#285E61',
      '#234E52',
      '#1D4044',
    ],
  },
  primaryColor: 'primary',
};

function OptionCard({ option }) {
  const costRange = `$${option.cost.annual[0].toLocaleString()} - $${option.cost.annual[1].toLocaleString()}/year`;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Group gap="xs">
              <Title order={3}>{option.name}</Title>
              {option.recommended && (
                <ThemeIcon color="yellow" variant="light" size="sm">
                  <IconTrophy size={16} />
                </ThemeIcon>
              )}
            </Group>
            <Text size="sm" c="dimmed">{option.tagline}</Text>
          </div>
          <Badge color={option.recommended ? "green" : "blue"} variant="light">
            {costRange}
          </Badge>
        </Group>

        <Group gap="xs">
          <Badge color="teal" variant="dot">Engineering: {'⭐'.repeat(option.engineeringRating)}</Badge>
          <Badge color="blue" variant="dot">API: {'⭐'.repeat(option.apiQuality)}</Badge>
          <Badge color={option.openSource === 'both' ? 'green' : 'gray'} variant="dot">
            {option.openSource === 'both' ? 'Fully OSS' : 'Partial OSS'}
          </Badge>
        </Group>

        <Divider />

        <SimpleGrid cols={2} spacing="md">
          <div>
            <Text size="sm" fw={600} mb="xs">Pros</Text>
            <List size="sm" spacing="xs">
              {option.pros.slice(0, 3).map((pro, idx) => (
                <List.Item key={idx} icon={<IconCheck size={16} color="green" />}>
                  {pro}
                </List.Item>
              ))}
            </List>
          </div>
          <div>
            <Text size="sm" fw={600} mb="xs">Cons</Text>
            <List size="sm" spacing="xs">
              {option.cons.slice(0, 3).map((con, idx) => (
                <List.Item key={idx} icon={<IconX size={16} color="red" />}>
                  {con}
                </List.Item>
              ))}
            </List>
          </div>
        </SimpleGrid>

        <Divider />

        <Group grow>
          <div>
            <Text size="xs" c="dimmed">Engineering</Text>
            <Text size="sm" fw={500}>{option.engineering.tool}</Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">Non-Technical</Text>
            <Text size="sm" fw={500}>{option.nonTechnical.tool}</Text>
          </div>
        </Group>
      </Stack>
    </Card>
  );
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <div>
            <Title order={1} mb="md">PolicyEngine: Project Management Tool Comparison</Title>
            <Text size="lg" c="dimmed" mb="sm">
              {context.currentProblem}
            </Text>
            <Badge size="lg" color="teal" variant="light">
              CiviCRM handles non-technical work → Focus on engineering tools
            </Badge>
          </div>

          <Stack gap="md">
            {options.map(option => (
              <OptionCard key={option.id} option={option} />
            ))}
          </Stack>

          <Card padding="lg" radius="md" withBorder bg="blue.0">
            <Title order={3} mb="md">Recommendation</Title>
            <Text>
              <strong>Plane + CiviCRM</strong> is recommended for PolicyEngine if you have DevOps capacity.
              It provides a fully open source stack with good APIs for Claude Code integration,
              Linear-like UX for engineering, and saves $1,200-2,200/year compared to Linear.
            </Text>
          </Card>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App;
