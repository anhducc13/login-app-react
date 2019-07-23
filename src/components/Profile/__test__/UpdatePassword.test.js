import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import UpdatePassword from '../UpdatePassword';

describe('Update Password Page Render', () => {
  it('should render correctly', () => {
    const component = shallow(<UpdatePassword />);
    expect(component).toMatchSnapshot();
  });
});

describe('Update Password form validate', () => {
  it('validate test case 1', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePassword />
      </MemoryRouter>
    );
    component.find('input[id="password"]').simulate('change', { target: { value: "" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Required")
    component.unmount()
  })

  it('validate test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePassword />
      </MemoryRouter>
    );
    component.find('input[id="password"]').simulate('change', { target: { value: "ab" } });
    component.find('input[id="newPassword"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[id="confirm"]').simulate('change', { target: { value: "a" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(3)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Content upper letter, lower letter and number, no special character")
    component.unmount()
  })

  it('validate test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePassword />
      </MemoryRouter>
    );
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('input[id="newPassword"]').simulate('change', { target: { value: "Anhducc15" } });
    component.find('input[id="confirm"]').simulate('change', { target: { value: "a" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(1)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Confirm password not match")
    component.unmount()
  })

  it('validate test case 4', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePassword />
      </MemoryRouter>
    );
    component.find('input[id="password"]').simulate('change', { target: { value: "Anhducc14" } });
    component.find('input[id="newPassword"]').simulate('change', { target: { value: "Anhducc15" } });
    component.find('input[id="confirm"]').simulate('change', { target: { value: "Anhducc15" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(0)
    component.unmount()
  })
});