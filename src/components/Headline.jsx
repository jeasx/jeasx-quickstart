/* This file is an example. Delete it at will. */

export default function Headline({ level = 1, children = [] }) {
  const Tag = `h${level}`;
  return <Tag>{children}</Tag>;
}
