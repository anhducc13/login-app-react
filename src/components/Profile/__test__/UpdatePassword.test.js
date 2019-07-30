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
    component.find('input[name="password"]').simulate('change', { target: { value: "" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Please enter password")
    component.unmount()
  })

  it('validate test case 2', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePassword />
      </MemoryRouter>
    );
    component.find('input[name="password"]').simulate('change', { target: { value: "ab" } });
    component.find('input[name="new-password"]').simulate('change', { target: { value: "anhducc14" } });
    component.find('input[name="repeat-password"]').simulate('change', { target: { value: "a" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(2)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Password contain upper letter, lower letter and number, no special character")
    component.unmount()
  })

  it('validate test case 3', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePassword />
      </MemoryRouter>
    );
    component.find('input[name="password"]').simulate('change', { target: { value: "A" } });
    component.find('input[name="new-password"]').simulate('change', { target: { value: "Anhducc15" } });
    component.find('input[name="repeat-password"]').simulate('change', { target: { value: "a" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(1)
    expect(component.find('div.ant-form-explain').first().text())
      .toBe("Password repeat is not match")
    component.unmount()
  })

  it('validate test case 4', () => {
    const component = mount(
      <MemoryRouter>
        <UpdatePassword />
      </MemoryRouter>
    );
    component.find('input[name="password"]').simulate('change', { target: { value: "An" } });
    component.find('input[name="new-password"]').simulate('change', { target: { value: "Anhducc15" } });
    component.find('input[name="repeat-password"]').simulate('change', { target: { value: "Anhducc15" } });
    component.find('button[type="submit"]').simulate('click');
    expect(component.find('div.ant-form-explain').length)
      .toBe(0)
    component.unmount()
  })
});