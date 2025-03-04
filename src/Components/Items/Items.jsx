import './Items.css';

export const Items = ({ children, url }) => {


  return (
    <li>
      <a 
        href={url}
        target='_blank' 
        rel='noopener noreferrer' 
      >
        {children}
      </a>
    </li>
  );
};
