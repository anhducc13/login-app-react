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
    component.find('input[id="username"]').simulate('change', { target: { value: "" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Required")
    component.unmount()
  })

  it('validate test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    component.find('input[id="email"]').simulate('change', { target: { value: "ab" } });
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(1)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Not format email")
    component.unmount()
  })

  it('validate test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    component.find('input[id="email"]').simulate('change', { target: { value: "duc.tt@teko.vn" } });
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(0)
    component.unmount()
  })
});