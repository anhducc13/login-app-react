import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

describe('Forgot Password Page Render', () => {
  it('should render correctly', () => {
    const component = shallow(<ForgotPassword />);
    expect(component).toMatchSnapshot();
  });
});

describe('Forgot Password form validate', () => {
  it('validate test case 1', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    component.find('input[name="email"]').simulate('change', { target: { value: "" } });
    component.find('input[name="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Please enter email")
    component.unmount()
  })

  it('validate test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    component.find('input[name="email"]').simulate('change', { target: { value: "ab" } });
    component.find('input[name="username"]').simulate('change', { target: { value: "" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(1)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Please enter username")
    component.unmount()
  })

  it('validate test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    component.find('input[name="email"]').simulate('change', { target: { value: "d" } });
    component.find('input[name="username"]').simulate('change', { target: { value: "a" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(0)
    component.unmount()
  })
});