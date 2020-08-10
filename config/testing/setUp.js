import '@babel/polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, render, shallow } from 'enzyme';

global.__rootdir = require('path').resolve(__dirname, '../../');
global.shallow = shallow;
global.render = render;
global.mount = mount;

configure({ adapter: new Adapter() });
