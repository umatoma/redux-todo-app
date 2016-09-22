import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TodoForm from '../../../assets/components/TodoForm';

describe('TodoForm', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  it('should contain form', () => {
    expect(shallow(<TodoForm />).is('form')).to.equal(true);
  });

  it('should call onSubmit when form is submitted', () => {
    const onSubmit = sandbox.spy(() => Promise.resolve());
    const wrapper = shallow(<TodoForm onSubmit={onSubmit} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(onSubmit.calledOnce).to.equal(true);
    expect(onSubmit.firstCall.args[0]).to.be.deep.equal({
      error: null,
      text: ''
    });
  });
});
