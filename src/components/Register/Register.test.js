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
    component.find('input[id="username"]').simulate('change', { target: { value: "" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Required")
    component.unmount()
  })

  it('validate test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    component.find('input[id="email"]').simulate('change', { target: { value: "ab" } });
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "a" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(3)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Not format email")
    component.unmount()
  })

  it('validate test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    component.find('input[id="email"]').simulate('change', { target: { value: "duc.tt@teko.vn" } });
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('input[id="confirm-password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('button[type="submit"]').simulate('click');
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
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
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
    component.find('input[id="email"]').simulate('change', { target: { value: "trantienduc10@gmail.com" } });
    component.find('input[id="username"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('input[id="confirm-password"]').simulate('change', { target: { value: "Anhducc14" } });
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