import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { authServices } from 'services';
import Login from './Login';

describe('Login Page Render', () => {
  it('should render correctly', () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
  });
});

describe('Login form validate', () => {
  it('validate test case 1', () => {
    const component = mount(
      <MemoryRouter>
        <Login />
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
        <Login />
      </MemoryRouter>
    );
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(1)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Required")

    component.unmount()
  })

  it('validate test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(0)
    component.unmount()
  })
});


describe('Login Page Submit Form', () => {
  let loginSpy;

  beforeAll(() => {
    loginSpy = jest.fn();
    loginSpy = jest.spyOn(authServices, 'loginUser');
  });

  it('Submit login will not call loginUser function after fail validate', () => {
    const component = mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(loginSpy).not.toHaveBeenCalled()
    component.unmount()
  })

  it('Submit login will call loginUser function after success validate', () => {
    const component = mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
    expect(loginSpy)
      .toHaveBeenCalled()
    expect(loginSpy)
      .toHaveBeenCalledWith({
        "username": "anhducc14",
        "password": "Anhducc14"
      })
    component.unmount()
  })

  afterAll(() => {
    jest.restoreAllMocks();
  });
})