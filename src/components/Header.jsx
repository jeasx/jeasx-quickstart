/* This file is an example. Delete it at will. */

import Headline from "./Headline";

export default function Header({ children = [] }) {
  return (
    <header>
      <Headline>{children}</Headline>
    </header>
  );
}
