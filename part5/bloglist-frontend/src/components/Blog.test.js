/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';
import BlogForm from './BlogForm';

describe('Togglable', () => {
  let component;
  const mockHandler = jest.fn();
  const blog = {
    title: 'title',
    author: 'author',
    likes: 10,
    url: 'url',
  };

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    component = render(
      <Blog blog={blog} likeBlog={mockHandler} removeBlog={() => {}} />
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.blog')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglagbleDiv');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view');
    console.log(prettyDOM(button));
    fireEvent.click(button);

    const div = component.container.querySelector('.togglagbleDiv');
    expect(div).not.toHaveStyle('display: none');
  });

  test('clicking 2 times on like', () => {
    const button = component.getByText('Like');
    console.log(prettyDOM(button));
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe('Form', () => {
  test('Blog form', () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);

    const input = component.container.querySelector('#author');
    const form = component.container.querySelector('#form');

    fireEvent.change(input, {
      target: { value: 'new author' },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].author).toBe('new author');
  });
});
