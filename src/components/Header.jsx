import { Box, Text, Container, Group } from '@mantine/core';

export default function Header() {
  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#1D4044', // PolicyEngine primary-900
        borderBottom: '1px solid #285E61', // primary-700
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <Container size="xl">
        <Group
          justify="space-between"
          style={{
            height: '60px',
            alignItems: 'center'
          }}
        >
          <Text
            size="lg"
            fw={700}
            style={{
              color: 'white',
              letterSpacing: '-0.5px'
            }}
          >
            PolicyEngine: Project Management Tool Comparison
          </Text>
          <Text
            size="sm"
            style={{
              color: '#B2F5EA', // primary-100
              fontFamily: 'monospace'
            }}
          >
            10 users • $600-2,400/year
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
