import * as React from 'react';

interface IHelloProps {
  foo: string;
  bar: string;
}

export const Hello = (props: IHelloProps): JSX.Element => (
  <div>
    Hello from {props.foo} and {props.bar}!
  </div>
);
