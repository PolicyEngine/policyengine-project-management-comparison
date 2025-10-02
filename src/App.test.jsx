import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders the header with title', () => {
    render(<App />);
    const headers = screen.getAllByText(/PolicyEngine/i);
    expect(headers.length).toBeGreaterThan(0);
  });

  it('renders mantine tabs component', () => {
    const { container } = render(<App />);
    // Check that Tabs component is rendered (by looking for tab elements)
    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBeGreaterThan(0);
  });

  it('renders content', () => {
    const { container } = render(<App />);
    // Just check that some content is rendered
    expect(container.textContent.length).toBeGreaterThan(100);
  });
});
