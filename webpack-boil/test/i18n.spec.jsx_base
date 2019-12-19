import * as React from 'react';
import { mount } from './helpers';

let wrapper;
class I18nTestComponent extends React.PureComponent {
  render() {
    return <div>{this.props.i18n('MOUSE_LEFT')}</div>;
  }
}

describe('Reactor / 国际化模块 (i18n)', () => {
  it('根据当前语言转义文案', () => {
    i18n('MOUSE_LEFT').should.be.equal('鼠标左键');
  });

  it('可以在 React 组件中转义文案', () => {
    wrapper = mount(<I18nTestComponent />);

    wrapper.text().should.be.equal('鼠标左键');
  });

  it('可以切换语言', () => {
    // setLocale('en');
    // TODO
    setTimeout(() => {
      i18n('MOUSE_LEFT').should.not.be.equal('鼠标左键');
    }, 0);
  });

  it('在切换语言后, 组件中的文案自动更新', () => {
    wrapper.text().should.not.be.equal('鼠标左键');
  });
});
