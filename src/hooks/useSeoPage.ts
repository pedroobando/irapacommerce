/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

interface iUseTitlePage {
  subtitle: string;
}

interface iUseSEOLink {
  name: string;
  href: string;
  rel: string;
  integrity: string;
  crossorigin?: string | undefined;
}

interface iUseSEOMeta {
  name: string;
  attribute?: string;
  description: string;
}

export const useSEOTitle = ({ subtitle }: iUseTitlePage) => {
  const comTitle: string = process.env.REACT_APP_COMPANY || 'HOLA MUNDO';
  // const comTitle: string = title;
  const oraTitle: string = `${subtitle} | ${comTitle}`;
  const refTitle = useRef<Document>(document);

  useEffect(() => {
    window.scrollTo(0, 0);

    const prevTitle = refTitle.current.title;
    if (subtitle && refTitle.current.title !== oraTitle) document.title = oraTitle;
    return () => {
      document.title = prevTitle;
    };
  }, [oraTitle, subtitle]);

  return;
};

export const useSEOMeta = ({ name, description, attribute = 'content' }: iUseSEOMeta) => {
  const refDescription = useRef<Element>(document.querySelector(`meta[name="${name}"]`));
  useEffect(() => {
    const metaDescription: Element | null = document.querySelector(`meta[name="${name}"]`);
    if (description) {
      metaDescription?.setAttribute(attribute, description);
    }
    return () => {
      if (refDescription.current)
        metaDescription?.setAttribute(
          attribute,
          refDescription.current!.getAttribute(attribute) || '',
        );
    };
  }, [attribute, description, name]);
  return;
};

export const useSEOLink = ({
  name,
  href,
  rel,
  integrity,
  crossorigin = undefined,
}: iUseSEOLink) => {
  const [isChange, setIsChange] = useState(false);
  const refLinkName = useRef<Element>(document.querySelector(`link[name="${name}"]`));

  useEffect(() => {
    const linkTag: Element | null = document.querySelector(`link[name="${name}"]`);
    if (linkTag) {
      linkTag.setAttribute('href', href);
      linkTag.setAttribute('rel', rel);
      linkTag.setAttribute('integrity', integrity);
      crossorigin && linkTag.setAttribute('crossorigin', crossorigin);
      setIsChange(true);
    }
    return () => {
      if (refLinkName.current) {
        linkTag?.removeAttribute('href');
        linkTag?.removeAttribute('rel');
        linkTag?.removeAttribute('integrity');
        linkTag?.removeAttribute('crossorigin');
      }
    };
  }, [crossorigin, href, integrity, name, rel]);

  return { isChange };
};
