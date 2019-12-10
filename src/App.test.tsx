import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders title of the page', () => {
  const { getByText } = render(<App />);
  const titulo = getByText(/Catálogo de cursos/i);
  expect(titulo).toBeInTheDocument();
});

test('shows the form when the button is pressed', () => {
  const testMessage = 'Crear nuevo curso';
  const {queryByText, getByLabelText, getByText} = render(
    <App />,
  )

  // Form should be hidden on load
  expect(queryByText(testMessage)).toBeNull()

  // Click on the button
  fireEvent.click(getByText(/Añadir curso/i))

  expect(getByText(testMessage)).toBeDefined()
})

