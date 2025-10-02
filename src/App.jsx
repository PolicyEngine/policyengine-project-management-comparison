import '@mantine/core/styles.css';
import { useState } from 'react';
import { MantineProvider, Container, Tabs } from '@mantine/core';
import { IconLayoutDashboard, IconCode, IconServer, IconDatabase } from '@tabler/icons-react';
import Header from './components/Header';
import SummaryTab from './components/SummaryTab';
import ToolsOnlyTab from './components/ToolsOnlyTab';
import CRMTab from './components/CRMTab';

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

function App() {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <MantineProvider theme={theme}>
      <Header />
      <Container size="xl" py="xl">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List mb="xl">
            <Tabs.Tab value="summary" leftSection={<IconLayoutDashboard size={16} />}>
              Best Combinations
            </Tabs.Tab>
            <Tabs.Tab value="engineering" leftSection={<IconCode size={16} />}>
              Engineering Tools
            </Tabs.Tab>
            <Tabs.Tab value="crm" leftSection={<IconDatabase size={16} />}>
              CRM Options
            </Tabs.Tab>
            <Tabs.Tab value="api" leftSection={<IconServer size={16} />}>
              API Comparison
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="summary">
            <SummaryTab />
          </Tabs.Panel>

          <Tabs.Panel value="engineering">
            <ToolsOnlyTab />
          </Tabs.Panel>

          <Tabs.Panel value="crm">
            <CRMTab />
          </Tabs.Panel>

          <Tabs.Panel value="api">
            <div>Coming soon: Detailed API examples and code comparisons</div>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </MantineProvider>
  );
}

export default App;
