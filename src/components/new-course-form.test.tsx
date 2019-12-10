import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import NewCourseForm from './new-course-form';

test('renders title of the page', () => {
  const { getByText } = render(<NewCourseForm />);
  const titulo = getByText(/Crear nuevo curso/i);
  expect(titulo).toBeDefined();
});


test('allows the user to create a new course', async () => {

  const {getByLabelText, getByText} = render(<NewCourseForm />)

  // fill the form
  fireEvent.change(getByLabelText(/Título/i), {target: {value: 'Curso 1'}})
  fireEvent.change(getByLabelText(/Nivel/i), {target: {value: 'Principiante'}})
  fireEvent.change(getByLabelText(/Profesor/i), {target: {value: 1}})
  fireEvent.change(getByLabelText(/Horas/i), {target: {value: 10}})
  fireEvent.change(getByLabelText(/Activo/i), {target: {value: true}})
  fireEvent.click(getByText(/Añadir Curso/i))

})


