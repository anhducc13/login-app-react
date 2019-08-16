import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { authServices } from 'services';
import Register from './Register';


describe('Register Page Render', () => {
  it('should render correctly', () => {
    const component = shallow(<Register />);
    expect(component).toMatchSnapshot();
  });
});

describe('Register form validate', () => {
  it('validate test case 1', () => {
    const component = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: "" } });
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Username not empty")
    component.unmount()
  })

  it('validate test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    component.find('input[name="email"]').simulate('change', { target: { value: "ab" } });
    component.find('input[name="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[name="password"]').simulate('change', { target: { value: "a" } });
    component.find('input[name="repeat-password"]').simulate('change', { target: { value: "a" } });
    expect(component.find('div.ant-form-explain').length)
      .toBe(2)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Email is invalid format")
    component.unmount()
  })

  it('validate test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    component.find('input[name="email"]').simulate('change', { target: { value: "trantienduc10@gmail.com" } });
    component.find('input[name="username"]').simulate('change', { target: { value: "anhducc13" } });
    component.find('input[name="password"]').simulate('change', { target: { value: "Anhducc13" } });
    component.find('input[name="repeat-password"]').simulate('change', { target: { value: "Anhducc13" } });
    expect(component.find('div.ant-form-explain').length)
      .toBe(0)
    component.unmount();
  })
});

describe('Register Page Submit Form', () => {
  let registerSpy;

  beforeAll(() => {
    registerSpy = jest.fn();
    registerSpy = jest.spyOn(authServices, 'registerUser');
  });

  it('Submit register will not call registerUser function after fail validate', () => {
    const component = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    component.find('input[name="username"]').simulate('change', { target: { value: "anhducc" } });
    component.find('input[name="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(registerSpy)
      .not.toHaveBeenCalled()
    component.unmount()
  })

  it('Submit login will call loginUser function after success validate', () => {
    const component = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    component.find('input[name="email"]').simulate('change', { target: { value: "trantienduc10@gmail.com" } });
    component.find('input[name="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[name="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('input[name="repeat-password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(registerSpy)
      .toHaveBeenCalled()
    expect(registerSpy)
      .toHaveBeenCalledWith({
        "email": "trantienduc10@gmail.com",
        "username": "anhducc14",
        "password": "Anhducc14"
      })
    component.unmount()
  })

  afterAll(() => {
    jest.restoreAllMocks();
  });
})