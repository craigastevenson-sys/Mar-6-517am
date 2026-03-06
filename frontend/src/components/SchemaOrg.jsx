import { useEffect } from 'react';

const SchemaOrg = ({ schemas }) => {
  useEffect(() => {
    const scriptId = 'schema-org-jsonld';

    // Remove any existing schema scripts
    document.querySelectorAll(`script[data-schema-org]`).forEach(el => el.remove());

    // Inject each schema as a separate script tag
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema-org', `${scriptId}-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll(`script[data-schema-org]`).forEach(el => el.remove());
    };
  }, [schemas]);

  return null;
};

export default SchemaOrg;
