import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const locationState = atom({
  key: 'locationState', 
  default: '0', 
});

const dateState = atom({
  key: 'dateState', 
  default: '0', 
});