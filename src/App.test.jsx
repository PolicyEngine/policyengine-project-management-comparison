import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText(/PolicyEngine: Project Management Tool Comparison/i)).toBeInTheDocument();
  });

  it('renders all option cards', () => {
    render(<App />);
    expect(screen.getAllByText(/Plane \+ CiviCRM/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Jira \+ CiviCRM/i)).toBeInTheDocument();
    expect(screen.getByText(/Linear \+ CiviCRM/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub Projects \+ CiviCRM/i)).toBeInTheDocument();
  });

  it('shows the recommended option', () => {
    render(<App />);
    // Check that recommendation section exists
    expect(screen.getByText(/Recommendation/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Plane \+ CiviCRM/i).length).toBeGreaterThan(0);
  });

  it('displays the context about CiviCRM', () => {
    render(<App />);
    expect(screen.getByText(/CiviCRM handles non-technical work/i)).toBeInTheDocument();
  });
});
