import Link from './Link';

const Links = ({links, linkClick}) => {
  return links.map(({path, body}) => {
    return <Link path={path} linkClick={linkClick} key={path}>{body}</Link>;
  });
};

export default Links;
